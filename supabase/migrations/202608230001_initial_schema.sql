-- Tranquility Platform initial production schema
-- Migration is version-controlled only. It has NOT been applied to any Supabase project.
-- Security posture: RLS is enabled on every application table and no broad browser
-- policies are created in this migration. Anonymous/public writes must go through a
-- validated server/Edge Function boundary rather than direct table access.

create extension if not exists pgcrypto;

create or replace function public.set_updated_at()
returns trigger
language plpgsql
security invoker
set search_path = public
as $$
begin
  new.updated_at = timezone('utc', now());
  return new;
end;
$$;

create table public.service_types (
  id uuid primary key default gen_random_uuid(),
  code text not null unique,
  name text not null,
  description text,
  pricing_mode text not null default 'instant' check (pricing_mode in ('instant', 'manual_quote', 'custom_contract')),
  active boolean not null default true,
  display_order integer not null default 0,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table public.service_addons (
  id uuid primary key default gen_random_uuid(),
  code text not null unique,
  name text not null,
  description text,
  pricing_type text not null default 'fixed' check (pricing_type in ('fixed', 'starting_at', 'custom_quote')),
  base_price_cents integer check (base_price_cents is null or base_price_cents >= 0),
  requires_review boolean not null default false,
  active boolean not null default true,
  display_order integer not null default 0,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table public.pricing_rules (
  id uuid primary key default gen_random_uuid(),
  code text not null unique,
  rule_type text not null check (
    rule_type in (
      'square_footage_tier',
      'room_increment',
      'service_multiplier',
      'frequency_discount',
      'pet_presence',
      'manual_quote_threshold'
    )
  ),
  service_type_id uuid references public.service_types(id) on delete cascade,
  min_value numeric,
  max_value numeric,
  amount_cents integer check (amount_cents is null or amount_cents >= 0),
  multiplier numeric check (multiplier is null or multiplier > 0),
  percentage numeric check (percentage is null or (percentage >= 0 and percentage <= 1)),
  metadata jsonb not null default '{}'::jsonb,
  priority integer not null default 100,
  effective_from timestamptz not null default timezone('utc', now()),
  effective_to timestamptz,
  active boolean not null default true,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  check (effective_to is null or effective_to > effective_from)
);

create table public.customers (
  id uuid primary key default gen_random_uuid(),
  auth_user_id uuid unique references auth.users(id) on delete set null,
  full_name text not null,
  email text not null,
  phone text not null,
  stripe_customer_id text unique,
  marketing_consent boolean not null default false,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table public.customer_properties (
  id uuid primary key default gen_random_uuid(),
  customer_id uuid not null references public.customers(id) on delete cascade,
  label text,
  street_address text not null,
  unit text,
  city text not null,
  state text not null default 'TX',
  postal_code text not null,
  latitude numeric(9,6),
  longitude numeric(9,6),
  access_notes text,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table public.quotes (
  id uuid primary key default gen_random_uuid(),
  customer_id uuid not null references public.customers(id) on delete restrict,
  property_id uuid not null references public.customer_properties(id) on delete restrict,
  service_type_id uuid references public.service_types(id) on delete set null,
  status text not null default 'submitted' check (status in ('draft', 'submitted', 'reviewing', 'quoted', 'accepted', 'declined', 'expired', 'cancelled')),
  frequency text not null default 'one-time' check (frequency in ('one-time', 'weekly', 'biweekly', 'monthly')),
  square_footage integer check (square_footage is null or square_footage >= 0),
  bedrooms smallint not null default 0 check (bedrooms between 0 and 20),
  full_bathrooms smallint not null default 0 check (full_bathrooms between 0 and 20),
  half_bathrooms smallint not null default 0 check (half_bathrooms between 0 and 20),
  living_rooms smallint not null default 0 check (living_rooms between 0 and 20),
  dining_rooms smallint not null default 0 check (dining_rooms between 0 and 20),
  kitchens smallint not null default 0 check (kitchens between 0 and 20),
  laundry_rooms smallint not null default 0 check (laundry_rooms between 0 and 20),
  other_rooms smallint not null default 0 check (other_rooms between 0 and 20),
  pets_present boolean not null default false,
  pet_details text,
  customer_notes text,
  estimated_amount_cents integer check (estimated_amount_cents is null or estimated_amount_cents >= 0),
  quoted_amount_cents integer check (quoted_amount_cents is null or quoted_amount_cents >= 0),
  currency char(3) not null default 'USD',
  quoted_at timestamptz,
  expires_at timestamptz,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table public.quote_media (
  id uuid primary key default gen_random_uuid(),
  quote_id uuid not null references public.quotes(id) on delete cascade,
  storage_path text not null unique,
  original_filename text,
  mime_type text not null,
  size_bytes bigint not null check (size_bytes > 0),
  sort_order integer not null default 0,
  created_at timestamptz not null default timezone('utc', now())
);

create table public.bookings (
  id uuid primary key default gen_random_uuid(),
  customer_id uuid not null references public.customers(id) on delete restrict,
  property_id uuid not null references public.customer_properties(id) on delete restrict,
  service_type_id uuid not null references public.service_types(id) on delete restrict,
  source_quote_id uuid references public.quotes(id) on delete set null,
  status text not null default 'requested' check (
    status in ('requested', 'awaiting_payment_method', 'confirmed', 'assigned', 'in_progress', 'completed', 'cancelled', 'remediation_requested', 'remediation_scheduled', 'remediation_complete')
  ),
  frequency text not null default 'one-time' check (frequency in ('one-time', 'weekly', 'biweekly', 'monthly')),
  requested_service_date date not null,
  requested_arrival_window text not null,
  service_notes text,
  pets_present boolean not null default false,
  pet_details text,
  estimated_amount_cents integer check (estimated_amount_cents is null or estimated_amount_cents >= 0),
  agreed_amount_cents integer check (agreed_amount_cents is null or agreed_amount_cents >= 0),
  final_amount_cents integer check (final_amount_cents is null or final_amount_cents >= 0),
  currency char(3) not null default 'USD',
  confirmed_at timestamptz,
  completed_at timestamptz,
  cancelled_at timestamptz,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table public.booking_addons (
  id uuid primary key default gen_random_uuid(),
  booking_id uuid not null references public.bookings(id) on delete cascade,
  service_addon_id uuid references public.service_addons(id) on delete set null,
  addon_code text not null,
  addon_name text not null,
  unit_price_cents integer not null check (unit_price_cents >= 0),
  quantity integer not null default 1 check (quantity > 0),
  created_at timestamptz not null default timezone('utc', now()),
  unique (booking_id, addon_code)
);

create table public.payment_transactions (
  id uuid primary key default gen_random_uuid(),
  booking_id uuid not null references public.bookings(id) on delete restrict,
  provider text not null default 'stripe' check (provider = 'stripe'),
  provider_payment_intent_id text unique,
  provider_setup_intent_id text unique,
  provider_payment_method_id text,
  transaction_type text not null check (transaction_type in ('setup', 'authorization', 'capture', 'refund')),
  status text not null check (status in ('pending', 'requires_action', 'authorized', 'succeeded', 'failed', 'cancelled', 'refunded', 'partially_refunded')),
  amount_cents integer check (amount_cents is null or amount_cents >= 0),
  currency char(3) not null default 'USD',
  failure_code text,
  failure_message text,
  processed_at timestamptz,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table public.audit_logs (
  id bigint generated always as identity primary key,
  actor_user_id uuid references auth.users(id) on delete set null,
  actor_type text not null default 'system' check (actor_type in ('system', 'customer', 'staff', 'webhook')),
  action text not null,
  entity_type text not null,
  entity_id uuid,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default timezone('utc', now())
);

create index customers_email_idx on public.customers (lower(email));
create index customer_properties_customer_id_idx on public.customer_properties (customer_id);
create index quotes_customer_id_idx on public.quotes (customer_id);
create index quotes_status_created_at_idx on public.quotes (status, created_at desc);
create index quote_media_quote_id_idx on public.quote_media (quote_id);
create index bookings_customer_id_idx on public.bookings (customer_id);
create index bookings_service_date_status_idx on public.bookings (requested_service_date, status);
create index booking_addons_booking_id_idx on public.booking_addons (booking_id);
create index payment_transactions_booking_id_idx on public.payment_transactions (booking_id);
create index audit_logs_entity_idx on public.audit_logs (entity_type, entity_id, created_at desc);
create index pricing_rules_active_priority_idx on public.pricing_rules (active, priority, effective_from desc);

create trigger service_types_set_updated_at before update on public.service_types for each row execute function public.set_updated_at();
create trigger service_addons_set_updated_at before update on public.service_addons for each row execute function public.set_updated_at();
create trigger pricing_rules_set_updated_at before update on public.pricing_rules for each row execute function public.set_updated_at();
create trigger customers_set_updated_at before update on public.customers for each row execute function public.set_updated_at();
create trigger customer_properties_set_updated_at before update on public.customer_properties for each row execute function public.set_updated_at();
create trigger quotes_set_updated_at before update on public.quotes for each row execute function public.set_updated_at();
create trigger bookings_set_updated_at before update on public.bookings for each row execute function public.set_updated_at();
create trigger payment_transactions_set_updated_at before update on public.payment_transactions for each row execute function public.set_updated_at();

alter table public.service_types enable row level security;
alter table public.service_addons enable row level security;
alter table public.pricing_rules enable row level security;
alter table public.customers enable row level security;
alter table public.customer_properties enable row level security;
alter table public.quotes enable row level security;
alter table public.quote_media enable row level security;
alter table public.bookings enable row level security;
alter table public.booking_addons enable row level security;
alter table public.payment_transactions enable row level security;
alter table public.audit_logs enable row level security;

-- Deliberately no anon/authenticated table policies in the initial migration.
-- Until role/auth architecture is approved, browser traffic must not have direct access
-- to customer, property, quote, booking, payment, or audit records.

comment on table public.customers is 'Private customer identity/contact records. Never expose with broad anon/auth policies.';
comment on column public.customer_properties.access_notes is 'Potentially sensitive property access information; least-privilege access required.';
comment on table public.quote_media is 'Metadata only. Interior property media must be stored in a private Storage bucket.';
comment on table public.payment_transactions is 'Stripe identifiers/status only. Raw card data must never be stored.';
comment on table public.audit_logs is 'Append-oriented operational/security audit trail. No direct browser write access.';
