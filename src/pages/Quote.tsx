import {
  Camera,
  CheckCircle2,
  FileImage,
  Info,
  Mail,
  Phone,
  ShieldCheck,
  Trash2,
} from 'lucide-react'
import { useEffect, useMemo, useState, type FormEvent } from 'react'
import { Button } from '@/components/ui/Button'
import { siteConfig } from '@/config/site'

const MAX_FILES = 12
const MAX_FILE_SIZE = 8 * 1024 * 1024
const MAX_TOTAL_SIZE = 50 * 1024 * 1024
const acceptedTypes = new Set(['image/jpeg', 'image/png', 'image/webp', 'image/heic', 'image/heif'])

function isAcceptedImage(file: File) {
  if (acceptedTypes.has(file.type)) return true
  if (file.type) return false
  return /\.(jpe?g|png|webp|heic|heif)$/i.test(file.name)
}

function formatBytes(bytes: number) {
  if (bytes < 1024 * 1024) return `${Math.max(1, Math.round(bytes / 1024))} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

function getInitialQuoteService() {
  const requested = new URLSearchParams(window.location.search).get('service')
  if (requested === 'commercial') return 'commercial'
  if (requested === 'move-in-out') return 'move-in-out'
  if (requested === 'standard' || requested === 'standard-cleaning') return 'standard-cleaning'
  if (requested === 'deep' || requested === 'deep-cleaning') return 'deep-cleaning'
  if (requested === 'specialty') return 'specialty'
  return 'specialty'
}

function getServiceLabel(service: string) {
  const labels: Record<string, string> = {
    'standard-cleaning': 'Standard residential cleaning',
    'deep-cleaning': 'Deep cleaning',
    'move-in-out': 'Move-in / move-out cleaning',
    commercial: 'Commercial cleaning',
    specialty: 'Specialty / not sure',
  }
  return labels[service] ?? service.replaceAll('-', ' ')
}

export function Quote() {
  const initialService = useMemo(getInitialQuoteService, [])
  const [files, setFiles] = useState<File[]>([])
  const [error, setError] = useState<string | null>(null)
  const [readyForReview, setReadyForReview] = useState(false)
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [city, setCity] = useState('')
  const [postalCode, setPostalCode] = useState('')
  const [propertyType, setPropertyType] = useState(initialService === 'commercial' ? 'commercial' : 'residential')
  const [serviceInterest, setServiceInterest] = useState(initialService)
  const [squareFootage, setSquareFootage] = useState('')
  const [condition, setCondition] = useState('needs-review')
  const [preferredTiming, setPreferredTiming] = useState('Within 1–2 weeks')
  const [contactPreference, setContactPreference] = useState('Phone or text')
  const [details, setDetails] = useState('')

  const previews = useMemo(
    () => files.map((file) => ({
      file,
      url: ['image/jpeg', 'image/png', 'image/webp'].includes(file.type)
        ? URL.createObjectURL(file)
        : null,
    })),
    [files],
  )

  useEffect(() => () => {
    previews.forEach(({ url }) => {
      if (url) URL.revokeObjectURL(url)
    })
  }, [previews])

  const totalUploadSize = files.reduce((sum, file) => sum + file.size, 0)
  const phoneValid = phone.replace(/\D/g, '').length >= 10
  const postalCodeValid = /^\d{5}(?:-\d{4})?$/.test(postalCode.trim())

  const emailHref = useMemo(() => {
    const subject = encodeURIComponent(`Tranquility Custom Quote Request — ${getServiceLabel(serviceInterest)}`)
    const body = encodeURIComponent([
      `Name: ${fullName || 'Not entered'}`,
      `Phone: ${phone || 'Not entered'}`,
      `Email: ${email || 'Not entered'}`,
      `Property: ${address || 'Not entered'}, ${city || 'Not entered'} ${postalCode || ''}`.trim(),
      `Service: ${getServiceLabel(serviceInterest)}`,
      `Property type: ${propertyType}`,
      `Approx. square footage: ${squareFootage || 'Not provided'}`,
      `Condition: ${condition.replaceAll('-', ' ')}`,
      `Preferred timing: ${preferredTiming}`,
      `Preferred contact: ${contactPreference}`,
      '',
      'Property details:',
      details || 'Not provided',
      '',
      files.length
        ? `${files.length} property photo(s) were selected locally in the website. Please provide the preferred secure upload method.`
        : 'No property photos selected.',
    ].join('\n'))

    return `mailto:${siteConfig.email}?subject=${subject}&body=${body}`
  }, [
    address,
    city,
    condition,
    contactPreference,
    details,
    email,
    files.length,
    fullName,
    phone,
    postalCode,
    preferredTiming,
    propertyType,
    serviceInterest,
    squareFootage,
  ])

  function resetReview() {
    setReadyForReview(false)
  }

  function handleServiceChange(nextService: string) {
    setServiceInterest(nextService)
    if (nextService === 'commercial') setPropertyType('commercial')
    if (['standard-cleaning', 'deep-cleaning', 'move-in-out'].includes(nextService)) {
      setPropertyType('residential')
    }
    resetReview()
  }

  function handleFiles(nextFiles: FileList | null) {
    if (!nextFiles) return
    const selected = Array.from(nextFiles)
    const combined = [...files, ...selected]

    if (combined.length > MAX_FILES) {
      setError(`Choose up to ${MAX_FILES} images per quote request.`)
      return
    }

    const invalid = selected.find((file) => !isAcceptedImage(file) || file.size > MAX_FILE_SIZE)
    if (invalid) {
      setError('Each image must be JPG, PNG, WebP, HEIC, or HEIF and no larger than 8 MB.')
      return
    }

    if (combined.reduce((sum, file) => sum + file.size, 0) > MAX_TOTAL_SIZE) {
      setError('The combined image selection must stay under 50 MB.')
      return
    }

    const deduped = combined.filter((file, index, list) =>
      list.findIndex((candidate) =>
        candidate.name === file.name &&
        candidate.size === file.size &&
        candidate.lastModified === file.lastModified,
      ) === index,
    )

    setFiles(deduped)
    setError(null)
    resetReview()
  }

  function removeFile(target: File) {
    setFiles((current) => current.filter((file) => file !== target))
    setError(null)
    resetReview()
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!phoneValid || !postalCodeValid) return
    setReadyForReview(true)
  }

  return (
    <section className="px-5 py-14 lg:px-8 lg:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
          <aside className="rounded-[2.2rem] bg-tranquility-charcoal p-8 text-white shadow-premium lg:sticky lg:top-32 sm:p-10">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/50">Custom property review</p>
            <h1 className="mt-5 font-serif text-4xl tracking-tight sm:text-5xl">Show us the space. We&apos;ll understand the scope.</h1>
            <p className="mt-6 text-sm leading-7 text-white/65">Use this path when the property needs a closer look before pricing or scheduling is finalized.</p>
            <div className="mt-8 grid gap-4 border-t border-white/10 pt-7">
              {['Residential custom quotes', 'Larger homes and unusual layouts', 'Commercial cleaning inquiries', 'Special conditions or detailed scope'].map((item) => (
                <span key={item} className="flex items-start gap-3 text-sm text-white/78">
                  <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-tranquility-stone" aria-hidden="true" />
                  {item}
                </span>
              ))}
            </div>
            <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.055] p-5">
              <ShieldCheck className="size-5 text-tranquility-stone" aria-hidden="true" />
              <p className="mt-3 text-xs leading-6 text-white/60">Property photos should show only the cleaning scope. Avoid identification documents, payment information, security credentials, or unrelated sensitive material.</p>
            </div>
          </aside>

          <form className="rounded-[2.2rem] bg-white p-7 shadow-premium sm:p-10" onSubmit={handleSubmit}>
            <div>
              <p className="eyebrow">Property details</p>
              <h2 className="mt-4 font-serif text-3xl">Tell Tranquility what needs attention.</h2>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-black/55">Provide enough detail to understand the property, desired service, current condition, and timing before a custom price is prepared.</p>
            </div>

            <div className="mt-8 grid gap-5 sm:grid-cols-2">
              <label className="grid gap-2 text-sm font-semibold">Full name<input autoComplete="name" className="field" minLength={2} onChange={(event) => { setFullName(event.target.value); resetReview() }} required value={fullName} /></label>
              <label className="grid gap-2 text-sm font-semibold">Email<input autoComplete="email" className="field" onChange={(event) => { setEmail(event.target.value); resetReview() }} required type="email" value={email} /></label>
              <label className="grid gap-2 text-sm font-semibold">Phone<input aria-invalid={phone.length > 0 && !phoneValid} autoComplete="tel" className="field" inputMode="tel" onChange={(event) => { setPhone(event.target.value); resetReview() }} required type="tel" value={phone} />{phone.length > 0 && !phoneValid ? <span className="text-xs font-normal text-red-700">Enter a phone number with at least 10 digits.</span> : null}</label>
              <label className="grid gap-2 text-sm font-semibold">Preferred contact<select className="field" onChange={(event) => { setContactPreference(event.target.value); resetReview() }} value={contactPreference}><option>Phone or text</option><option>Email</option><option>Either is fine</option></select></label>
              <label className="grid gap-2 text-sm font-semibold sm:col-span-2">Property address<input autoComplete="street-address" className="field" minLength={4} onChange={(event) => { setAddress(event.target.value); resetReview() }} required value={address} /></label>
              <label className="grid gap-2 text-sm font-semibold">City<input autoComplete="address-level2" className="field" minLength={2} onChange={(event) => { setCity(event.target.value); resetReview() }} required value={city} /></label>
              <label className="grid gap-2 text-sm font-semibold">ZIP code<input aria-invalid={postalCode.length > 0 && !postalCodeValid} autoComplete="postal-code" className="field" inputMode="numeric" onChange={(event) => { setPostalCode(event.target.value); resetReview() }} required value={postalCode} />{postalCode.length > 0 && !postalCodeValid ? <span className="text-xs font-normal text-red-700">Enter a valid ZIP code.</span> : null}</label>
            </div>

            <div className="mt-7 grid gap-5 sm:grid-cols-2">
              <label className="grid gap-2 text-sm font-semibold">Property type<select className="field" onChange={(event) => { setPropertyType(event.target.value); resetReview() }} value={propertyType}><option value="residential">Residential</option><option value="commercial">Commercial</option><option value="other">Other / not sure</option></select></label>
              <label className="grid gap-2 text-sm font-semibold">Service needed<select className="field" onChange={(event) => handleServiceChange(event.target.value)} value={serviceInterest}><option value="specialty">Specialty / not sure</option><option value="standard-cleaning">Standard residential cleaning</option><option value="deep-cleaning">Deep cleaning</option><option value="move-in-out">Move-in / move-out</option><option value="commercial">Commercial cleaning</option></select></label>
              <label className="grid gap-2 text-sm font-semibold">Approx. square footage <span className="font-normal text-black/40">(optional)</span><input className="field" min="1" onChange={(event) => { setSquareFootage(event.target.value); resetReview() }} step="50" type="number" value={squareFootage} /></label>
              <label className="grid gap-2 text-sm font-semibold">Current condition<select className="field" onChange={(event) => { setCondition(event.target.value); resetReview() }} value={condition}><option value="routine">Routine / maintained</option><option value="needs-review">Needs extra attention</option><option value="heavy">Heavy buildup / major reset</option><option value="unsure">Not sure</option></select></label>
              <label className="grid gap-2 text-sm font-semibold sm:col-span-2">Preferred service timing<select className="field" onChange={(event) => { setPreferredTiming(event.target.value); resetReview() }} value={preferredTiming}><option>As soon as possible</option><option>Within 1–2 weeks</option><option>Within 30 days</option><option>Planning ahead / flexible</option></select></label>
            </div>

            <label className="mt-7 grid gap-2 text-sm font-semibold">
              Tell us about the space
              <textarea className="field min-h-36" maxLength={2000} onChange={(event) => { setDetails(event.target.value); resetReview() }} placeholder="Describe the rooms, current condition, special concerns, pets, access details, stains, appliances, flooring, or the cleaning outcome you want." required value={details} />
              <span className="text-right text-xs font-normal text-black/45">{details.length}/2000</span>
            </label>

            <div className="mt-7 rounded-[1.8rem] border border-dashed border-black/18 bg-tranquility-ivory p-6 sm:p-7">
              <Camera className="size-6 text-tranquility-moss" aria-hidden="true" />
              <p className="mt-4 font-semibold">Select interior property photos</p>
              <p className="mt-2 text-sm leading-6 text-black/55">You can select up to {MAX_FILES} JPG, PNG, WebP, HEIC, or HEIF images, maximum 8 MB each and 50 MB total. Files remain local to this page until a secure upload service is connected.</p>
              <input accept="image/jpeg,image/png,image/webp,image/heic,image/heif,.heic,.heif" className="mt-5 block w-full text-sm" multiple onChange={(event) => handleFiles(event.target.files)} type="file" />
              {error ? <p className="mt-4 text-sm font-semibold text-red-700" role="alert">{error}</p> : null}
              {files.length ? (
                <>
                  <div className="mt-5 flex items-center justify-between gap-4 text-xs text-black/50"><span>{files.length} of {MAX_FILES} images selected</span><span>{formatBytes(totalUploadSize)} total</span></div>
                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    {previews.map(({ file, url }) => (
                      <div key={`${file.name}-${file.lastModified}`} className="overflow-hidden rounded-2xl border border-black/8 bg-white">
                        {url ? <img alt={`Selected property preview: ${file.name}`} className="h-36 w-full object-cover" src={url} /> : null}
                        <div className="flex items-center gap-3 p-3 text-xs text-black/65">
                          <FileImage className="size-4 shrink-0 text-tranquility-moss" aria-hidden="true" />
                          <span className="min-w-0 flex-1 truncate">{file.name}</span>
                          <button aria-label={`Remove ${file.name}`} className="grid size-8 shrink-0 place-items-center rounded-full transition hover:bg-tranquility-ivory" onClick={() => removeFile(file)} type="button"><Trash2 className="size-4" aria-hidden="true" /></button>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              ) : null}
            </div>

            <div className="mt-7 flex items-start gap-3 rounded-2xl bg-tranquility-stone/25 p-4 text-xs leading-6 text-black/60">
              <Info className="mt-0.5 size-4 shrink-0 text-tranquility-moss" aria-hidden="true" />
              <span>Final pricing is confirmed after the property details and requested scope are reviewed.</span>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Button disabled={!phoneValid || !postalCodeValid} type="submit">Review quote request</Button>
              <span className="text-xs text-black/50">No payment information is requested on this form.</span>
            </div>

            {readyForReview ? (
              <div className="mt-6 rounded-[1.8rem] border border-tranquility-sage/30 bg-tranquility-sage/10 p-6" role="status">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="mt-1 size-5 shrink-0 text-tranquility-moss" aria-hidden="true" />
                  <div>
                    <p className="font-serif text-2xl">Your quote request details are ready.</p>
                    <p className="mt-2 text-sm leading-6 text-black/60">Contact Tranquility to continue the review. If you selected property photos, ask for the preferred secure way to send them with the request.</p>
                  </div>
                </div>
                <dl className="mt-6 grid gap-3 border-t border-black/8 pt-5 text-sm sm:grid-cols-2">
                  <div><dt className="text-black/45">Customer</dt><dd className="mt-1 font-semibold">{fullName}</dd></div>
                  <div><dt className="text-black/45">Property</dt><dd className="mt-1 font-semibold">{propertyType} • {city}, {postalCode}</dd></div>
                  <div><dt className="text-black/45">Service</dt><dd className="mt-1 font-semibold">{getServiceLabel(serviceInterest)}</dd></div>
                  <div><dt className="text-black/45">Timing</dt><dd className="mt-1 font-semibold">{preferredTiming}</dd></div>
                  <div><dt className="text-black/45">Condition</dt><dd className="mt-1 font-semibold">{condition.replaceAll('-', ' ')}</dd></div>
                  <div><dt className="text-black/45">Photos</dt><dd className="mt-1 font-semibold">{files.length ? `${files.length} selected locally` : 'No photos selected'}</dd></div>
                </dl>
                <div className="mt-6 flex flex-wrap gap-3 border-t border-black/8 pt-5">
                  <a className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-tranquility-charcoal px-5 text-sm font-semibold text-white" href={siteConfig.phoneHref}><Phone className="size-4" aria-hidden="true" />Call {siteConfig.shortName}</a>
                  <a className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-black/10 bg-white px-5 text-sm font-semibold" href={emailHref}><Mail className="size-4" aria-hidden="true" />Email quote details</a>
                </div>
              </div>
            ) : null}
          </form>
        </div>
      </div>
    </section>
  )
}
