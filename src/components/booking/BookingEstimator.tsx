import { useMemo, useState } from 'react'
import { pricingConfig } from '@/config/pricing'
import { calculateBookingEstimate } from '@/lib/pricing'
import type { Frequency, ServiceType } from '@/types/booking'

const numberOptions = [0, 1, 2, 3, 4, 5, 6]

export function BookingEstimator() {
  const [serviceType, setServiceType] = useState<ServiceType>('standard')
  const [frequency, setFrequency] = useState<Frequency>('one-time')
  const [squareFootage, setSquareFootage] = useState(1500)
  const [bedrooms, setBedrooms] = useState(3)
  const [fullBathrooms, setFullBathrooms] = useState(2)
  const [halfBathrooms, setHalfBathrooms] = useState(0)
  const [petsPresent, setPetsPresent] = useState(false)
  const [addOnIds, setAddOnIds] = useState<string[]>([])

  const estimate = useMemo(
    () =>
      calculateBookingEstimate({
        serviceType,
        frequency,
        squareFootage,
        bedrooms,
        fullBathrooms,
        halfBathrooms,
        petsPresent,
        addOnIds,
      }),
    [serviceType, frequency, squareFootage, bedrooms, fullBathrooms, halfBathrooms, petsPresent, addOnIds],
  )

  function toggleAddOn(id: string) {
    setAddOnIds((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id],
    )
  }

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
          <label className="grid gap-2 text-sm font-semibold">
            Approx. square footage
            <input className="field" min="300" onChange={(event) => setSquareFootage(Number(event.target.value))} step="50" type="number" value={squareFootage} />
          </label>
          <label className="grid gap-2 text-sm font-semibold">
            Bedrooms
            <select className="field" value={bedrooms} onChange={(event) => setBedrooms(Number(event.target.value))}>
              {numberOptions.map((value) => <option key={value} value={value}>{value}</option>)}
            </select>
          </label>
          <label className="grid gap-2 text-sm font-semibold">
            Full bathrooms
            <select className="field" value={fullBathrooms} onChange={(event) => setFullBathrooms(Number(event.target.value))}>
              {numberOptions.map((value) => <option key={value} value={value}>{value}</option>)}
            </select>
          </label>
          <label className="grid gap-2 text-sm font-semibold">
            Half bathrooms
            <select className="field" value={halfBathrooms} onChange={(event) => setHalfBathrooms(Number(event.target.value))}>
              {numberOptions.map((value) => <option key={value} value={value}>{value}</option>)}
            </select>
          </label>
        </div>

        <label className="mt-6 flex items-center gap-3 rounded-2xl border border-black/10 p-4 text-sm font-medium">
          <input checked={petsPresent} onChange={(event) => setPetsPresent(event.target.checked)} type="checkbox" />
          Pets will be present during service
        </label>

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

      <aside className="h-fit rounded-4xl bg-tranquility-charcoal p-7 text-white shadow-soft lg:sticky lg:top-28">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-white/55">Estimated cleaning total</p>
        {estimate.requiresManualQuote ? (
          <>
            <p className="mt-4 font-serif text-4xl">Custom quote</p>
            <p className="mt-4 text-sm leading-6 text-white/70">Homes above {pricingConfig.manualQuoteAboveSquareFeet.toLocaleString()} sq ft move to virtual consultation so pricing can be reviewed accurately.</p>
          </>
        ) : (
          <>
            <p className="mt-4 font-serif text-5xl">${estimate.total}</p>
            {estimate.frequencyDiscount > 0 ? <p className="mt-2 text-sm text-white/65">Includes ${estimate.frequencyDiscount} recurring-service discount.</p> : null}
          </>
        )}
        <p className="mt-6 border-t border-white/15 pt-5 text-xs leading-5 text-white/55">Planning estimate only. Final production pricing will be controlled through Tranquility's admin-managed pricing rules and may change when property condition or service scope materially differs from the submitted details.</p>
      </aside>
    </div>
  )
}
