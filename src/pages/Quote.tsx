import { Camera, CheckCircle2, FileImage, Info, ShieldCheck } from 'lucide-react'
import { useState, type FormEvent } from 'react'
import { Button } from '@/components/ui/Button'
import { siteConfig } from '@/config/site'

const MAX_FILES = 12
const MAX_FILE_SIZE = 8 * 1024 * 1024
const acceptedTypes = new Set(['image/jpeg', 'image/png', 'image/webp', 'image/heic'])

export function Quote() {
  const [files, setFiles] = useState<File[]>([])
  const [error, setError] = useState<string | null>(null)
  const [notice, setNotice] = useState<string | null>(null)

  function handleFiles(nextFiles: FileList | null) {
    if (!nextFiles) return
    const selected = Array.from(nextFiles)

    if (selected.length > MAX_FILES) {
      setError(`Choose up to ${MAX_FILES} images per quote request.`)
      return
    }

    const invalid = selected.find((file) => !acceptedTypes.has(file.type) || file.size > MAX_FILE_SIZE)
    if (invalid) {
      setError('Each image must be JPG, PNG, WebP, or HEIC and no larger than 8 MB.')
      return
    }

    setFiles(selected)
    setError(null)
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setNotice(`Your quote profile is ready for the secure submission layer. Until online persistence is activated, contact ${siteConfig.phone} or ${siteConfig.email} for immediate assistance.`)
  }

  return (
    <section className="px-5 py-14 lg:px-8 lg:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
          <aside className="rounded-[2.2rem] bg-tranquility-charcoal p-8 text-white shadow-soft lg:sticky lg:top-32 sm:p-10">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-white/45">Virtual consultation</p>
            <h1 className="mt-5 font-serif text-4xl tracking-tight sm:text-5xl">Show us the space. We&apos;ll understand the scope.</h1>
            <p className="mt-6 text-sm leading-7 text-white/62">Use this path when the property needs a closer look than instant residential pricing can provide.</p>
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
              <p className="mt-3 text-xs leading-6 text-white/58">Property photos are intended only to help evaluate cleaning scope. Avoid uploading identification documents, payment information, or unrelated sensitive material.</p>
            </div>
          </aside>

          <form className="rounded-[2.2rem] bg-white p-7 shadow-soft sm:p-10" onSubmit={handleSubmit}>
            <div>
              <p className="eyebrow">Property details</p>
              <h2 className="mt-4 font-serif text-3xl">Tell Tranquility what needs attention.</h2>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-black/55">Provide enough detail to understand the home or commercial space before a custom price is prepared.</p>
            </div>

            <div className="mt-8 grid gap-5 sm:grid-cols-2">
              {['Full name', 'Email', 'Phone', 'Property address'].map((label) => (
                <label key={label} className="grid gap-2 text-sm font-semibold">
                  {label}
                  <input className="field" required />
                </label>
              ))}
            </div>

            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              <label className="grid gap-2 text-sm font-semibold">
                Property type
                <select className="field" defaultValue="residential">
                  <option value="residential">Residential</option>
                  <option value="commercial">Commercial</option>
                  <option value="other">Other / not sure</option>
                </select>
              </label>
              <label className="grid gap-2 text-sm font-semibold">
                Approx. square footage
                <input className="field" min="0" step="50" type="number" />
              </label>
            </div>

            <label className="mt-6 grid gap-2 text-sm font-semibold">
              Tell us about the space
              <textarea className="field min-h-36" placeholder="Describe the rooms, current condition, special concerns, pets, access details, or the cleaning outcome you want." required />
            </label>

            <div className="mt-7 rounded-[1.8rem] border border-dashed border-black/18 bg-tranquility-ivory p-6 sm:p-7">
              <Camera className="size-6 text-tranquility-moss" aria-hidden="true" />
              <p className="mt-4 font-semibold">Add interior property photos</p>
              <p className="mt-2 text-sm leading-6 text-black/55">Choose up to {MAX_FILES} JPG, PNG, WebP, or HEIC images, maximum 8 MB each.</p>
              <input accept="image/jpeg,image/png,image/webp,image/heic" className="mt-5 block w-full text-sm" multiple onChange={(event) => handleFiles(event.target.files)} type="file" />
              {error ? <p className="mt-4 text-sm font-semibold text-red-700" role="alert">{error}</p> : null}
              {files.length ? (
                <div className="mt-5 grid gap-2 sm:grid-cols-2">
                  {files.map((file) => (
                    <div key={`${file.name}-${file.lastModified}`} className="flex min-w-0 items-center gap-2 rounded-xl bg-white px-3 py-2 text-xs text-black/65">
                      <FileImage className="size-4 shrink-0 text-tranquility-moss" aria-hidden="true" />
                      <span className="truncate">{file.name}</span>
                    </div>
                  ))}
                </div>
              ) : null}
            </div>

            <div className="mt-7 flex items-start gap-3 rounded-2xl bg-tranquility-stone/25 p-4 text-xs leading-6 text-black/58">
              <Info className="mt-0.5 size-4 shrink-0 text-tranquility-moss" aria-hidden="true" />
              <span>Base pricing can increase or decrease after the property details and requested scope are reviewed.</span>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Button type="submit">Review quote profile</Button>
              <span className="text-xs text-black/45">No payment information is requested on this form.</span>
            </div>

            {notice ? <p className="mt-5 rounded-2xl border border-tranquility-sage/30 bg-tranquility-sage/10 p-4 text-sm leading-6 text-black/70" role="status">{notice}</p> : null}
          </form>
        </div>
      </div>
    </section>
  )
}
