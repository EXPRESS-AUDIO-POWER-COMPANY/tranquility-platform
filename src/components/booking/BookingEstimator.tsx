import { useMemo, useState } from 'react'
import { pricingConfig } from '@/config/pricing'
import { calculateBookingEstimate } from '@/lib/pricing'
import type { BookingEstimate, Frequency, ServiceType } from '@/types/booking'

const numberOptions = [0, 1, 2, 3, 4, 5, 6]

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

  function toggleAddOn(id: string) {
    setAddOnIds((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id],
    )
  }

  const estimate = estimateState.estimate

  return (
    <div className="grid gap-8 lg:grid-cols-[1.25fr_0.75fr]">
      <form className="rounded-4xl bg-white p-6 shadow-soft sm:p-8" onSubmit={(event) => event.preventDefault()}>
        <div className="grid gap-6 sm:grid-cols-2">
          <label className="grid gap-2 text-sm font-semibold">
            Service type
            <select className="field" value={serviceType} onChange={(event) => setServiceType(event.target.value as ServiceType)}>
              <option value="standard">Standard clean</option>
              <option value="deep">Deep clean</option>
              <option value="move-in-out">Move-in / move-out</option>
            </select>
          </label>
          <label className="grid gap-2 text-sm font-semibold">
            Frequency
            <select className="field" value={frequency} onChange={(event) => setFrequency(event.target.value as Frequency)}>
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
              onChange={(event) => setSquareFootage(Number(event.target.value))}
              step="50"
              type="number"
              value={squareFootage}
            />
            <span className="text-xs font-normal text-black/50" id="square-footage-help">
              Minimum {pricingConfig.minimumSquareFeet.toLocaleString()} sq ft for the instant estimator. Larger homes automatically move to custom quote review.
            </span>
          </label>
          <RoomCountField label="Bedrooms" onChange={setBedrooms} value={bedrooms} />
          <RoomCountField label="Full bathrooms" onChange={setFullBathrooms} value={fullBathrooms} />
          <RoomCountField label="Half bathrooms" onChange={setHalfBathrooms} value={halfBathrooms} />
          <RoomCountField label="Living rooms" onChange={setLivingRooms} value={livingRooms} />
          <RoomCountField label="Dining rooms" onChange={setDiningRooms} value={diningRooms} />
          <RoomCountField label="Kitchens" onChange={setKitchens} value={kitchens} />
          <RoomCountField label="Laundry rooms" onChange={setLaundryRooms} value={laundryRooms} />
          <RoomCountField label="Other rooms / spaces" onChange={setOtherRooms} value={otherRooms} />
        </div>

        <div className="mt-6 rounded-2xl border border-black/10 p-4">
          <label className="flex items-center gap-3 text-sm font-medium">
            <input checked={petsPresent} onChange={(event) => setPetsPresent(event.target.checked)} type="checkbox" />
            Pets will be present during service
          </label>
          {petsPresent ? (
            <label className="mt-4 grid gap-2 text-sm font-semibold">
              Pet type, count, and anything the cleaning team should know
              <textarea
                className="field min-h-24"
                onChange={(event) => setPetDetails(event.target.value)}
                placeholder="Example: 2 dogs. Friendly and usually stay in the living room."
                value={petDetails}
              />
            </label>
          ) : null}
          <p className="mt-3 text-xs leading-5 text-black/55">
            Pets may remain in the home when they do not interfere with safe service completion. Please secure any animal that may become aggressive, highly anxious, or disruptive.
          </p>
        </div>

        <fieldset className="mt-8">
          <legend className="text-sm font-bold">Optional add-ons</legend>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            {pricingConfig.addOns.map((addOn) => (
              <label key={addOn.id} className="flex items-start gap-3 rounded-2xl border border-black/10 p-4">
                <input checked={addOnIds.includes(addOn.id)} onChange={() => toggleAddOn(addOn.id)} type="checkbox" />
                <span className="text-sm">
                  <span className="block font-semibold">{addOn.name}</span>
                  <span className="text-black/55">{addOn.requiresReview ? `Starting at $${addOn.price}` : `+$${addOn.price}`}</span>
                </span>
              </label>
            ))}
          </div>
        </fieldset>
      </form>

      <aside aria-live="polite" className="h-fit rounded-4xl bg-tranquility-charcoal p-7 text-white shadow-soft lg:sticky lg:top-28">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-white/55">Estimated cleaning total</p>
        {estimateState.error ? (
          <>
            <p className="mt-4 font-serif text-3xl">Complete the property details</p>
            <p className="mt-4 text-sm leading-6 text-white/70">{estimateState.error}</p>
          </>
        ) : estimate?.requiresManualQuote ? (
          <>
            <p className="mt-4 font-serif text-4xl">Custom quote</p>
            <p className="mt-4 text-sm leading-6 text-white/70">
              Homes above {pricingConfig.manualQuoteAboveSquareFeet.toLocaleString()} sq ft move to virtual consultation so pricing can be reviewed accurately.
            </p>
          </>
        ) : estimate ? (
          <>
            <p className="mt-4 font-serif text-5xl">${estimate.total}</p>
            <dl className="mt-5 grid gap-2 text-sm text-white/70">
              <div className="flex justify-between gap-4"><dt>Cleaning service</dt><dd>${estimate.serviceSubtotal}</dd></div>
              {estimate.frequencyDiscount > 0 ? <div className="flex justify-between gap-4"><dt>Recurring discount</dt><dd>−${estimate.frequencyDiscount}</dd></div> : null}
              {estimate.addOnTotal > 0 ? <div className="flex justify-between gap-4"><dt>Add-ons</dt><dd>+${estimate.addOnTotal}</dd></div> : null}
            </dl>
          </>
        ) : null}
        <p className="mt-6 border-t border-white/15 pt-5 text-xs leading-5 text-white/55">
          Planning estimate only. Final production pricing will be controlled through Tranquility&apos;s admin-managed pricing rules and may change when property condition or service scope materially differs from the submitted details.
        </p>
      </aside>
    </div>
  )
}
