import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  Home,
  Info,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  UserRound,
} from 'lucide-react'
import { useMemo, useState } from 'react'
import { Button, ButtonLink } from '@/components/ui/Button'
import { pricingConfig, getAddOnPrice } from '@/config/pricing'
import { siteConfig } from '@/config/site'
import { calculateBookingEstimate } from '@/lib/pricing'
import type { BookingEstimate, Frequency, ServiceType } from '@/types/booking'

const numberOptions = Array.from({ length: 11 }, (_, index) => index)
const steps = ['Service', 'Rooms', 'Extras', 'Schedule'] as const
const serviceOptions: Array<{ value: ServiceType; label: string; description: string }> = [
  { value: 'standard', label: 'Standard Clean', description: 'Routine maintenance for an average home.' },
  { value: 'deep', label: 'Deep Clean', description: 'A more detailed reset for areas needing extra attention.' },
  { value: 'move-in-out', label: 'Move-In / Move-Out', description: 'Detailed cleaning for a home between occupants.' },
]

const frequencyOptions: Array<{ value: Frequency; label: string }> = [
  { value: 'one-time', label: 'One-time' },
  { value: 'weekly', label: 'Weekly' },
  { value: 'biweekly', label: 'Bi-weekly' },
  { value: 'monthly', label: 'Monthly' },
]

type PropertyCondition = 'routine' | 'needs-attention' | 'not-sure'
type EstimateState =
  | { estimate: BookingEstimate; error: null }
  | { estimate: null; error: string }

type RoomCountFieldProps = {
  label: string
  value: number
  onChange: (value: number) => void
}

function RoomCountField({ label, value, onChange }: RoomCountFieldProps) {
  return (
    <label className="grid gap-2 text-sm font-semibold">
      {label}
      <select className="field" onChange={(event) => onChange(Number(event.target.value))} value={value}>
        {numberOptions.map((option) => (
          <option key={option} value={option}>{option}</option>
        ))}
      </select>
    </label>
  )
}

function getLocalToday() {
  const now = new Date()
  const local = new Date(now.getTime() - now.getTimezoneOffset() * 60_000)
  return local.toISOString().slice(0, 10)
}

function getInitialServiceType(): ServiceType {
  const requested = new URLSearchParams(window.location.search).get('service')
  return requested === 'deep' || requested === 'move-in-out' || requested === 'standard'
    ? requested
    : 'standard'
}

function serviceLabel(serviceType: ServiceType) {
  if (serviceType === 'deep') return 'Deep clean'
  if (serviceType === 'move-in-out') return 'Move-in / move-out'
  return 'Standard clean'
}

function frequencyLabel(frequency: Frequency) {
  if (frequency === 'one-time') return 'One-time'
  if (frequency === 'biweekly') return 'Bi-weekly'
  return frequency.charAt(0).toUpperCase() + frequency.slice(1)
}

function discountedServicePrice(serviceType: ServiceType, frequency: Frequency) {
  const base = pricingConfig.baseServicePrices[serviceType]
  const discount = pricingConfig.frequencyDiscounts[frequency]
  return Math.round(base - base * discount)
}

export function BookingEstimator() {
  const [step, setStep] = useState(1)
  const [serviceType, setServiceType] = useState<ServiceType>(getInitialServiceType)
  const [frequency, setFrequency] = useState<Frequency>('one-time')
  const [squareFootage, setSquareFootage] = useState(1500)
  const [propertyCondition, setPropertyCondition] = useState<PropertyCondition>('routine')
  const [bedrooms, setBedrooms] = useState(1)
  const [fullBathrooms, setFullBathrooms] = useState(1)
  const [halfBathrooms, setHalfBathrooms] = useState(0)
  const [livingRooms, setLivingRooms] = useState(1)
  const [diningRooms, setDiningRooms] = useState(0)
  const [kitchens, setKitchens] = useState(1)
  const [laundryRooms, setLaundryRooms] = useState(0)
  const [otherRooms, setOtherRooms] = useState(0)
  const [otherSpaceDetails, setOtherSpaceDetails] = useState('')
  const [petsPresent, setPetsPresent] = useState(false)
  const [petDetails, setPetDetails] = useState('')
  const [addOnIds, setAddOnIds] = useState<string[]>([])
  const [serviceNotes, setServiceNotes] = useState('')
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [streetAddress, setStreetAddress] = useState('')
  const [city, setCity] = useState('')
  const [postalCode, setPostalCode] = useState('')
  const [preferredDate, setPreferredDate] = useState('')
  const [arrivalWindow, setArrivalWindow] = useState('Morning • 8 AM–12 PM')
  const [accessInstructions, setAccessInstructions] = useState('')
  const [readyForReview, setReadyForReview] = useState(false)

  const today = useMemo(getLocalToday, [])
  const livePricing = pricingConfig.livePricingEnabled
  const hasManualQuoteThreshold = Number.isFinite(pricingConfig.manualQuoteAboveSquareFeet)

  const estimateState = useMemo<EstimateState>(() => {
    try {
      return {
        estimate: calculateBookingEstimate({
          serviceType,
          frequency,
          squareFootage,
          bedrooms,
          fullBathrooms,
          halfBathrooms,
          livingRooms,
          diningRooms,
          kitchens,
          laundryRooms,
          otherRooms,
          petsPresent,
          addOnIds,
        }),
        error: null,
      }
    } catch (error) {
      return {
        estimate: null,
        error: error instanceof Error ? error.message : 'Enter valid property details to continue.',
      }
    }
  }, [serviceType, frequency, squareFootage, bedrooms, fullBathrooms, halfBathrooms, livingRooms, diningRooms, kitchens, laundryRooms, otherRooms, petsPresent, addOnIds])

  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
  const phoneValid = phone.replace(/\D/g, '').length >= 10
  const postalCodeValid = /^\d{5}(?:-\d{4})?$/.test(postalCode.trim())
  const dateValid = preferredDate.length > 0 && preferredDate >= today
  const otherSpaceComplete = otherRooms === 0 || otherSpaceDetails.trim().length >= 2
  const petDetailsComplete = !petsPresent || petDetails.trim().length >= 2
  const contactComplete = fullName.trim().length >= 2 && emailValid && phoneValid && streetAddress.trim().length >= 4 && city.trim().length >= 2 && postalCodeValid && dateValid && arrivalWindow.trim().length > 0
  const estimate = estimateState.estimate
  const selectedAddOns = pricingConfig.addOns.filter((addOn) => addOnIds.includes(addOn.id))
  const conditionReviewRecommended = propertyCondition !== 'routine' || selectedAddOns.some((addOn) => addOn.requiresReview)

  const emailRequestHref = useMemo(() => {
    const subject = encodeURIComponent(`Residential Cleaning Request — ${serviceLabel(serviceType)}`)
    const body = encodeURIComponent([
      `Customer: ${fullName || 'Not entered'}`,
      `Email: ${email || 'Not entered'}`,
      `Phone: ${phone || 'Not entered'}`,
      `Service: ${serviceLabel(serviceType)}`,
      `Frequency: ${frequencyLabel(frequency)}`,
      `Property: ${squareFootage.toLocaleString()} sq ft`,
      `Address: ${streetAddress || 'Not entered'}, ${city || 'Not entered'} ${postalCode || ''}`.trim(),
      `Preferred date: ${preferredDate || 'Not entered'}`,
      `Arrival window: ${arrivalWindow}`,
      `Rooms: ${bedrooms} bed, ${fullBathrooms} full bath, ${halfBathrooms} half bath, ${livingRooms} living, ${diningRooms} dining, ${kitchens} kitchen, ${laundryRooms} laundry, ${otherRooms} other`,
      `Property condition: ${propertyCondition}`,
      `Pets: ${petsPresent ? petDetails || 'Present' : 'None disclosed'}`,
      `Add-ons: ${selectedAddOns.length ? selectedAddOns.map((item) => item.name).join(', ') : 'None selected'}`,
      `Priority notes: ${serviceNotes || 'None'}`,
      `Access notes: ${accessInstructions || 'None'}`,
      livePricing && estimate ? `Planning estimate: $${estimate.total}` : 'Pricing: Confirm after property review',
    ].join('\n'))
    return `mailto:${siteConfig.email}?subject=${subject}&body=${body}`
  }, [accessInstructions, arrivalWindow, bedrooms, city, diningRooms, email, estimate, frequency, fullBathrooms, fullName, halfBathrooms, kitchens, laundryRooms, livePricing, livingRooms, otherRooms, petDetails, petsPresent, phone, postalCode, preferredDate, propertyCondition, selectedAddOns, serviceNotes, serviceType, squareFootage, streetAddress])

  function resetReview() { setReadyForReview(false) }

  function toggleAddOn(id: string) {
    setAddOnIds((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id])
    resetReview()
  }

  function goToStep(nextStep: number) {
    setStep(Math.max(1, Math.min(4, nextStep)))
    resetReview()
  }

  function canContinue() {
    if (step === 1) return !estimateState.error
    if (step === 2) return otherSpaceComplete
    if (step === 3) return petDetailsComplete
    return contactComplete
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1.25fr_0.75fr]">
      <div className="rounded-[2.2rem] bg-white p-6 shadow-soft sm:p-8">
        <div className="grid grid-cols-4 gap-2 border-b border-black/7 pb-7">
          {steps.map((label, index) => {
            const itemStep = index + 1
            const active = itemStep === step
            const complete = itemStep < step
            return (
              <button key={label} aria-current={active ? 'step' : undefined} className="group text-left disabled:cursor-default" disabled={itemStep > step} onClick={() => goToStep(itemStep)} type="button">
                <span className={`mb-2 block h-1.5 rounded-full ${active || complete ? 'bg-tranquility-moss' : 'bg-black/8'}`} />
                <span className={`text-[10px] font-bold uppercase tracking-[0.13em] ${active ? 'text-tranquility-charcoal' : 'text-black/45'}`}>{String(itemStep).padStart(2, '0')} {label}</span>
              </button>
            )
          })}
        </div>

        {step === 1 ? (
          <section className="pt-7">
            <p className="eyebrow">Service profile</p>
            <h2 className="mt-3 font-serif text-3xl">Choose your cleaning service.</h2>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-black/55">Pricing is intentionally simple: each service starts from an average 1-bedroom, 1-bathroom home. Your actual scope and property size can change the final quote.</p>

            <div className="mt-8 grid gap-4 lg:grid-cols-3">
              {serviceOptions.map((option) => {
                const selected = serviceType === option.value
                return (
                  <button key={option.value} aria-pressed={selected} className={`rounded-[1.6rem] border p-5 text-left transition ${selected ? 'border-tranquility-moss bg-tranquility-sage/10 shadow-sm' : 'border-black/10 hover:border-tranquility-moss/40 hover:bg-tranquility-ivory/60'}`} onClick={() => { setServiceType(option.value); resetReview() }} type="button">
                    <span className="flex items-start justify-between gap-4">
                      <span>
                        <span className="block font-semibold">{option.label}</span>
                        <span className="mt-1 block text-xs leading-5 text-black/50">{option.description}</span>
                      </span>
                      {selected ? <CheckCircle2 className="size-5 shrink-0 text-tranquility-moss" aria-hidden="true" /> : null}
                    </span>
                    <span className="mt-5 block font-serif text-3xl">${pricingConfig.baseServicePrices[option.value]}</span>
                    <span className="mt-1 block text-[11px] uppercase tracking-[0.12em] text-black/45">one-time starting price</span>
                  </button>
                )
              })}
            </div>

            <fieldset className="mt-8">
              <legend className="text-sm font-bold">Choose your frequency</legend>
              <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {frequencyOptions.map((option) => {
                  const selected = frequency === option.value
                  const price = discountedServicePrice(serviceType, option.value)
                  const savings = pricingConfig.frequencyDiscounts[option.value]
                  return (
                    <button key={option.value} aria-pressed={selected} className={`rounded-2xl border p-4 text-left transition ${selected ? 'border-tranquility-moss bg-tranquility-sage/10' : 'border-black/10 hover:bg-tranquility-ivory/60'}`} onClick={() => { setFrequency(option.value); resetReview() }} type="button">
                      <span className="block text-sm font-semibold">{option.label}</span>
                      <span className="mt-2 block font-serif text-2xl">${price}</span>
                      {savings > 0 ? <span className="mt-1 block text-xs font-semibold text-tranquility-moss">Save {Math.round(savings * 100)}%</span> : <span className="mt-1 block text-xs text-black/40">No recurring discount</span>}
                    </button>
                  )
                })}
              </div>
            </fieldset>

            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              <label className="grid gap-2 text-sm font-semibold sm:col-span-2">
                Approx. square footage
                <input aria-describedby="square-footage-help" className="field" min={pricingConfig.minimumSquareFeet} onChange={(event) => { setSquareFootage(Number(event.target.value)); resetReview() }} step="50" type="number" value={squareFootage} />
                <span className="text-xs font-normal leading-5 text-black/50" id="square-footage-help">
                  {hasManualQuoteThreshold ? `Pricing shown above is for an average home. Homes at or above ${pricingConfig.manualQuoteAboveSquareFeet.toLocaleString()} sq ft, or homes with an unusual scope, move to a custom consultation.` : 'Pricing is based on an average/standard home size and increases when square footage or requested scope requires customization.'}
                </span>
              </label>
              <label className="grid gap-2 text-sm font-semibold sm:col-span-2">
                Current property condition
                <select className="field" onChange={(event) => { setPropertyCondition(event.target.value as PropertyCondition); resetReview() }} value={propertyCondition}>
                  <option value="routine">Routine / normally maintained</option>
                  <option value="needs-attention">Needs extra attention</option>
                  <option value="not-sure">Not sure — I want guidance</option>
                </select>
                <span className="text-xs font-normal text-black/50">Condition helps identify when a closer property review may be useful before pricing or scheduling is finalized.</span>
              </label>
            </div>
          </section>
        ) : null}

        {step === 2 ? (
          <section className="pt-7">
            <p className="eyebrow">Rooms and spaces</p>
            <h2 className="mt-3 font-serif text-3xl">Tell us what you actually want cleaned.</h2>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-black/55">The base price assumes an average 1-bedroom, 1-bathroom home. Additional rooms and unusual scope can be added or routed to a custom consultation.</p>
            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              <RoomCountField label="Bedrooms" onChange={setBedrooms} value={bedrooms} />
              <RoomCountField label="Full bathrooms" onChange={setFullBathrooms} value={fullBathrooms} />
              <RoomCountField label="Half bathrooms" onChange={setHalfBathrooms} value={halfBathrooms} />
              <RoomCountField label="Living rooms" onChange={setLivingRooms} value={livingRooms} />
              <RoomCountField label="Dining rooms" onChange={setDiningRooms} value={diningRooms} />
              <RoomCountField label="Kitchens" onChange={setKitchens} value={kitchens} />
              <RoomCountField label="Laundry rooms" onChange={setLaundryRooms} value={laundryRooms} />
              <RoomCountField label="Other rooms / spaces" onChange={setOtherRooms} value={otherRooms} />
            </div>
            {otherRooms > 0 ? (
              <label className="mt-6 grid gap-2 text-sm font-semibold">
                Describe the other room(s) or space(s)
                <textarea className="field min-h-24" onChange={(event) => { setOtherSpaceDetails(event.target.value); resetReview() }} placeholder="Example: game room, office, sunroom, loft, mud room." value={otherSpaceDetails} />
                {!otherSpaceComplete ? <span className="text-xs font-normal text-red-700">Add a short description for the additional spaces.</span> : null}
              </label>
            ) : null}
          </section>
        ) : null}

        {step === 3 ? (
          <section className="pt-7">
            <p className="eyebrow">Pets and add-ons</p>
            <h2 className="mt-3 font-serif text-3xl">Personalize the visit.</h2>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-black/55">Add the extras you want and anything the cleaning team should know.</p>
            <div className="mt-8 rounded-2xl border border-black/10 p-5">
              <label className="flex items-center gap-3 text-sm font-medium"><input checked={petsPresent} onChange={(event) => { setPetsPresent(event.target.checked); resetReview() }} type="checkbox" /> Pets will be present during service</label>
              {petsPresent ? (
                <label className="mt-4 grid gap-2 text-sm font-semibold">
                  Pet type, count, and anything the cleaning team should know
                  <textarea className="field min-h-24" onChange={(event) => { setPetDetails(event.target.value); resetReview() }} placeholder="Example: 2 dogs. Friendly and usually stay in the living room." value={petDetails} />
                  {!petDetailsComplete ? <span className="text-xs font-normal text-red-700">Add a short pet note before continuing.</span> : null}
                </label>
              ) : null}
              <p className="mt-3 text-xs leading-5 text-black/55">Pets may remain in the home when they do not interfere with safe service completion. Please secure any animal that may become aggressive, highly anxious, or disruptive.</p>
            </div>

            <fieldset className="mt-8">
              <legend className="text-sm font-bold">Add-ons for {serviceLabel(serviceType)}</legend>
              <p className="mt-1 text-xs text-black/50">Prices below automatically update when you switch cleaning types.</p>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                {pricingConfig.addOns.map((addOn) => {
                  const price = getAddOnPrice(addOn, serviceType)
                  return (
                    <label key={addOn.id} className="flex items-start gap-3 rounded-2xl border border-black/10 p-4 transition hover:bg-tranquility-ivory/70">
                      <input checked={addOnIds.includes(addOn.id)} onChange={() => toggleAddOn(addOn.id)} type="checkbox" />
                      <span className="text-sm">
                        <span className="block font-semibold">{addOn.name}</span>
                        <span className="text-black/55">{addOn.requiresReview ? `Starting at $${price}` : `+$${price}`}</span>
                      </span>
                    </label>
                  )
                })}
              </div>
            </fieldset>

            <label className="mt-7 grid gap-2 text-sm font-semibold">
              Cleaning notes or priority areas <span className="font-normal text-black/40">(optional)</span>
              <textarea className="field min-h-28" maxLength={1200} onChange={(event) => { setServiceNotes(event.target.value); resetReview() }} placeholder="Example: Please focus extra attention on the kitchen and guest bathroom." value={serviceNotes} />
              <span className="text-right text-xs font-normal text-black/45">{serviceNotes.length}/1200</span>
            </label>
          </section>
        ) : null}

        {step === 4 ? (
          <section className="pt-7">
            <p className="eyebrow">Schedule and customer details</p>
            <h2 className="mt-3 font-serif text-3xl">Where and when should service happen?</h2>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-black/55">Complete the service request details. No payment is collected on this page; pricing and availability are confirmed before a reservation is finalized.</p>
            <div className="mt-8 grid gap-5 sm:grid-cols-2">
              <label className="grid gap-2 text-sm font-semibold"><span className="flex items-center gap-2"><UserRound className="size-4 text-tranquility-moss" aria-hidden="true" /> Full name</span><input autoComplete="name" className="field" onChange={(event) => { setFullName(event.target.value); resetReview() }} value={fullName} /></label>
              <label className="grid gap-2 text-sm font-semibold">Email<input autoComplete="email" className="field" inputMode="email" onChange={(event) => { setEmail(event.target.value); resetReview() }} type="email" value={email} />{email && !emailValid ? <span className="text-xs font-normal text-red-700">Enter a valid email address.</span> : null}</label>
              <label className="grid gap-2 text-sm font-semibold">Phone<input autoComplete="tel" className="field" inputMode="tel" onChange={(event) => { setPhone(event.target.value); resetReview() }} type="tel" value={phone} />{phone && !phoneValid ? <span className="text-xs font-normal text-red-700">Enter a phone number with at least 10 digits.</span> : null}</label>
              <label className="grid gap-2 text-sm font-semibold sm:col-span-2"><span className="flex items-center gap-2"><MapPin className="size-4 text-tranquility-moss" aria-hidden="true" /> Street address</span><input autoComplete="street-address" className="field" onChange={(event) => { setStreetAddress(event.target.value); resetReview() }} value={streetAddress} /></label>
              <label className="grid gap-2 text-sm font-semibold">City<input autoComplete="address-level2" className="field" onChange={(event) => { setCity(event.target.value); resetReview() }} value={city} /></label>
              <label className="grid gap-2 text-sm font-semibold">ZIP code<input autoComplete="postal-code" className="field" inputMode="numeric" onChange={(event) => { setPostalCode(event.target.value); resetReview() }} value={postalCode} />{postalCode && !postalCodeValid ? <span className="text-xs font-normal text-red-700">Enter a valid ZIP code.</span> : null}</label>
              <label className="grid gap-2 text-sm font-semibold"><span className="flex items-center gap-2"><CalendarDays className="size-4 text-tranquility-moss" aria-hidden="true" /> Preferred date</span><input className="field" min={today} onChange={(event) => { setPreferredDate(event.target.value); resetReview() }} type="date" value={preferredDate} />{preferredDate && !dateValid ? <span className="text-xs font-normal text-red-700">Choose today or a future date.</span> : null}</label>
              <label className="grid gap-2 text-sm font-semibold">Preferred arrival window<select className="field" onChange={(event) => { setArrivalWindow(event.target.value); resetReview() }} value={arrivalWindow}><option>Morning • 8 AM–12 PM</option><option>Afternoon • 12 PM–4 PM</option><option>Flexible • Any available window</option></select></label>
            </div>
            <label className="mt-6 grid gap-2 text-sm font-semibold">Access or arrival notes <span className="font-normal text-black/40">(optional)</span><textarea className="field min-h-24" maxLength={800} onChange={(event) => { setAccessInstructions(event.target.value); resetReview() }} placeholder="Gate instructions, parking notes, front desk, call-on-arrival preference, or other useful access information." value={accessInstructions} /></label>

            {estimate?.requiresManualQuote ? (
              <div className="mt-8 rounded-2xl bg-tranquility-stone/30 p-5"><p className="font-semibold">This property needs a custom quote.</p><p className="mt-2 text-sm leading-6 text-black/58">The online starting prices are for average home sizes. A larger or unusual property scope is better handled through a consultation.</p><ButtonLink className="mt-4" to="/quote">Start virtual quote <ArrowRight className="ml-2 size-4" /></ButtonLink></div>
            ) : (
              <div className="mt-8"><Button disabled={!contactComplete || Boolean(estimateState.error)} onClick={() => setReadyForReview(true)} type="button">Review service request <ArrowRight className="ml-2 size-4" /></Button>{!contactComplete ? <p className="mt-3 text-xs text-black/50">Complete the customer, address, and scheduling fields with valid information before reviewing the request.</p> : null}</div>
            )}

            {readyForReview && estimate ? (
              <div className="mt-8 rounded-[1.8rem] border border-tranquility-sage/30 bg-tranquility-sage/10 p-6" role="status">
                <div className="flex items-start gap-3"><CheckCircle2 className="mt-1 size-5 shrink-0 text-tranquility-moss" aria-hidden="true" /><div><p className="font-serif text-2xl">Your service request details are ready.</p><p className="mt-2 text-sm leading-6 text-black/58">Contact Tranquility to confirm availability and finalize the reservation. The displayed amount is a starting/planning price and remains subject to the actual property condition and requested scope.</p></div></div>
                <dl className="mt-6 grid gap-3 border-t border-black/8 pt-5 text-sm sm:grid-cols-2"><div><dt className="text-black/45">Customer</dt><dd className="mt-1 font-semibold">{fullName}</dd></div><div><dt className="text-black/45">Service</dt><dd className="mt-1 font-semibold">{serviceLabel(serviceType)} • {frequencyLabel(frequency)}</dd></div><div><dt className="text-black/45">Property</dt><dd className="mt-1 font-semibold">{squareFootage.toLocaleString()} sq ft • {city}, {postalCode}</dd></div><div><dt className="text-black/45">Preferred time</dt><dd className="mt-1 font-semibold">{preferredDate} • {arrivalWindow}</dd></div><div><dt className="text-black/45">Pricing</dt><dd className="mt-1 font-semibold">${estimate.total} planning price</dd></div><div><dt className="text-black/45">Add-ons</dt><dd className="mt-1 font-semibold">{selectedAddOns.length ? selectedAddOns.map((item) => item.name).join(', ') : 'None selected'}</dd></div></dl>
                <div className="mt-6 flex flex-wrap gap-3 border-t border-black/8 pt-5"><a className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-tranquility-charcoal px-5 text-sm font-semibold text-white" href={siteConfig.phoneHref}><Phone className="size-4" aria-hidden="true" />Call {siteConfig.shortName}</a><a className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-black/10 bg-white px-5 text-sm font-semibold" href={emailRequestHref}><Mail className="size-4" aria-hidden="true" />Email request</a></div>
              </div>
            ) : null}
          </section>
        ) : null}

        <div className="mt-9 flex flex-wrap items-center justify-between gap-3 border-t border-black/7 pt-6"><Button disabled={step === 1} onClick={() => goToStep(step - 1)} type="button" variant="ghost"><ArrowLeft className="mr-2 size-4" /> Previous</Button>{step < 4 ? <Button disabled={!canContinue()} onClick={() => goToStep(step + 1)} type="button">Continue <ArrowRight className="ml-2 size-4" /></Button> : null}</div>
      </div>

      <aside aria-live="polite" className="h-fit rounded-[2.2rem] bg-tranquility-charcoal p-7 text-white shadow-soft lg:sticky lg:top-32 sm:p-8">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-white/55">Your cleaning estimate</p>
        {estimateState.error ? (
          <><p className="mt-5 font-serif text-3xl">Complete the property details</p><p className="mt-4 text-sm leading-6 text-white/70">{estimateState.error}</p></>
        ) : estimate?.requiresManualQuote ? (
          <><p className="mt-5 font-serif text-4xl">Custom quote</p><p className="mt-4 text-sm leading-6 text-white/70">This property falls outside the standard starting-price scope. A consultation gives Tranquility room to review the space accurately.</p><ButtonLink className="mt-7 w-full bg-white text-tranquility-charcoal hover:bg-tranquility-ivory" to="/quote">Start custom quote <ArrowRight className="ml-2 size-4" /></ButtonLink></>
        ) : estimate ? (
          <>
            <p className="mt-5 font-serif text-5xl">${estimate.total}</p><p className="mt-2 text-xs font-semibold uppercase tracking-[0.14em] text-white/50">{frequencyLabel(frequency)} {serviceLabel(serviceType).toLowerCase()} price</p>
            <dl className="mt-6 grid gap-3 border-t border-white/10 pt-5 text-sm text-white/70"><div className="flex justify-between gap-4"><dt>Starting service</dt><dd>${estimate.serviceSubtotal}</dd></div>{estimate.frequencyDiscount > 0 ? <div className="flex justify-between gap-4"><dt>Recurring discount</dt><dd>−${estimate.frequencyDiscount}</dd></div> : null}{estimate.addOnTotal > 0 ? <div className="flex justify-between gap-4"><dt>Add-ons</dt><dd>+${estimate.addOnTotal}</dd></div> : null}</dl>
            <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.055] p-4 text-xs leading-6 text-white/65"><span className="flex items-start gap-2"><Home className="mt-0.5 size-4 shrink-0 text-tranquility-stone" aria-hidden="true" />{squareFootage.toLocaleString()} sq ft • {bedrooms} bed • {fullBathrooms} full bath • {halfBathrooms} half bath</span></div>
            {conditionReviewRecommended ? <div className="mt-4 flex items-start gap-2 rounded-2xl border border-tranquility-stone/25 bg-tranquility-stone/10 p-4 text-xs leading-6 text-white/70"><Info className="mt-0.5 size-4 shrink-0 text-tranquility-stone" aria-hidden="true" /><span>A closer review may be useful because of the property condition or specialty add-ons selected.</span></div> : null}
            <ButtonLink className="mt-6 w-full bg-white text-tranquility-charcoal hover:bg-tranquility-ivory" to="/quote" variant="secondary">Need a closer review?</ButtonLink>
          </>
        ) : null}
        <div className="mt-6 border-t border-white/10 pt-5"><p className="flex items-start gap-2 text-xs leading-6 text-white/55"><ShieldCheck className="mt-0.5 size-4 shrink-0" aria-hidden="true" />Pricing is based on an average/standard home size. Square footage, customizations, property condition, and specialty scope can change the final service price.</p></div>
      </aside>
    </div>
  )
}
