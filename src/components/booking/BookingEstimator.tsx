import { ArrowLeft, ArrowRight, CalendarDays, CheckCircle2, MapPin, UserRound } from 'lucide-react'
import { useMemo, useState } from 'react'
import { Button, ButtonLink } from '@/components/ui/Button'
import { pricingConfig } from '@/config/pricing'
import { calculateBookingEstimate } from '@/lib/pricing'
import type { BookingEstimate, Frequency, ServiceType } from '@/types/booking'

const numberOptions = [0, 1, 2, 3, 4, 5, 6]
const steps = ['Service', 'Rooms', 'Extras', 'Schedule'] as const

type RoomCountFieldProps = {
  label: string
  value: number
  onChange: (value: number) => void
}

type EstimateState =
  | { estimate: BookingEstimate; error: null }
  | { estimate: null; error: string }

function RoomCountField({ label, value, onChange }: RoomCountFieldProps) {
  return (
    <label className="grid gap-2 text-sm font-semibold">
      {label}
      <select className="field" value={value} onChange={(event) => onChange(Number(event.target.value))}>
        {numberOptions.map((option) => (
          <option key={option} value={option}>{option}</option>
        ))}
      </select>
    </label>
  )
}

export function BookingEstimator() {
  const [step, setStep] = useState(1)
  const [serviceType, setServiceType] = useState<ServiceType>('standard')
  const [frequency, setFrequency] = useState<Frequency>('one-time')
  const [squareFootage, setSquareFootage] = useState(1500)
  const [bedrooms, setBedrooms] = useState(3)
  const [fullBathrooms, setFullBathrooms] = useState(2)
  const [halfBathrooms, setHalfBathrooms] = useState(0)
  const [livingRooms, setLivingRooms] = useState(1)
  const [diningRooms, setDiningRooms] = useState(1)
  const [kitchens, setKitchens] = useState(1)
  const [laundryRooms, setLaundryRooms] = useState(1)
  const [otherRooms, setOtherRooms] = useState(0)
  const [petsPresent, setPetsPresent] = useState(false)
  const [petDetails, setPetDetails] = useState('')
  const [addOnIds, setAddOnIds] = useState<string[]>([])
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [streetAddress, setStreetAddress] = useState('')
  const [city, setCity] = useState('')
  const [postalCode, setPostalCode] = useState('')
  const [preferredDate, setPreferredDate] = useState('')
  const [arrivalWindow, setArrivalWindow] = useState('Morning • 8 AM–12 PM')
  const [readyForReview, setReadyForReview] = useState(false)

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
        error: error instanceof Error ? error.message : 'Enter valid property details to calculate an estimate.',
      }
    }
  }, [
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
  ])

  const contactComplete = [fullName, email, phone, streetAddress, city, postalCode, preferredDate, arrivalWindow]
    .every((value) => value.trim().length > 0)

  function toggleAddOn(id: string) {
    setAddOnIds((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id],
    )
    setReadyForReview(false)
  }

  function goToStep(nextStep: number) {
    setStep(Math.max(1, Math.min(4, nextStep)))
    setReadyForReview(false)
  }

  const estimate = estimateState.estimate

  return (
    <div className="grid gap-8 lg:grid-cols-[1.25fr_0.75fr]">
      <div className="rounded-[2.2rem] bg-white p-6 shadow-soft sm:p-8">
        <div className="grid grid-cols-4 gap-2 border-b border-black/7 pb-7">
          {steps.map((label, index) => {
            const itemStep = index + 1
            const active = itemStep === step
            const complete = itemStep < step
            return (
              <button
                key={label}
                aria-current={active ? 'step' : undefined}
                className="group text-left disabled:cursor-default"
                disabled={itemStep > step}
                onClick={() => goToStep(itemStep)}
                type="button"
              >
                <span className={`mb-2 block h-1.5 rounded-full ${active || complete ? 'bg-tranquility-moss' : 'bg-black/8'}`} />
                <span className={`text-[10px] font-bold uppercase tracking-[0.13em] ${active ? 'text-tranquility-charcoal' : 'text-black/38'}`}>
                  {String(itemStep).padStart(2, '0')} {label}
                </span>
              </button>
            )
          })}
        </div>

        {step === 1 ? (
          <section className="pt-7">
            <p className="eyebrow">Service profile</p>
            <h2 className="mt-3 font-serif text-3xl">Start with the cleaning you need.</h2>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-black/55">Choose the service, frequency, and approximate size of the home. The estimate updates as you go.</p>

            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              <label className="grid gap-2 text-sm font-semibold">
                Service type
                <select className="field" value={serviceType} onChange={(event) => { setServiceType(event.target.value as ServiceType); setReadyForReview(false) }}>
                  <option value="standard">Standard clean</option>
                  <option value="deep">Deep clean</option>
                  <option value="move-in-out">Move-in / move-out</option>
                </select>
              </label>
              <label className="grid gap-2 text-sm font-semibold">
                Frequency
                <select className="field" value={frequency} onChange={(event) => { setFrequency(event.target.value as Frequency); setReadyForReview(false) }}>
                  <option value="one-time">One-time</option>
                  <option value="weekly">Weekly</option>
                  <option value="biweekly">Biweekly</option>
                  <option value="monthly">Monthly</option>
                </select>
              </label>
              <label className="grid gap-2 text-sm font-semibold sm:col-span-2">
                Approx. square footage
                <input
                  aria-describedby="square-footage-help"
                  className="field"
                  min={pricingConfig.minimumSquareFeet}
                  onChange={(event) => { setSquareFootage(Number(event.target.value)); setReadyForReview(false) }}
                  step="50"
                  type="number"
                  value={squareFootage}
                />
                <span className="text-xs font-normal text-black/50" id="square-footage-help">Homes above {pricingConfig.manualQuoteAboveSquareFeet.toLocaleString()} sq ft move to a custom quote for a closer review.</span>
              </label>
            </div>
          </section>
        ) : null}

        {step === 2 ? (
          <section className="pt-7">
            <p className="eyebrow">Rooms and spaces</p>
            <h2 className="mt-3 font-serif text-3xl">Build the property profile.</h2>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-black/55">Select the rooms that should be considered in the cleaning scope.</p>
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
          </section>
        ) : null}

        {step === 3 ? (
          <section className="pt-7">
            <p className="eyebrow">Pets and add-ons</p>
            <h2 className="mt-3 font-serif text-3xl">Personalize the visit.</h2>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-black/55">Share pet information and select any additional cleaning details that should be considered.</p>

            <div className="mt-8 rounded-2xl border border-black/10 p-5">
              <label className="flex items-center gap-3 text-sm font-medium">
                <input checked={petsPresent} onChange={(event) => { setPetsPresent(event.target.checked); setReadyForReview(false) }} type="checkbox" />
                Pets will be present during service
              </label>
              {petsPresent ? (
                <label className="mt-4 grid gap-2 text-sm font-semibold">
                  Pet type, count, and anything the cleaning team should know
                  <textarea
                    className="field min-h-24"
                    onChange={(event) => { setPetDetails(event.target.value); setReadyForReview(false) }}
                    placeholder="Example: 2 dogs. Friendly and usually stay in the living room."
                    value={petDetails}
                  />
                </label>
              ) : null}
              <p className="mt-3 text-xs leading-5 text-black/55">Pets may remain in the home when they do not interfere with safe service completion. Please secure any animal that may become aggressive, highly anxious, or disruptive.</p>
            </div>

            <fieldset className="mt-8">
              <legend className="text-sm font-bold">Optional add-ons</legend>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                {pricingConfig.addOns.map((addOn) => (
                  <label key={addOn.id} className="flex items-start gap-3 rounded-2xl border border-black/10 p-4 transition hover:bg-tranquility-ivory/70">
                    <input checked={addOnIds.includes(addOn.id)} onChange={() => toggleAddOn(addOn.id)} type="checkbox" />
                    <span className="text-sm">
                      <span className="block font-semibold">{addOn.name}</span>
                      <span className="text-black/55">{addOn.requiresReview ? `Starting at $${addOn.price}` : `+$${addOn.price}`}</span>
                    </span>
                  </label>
                ))}
              </div>
            </fieldset>
          </section>
        ) : null}

        {step === 4 ? (
          <section className="pt-7">
            <p className="eyebrow">Schedule and customer details</p>
            <h2 className="mt-3 font-serif text-3xl">Where and when should service happen?</h2>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-black/55">Complete the reservation profile. Secure online submission and payment activation will be connected before production launch.</p>

            <div className="mt-8 grid gap-5 sm:grid-cols-2">
              <label className="grid gap-2 text-sm font-semibold">
                <span className="flex items-center gap-2"><UserRound className="size-4 text-tranquility-moss" aria-hidden="true" /> Full name</span>
                <input className="field" onChange={(event) => { setFullName(event.target.value); setReadyForReview(false) }} value={fullName} />
              </label>
              <label className="grid gap-2 text-sm font-semibold">
                Email
                <input className="field" inputMode="email" onChange={(event) => { setEmail(event.target.value); setReadyForReview(false) }} type="email" value={email} />
              </label>
              <label className="grid gap-2 text-sm font-semibold">
                Phone
                <input className="field" inputMode="tel" onChange={(event) => { setPhone(event.target.value); setReadyForReview(false) }} type="tel" value={phone} />
              </label>
              <label className="grid gap-2 text-sm font-semibold sm:col-span-2">
                <span className="flex items-center gap-2"><MapPin className="size-4 text-tranquility-moss" aria-hidden="true" /> Street address</span>
                <input className="field" onChange={(event) => { setStreetAddress(event.target.value); setReadyForReview(false) }} value={streetAddress} />
              </label>
              <label className="grid gap-2 text-sm font-semibold">
                City
                <input className="field" onChange={(event) => { setCity(event.target.value); setReadyForReview(false) }} value={city} />
              </label>
              <label className="grid gap-2 text-sm font-semibold">
                ZIP code
                <input className="field" inputMode="numeric" onChange={(event) => { setPostalCode(event.target.value); setReadyForReview(false) }} value={postalCode} />
              </label>
              <label className="grid gap-2 text-sm font-semibold">
                <span className="flex items-center gap-2"><CalendarDays className="size-4 text-tranquility-moss" aria-hidden="true" /> Preferred date</span>
                <input className="field" onChange={(event) => { setPreferredDate(event.target.value); setReadyForReview(false) }} type="date" value={preferredDate} />
              </label>
              <label className="grid gap-2 text-sm font-semibold">
                Preferred arrival window
                <select className="field" onChange={(event) => { setArrivalWindow(event.target.value); setReadyForReview(false) }} value={arrivalWindow}>
                  <option>Morning • 8 AM–12 PM</option>
                  <option>Afternoon • 12 PM–4 PM</option>
                  <option>Flexible • Any available window</option>
                </select>
              </label>
            </div>

            {estimate?.requiresManualQuote ? (
              <div className="mt-8 rounded-2xl bg-tranquility-stone/30 p-5">
                <p className="font-semibold">This property needs a custom quote.</p>
                <p className="mt-2 text-sm leading-6 text-black/58">Use the virtual consultation path so the space can be reviewed before scheduling.</p>
                <ButtonLink className="mt-4" to="/quote">Start virtual quote <ArrowRight className="ml-2 size-4" /></ButtonLink>
              </div>
            ) : (
              <div className="mt-8">
                <Button disabled={!contactComplete || Boolean(estimateState.error)} onClick={() => setReadyForReview(true)} type="button">Review booking request <ArrowRight className="ml-2 size-4" /></Button>
                {!contactComplete ? <p className="mt-3 text-xs text-black/45">Complete the customer, address, and preferred scheduling fields to review the request.</p> : null}
              </div>
            )}

            {readyForReview && estimate ? (
              <div className="mt-8 rounded-[1.8rem] border border-tranquility-sage/30 bg-tranquility-sage/10 p-6" role="status">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="mt-1 size-5 shrink-0 text-tranquility-moss" aria-hidden="true" />
                  <div>
                    <p className="font-serif text-2xl">Booking profile ready for secure submission.</p>
                    <p className="mt-2 text-sm leading-6 text-black/58">{fullName}, {streetAddress}, {city} {postalCode} • {preferredDate} • {arrivalWindow}</p>
                    <p className="mt-2 text-sm leading-6 text-black/58">Current planning estimate: <strong>${estimate.total}</strong>. The secure submission and payment step remains intentionally disconnected until the production payment system is implemented.</p>
                  </div>
                </div>
              </div>
            ) : null}
          </section>
        ) : null}

        <div className="mt-8 flex items-center justify-between border-t border-black/7 pt-6">
          <Button disabled={step === 1} onClick={() => goToStep(step - 1)} type="button" variant="ghost"><ArrowLeft className="mr-2 size-4" /> Back</Button>
          {step < 4 ? <Button onClick={() => goToStep(step + 1)} type="button">Continue <ArrowRight className="ml-2 size-4" /></Button> : null}
        </div>
      </div>

      <aside aria-live="polite" className="h-fit rounded-[2.2rem] bg-tranquility-charcoal p-7 text-white shadow-soft lg:sticky lg:top-32 sm:p-8">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-white/50">Your cleaning estimate</p>
        {estimateState.error ? (
          <>
            <p className="mt-5 font-serif text-3xl">Complete the property details</p>
            <p className="mt-4 text-sm leading-6 text-white/70">{estimateState.error}</p>
          </>
        ) : estimate?.requiresManualQuote ? (
          <>
            <p className="mt-5 font-serif text-4xl">Custom quote</p>
            <p className="mt-4 text-sm leading-6 text-white/70">This property falls outside the instant-estimate range. A virtual consultation gives Tranquility room to review the space accurately.</p>
            <ButtonLink className="mt-7 w-full bg-white text-tranquility-charcoal hover:bg-tranquility-ivory" to="/quote">Start custom quote <ArrowRight className="ml-2 size-4" /></ButtonLink>
          </>
        ) : estimate ? (
          <>
            <p className="mt-5 font-serif text-5xl">${estimate.total}</p>
            <p className="mt-2 text-xs font-semibold uppercase tracking-[0.14em] text-white/42">Current base estimate</p>
            <dl className="mt-6 grid gap-3 border-t border-white/10 pt-5 text-sm text-white/70">
              <div className="flex justify-between gap-4"><dt>Cleaning service</dt><dd>${estimate.serviceSubtotal}</dd></div>
              {estimate.frequencyDiscount > 0 ? <div className="flex justify-between gap-4"><dt>Recurring discount</dt><dd>−${estimate.frequencyDiscount}</dd></div> : null}
              {estimate.addOnTotal > 0 ? <div className="flex justify-between gap-4"><dt>Add-ons</dt><dd>+${estimate.addOnTotal}</dd></div> : null}
            </dl>
            <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.055] p-4 text-xs leading-6 text-white/58">
              Step {step} of 4 • {steps[step - 1]}
            </div>
            <ButtonLink className="mt-5 w-full bg-white text-tranquility-charcoal hover:bg-tranquility-ivory" to="/quote" variant="secondary">Need a closer review?</ButtonLink>
          </>
        ) : null}
        <p className="mt-6 border-t border-white/10 pt-5 text-xs leading-6 text-white/48">This is a planning estimate based on the details selected. Property condition, requested scope, and specialty items can change the final service price.</p>
      </aside>
    </div>
  )
}
