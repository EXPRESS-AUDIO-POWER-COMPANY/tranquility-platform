import { useState } from 'react'
import { Camera, FileImage } from 'lucide-react'

const MAX_FILES = 12
const MAX_FILE_SIZE = 8 * 1024 * 1024
const acceptedTypes = new Set(['image/jpeg', 'image/png', 'image/webp', 'image/heic', 'image/heif'])

export function Quote() {
  const [files, setFiles] = useState<File[]>([])
  const [error, setError] = useState<string | null>(null)

  function handleFiles(nextFiles: FileList | null) {
    if (!nextFiles) return
    const selected = Array.from(nextFiles)
    if (selected.length > MAX_FILES) {
      setError(`Choose up to ${MAX_FILES} images per quote request.`)
      return
    }
    const invalid = selected.find((file) => !acceptedTypes.has(file.type) || file.size > MAX_FILE_SIZE)
    if (invalid) {
      setError('Each image must be JPG, PNG, WebP, HEIC, or HEIF and no larger than 8 MB.')
      return
    }
    setFiles(selected)
    setError(null)
  }

  return (
    <section className="px-5 py-14 lg:px-8 lg:py-20">
      <div className="mx-auto max-w-5xl">
        <p className="eyebrow">Virtual consultation</p>
        <h1 className="mt-4 font-serif text-5xl tracking-tight">Request a more accurate quote.</h1>
        <p className="mt-5 max-w-2xl text-base leading-7 text-black/60">
          If your home needs a closer look before pricing, share the property details and optional interior photos. This is especially useful for move-in or move-out cleaning, heavier conditions, larger homes, and custom requests.
        </p>
        <form className="mt-10 rounded-4xl bg-white p-7 shadow-soft sm:p-9" onSubmit={(event) => event.preventDefault()}>
          <div className="grid gap-6 sm:grid-cols-2">
            <label className="grid gap-2 text-sm font-semibold">Full name<input autoComplete="name" className="field" name="name" required /></label>
            <label className="grid gap-2 text-sm font-semibold">Phone<input autoComplete="tel" className="field" name="phone" required type="tel" /></label>
            <label className="grid gap-2 text-sm font-semibold">Email<input autoComplete="email" className="field" name="email" required type="email" /></label>
            <label className="grid gap-2 text-sm font-semibold">Property address<input autoComplete="street-address" className="field" name="address" required /></label>
            <label className="grid gap-2 text-sm font-semibold">
              Service needed
              <select className="field" defaultValue="standard" name="serviceType">
                <option value="standard">Standard residential cleaning</option>
                <option value="deep">Deep cleaning</option>
                <option value="move-in-out">Move-in / move-out cleaning</option>
                <option value="commercial">Commercial / office cleaning</option>
                <option value="other">Other / custom</option>
              </select>
            </label>
            <label className="grid gap-2 text-sm font-semibold">Approx. square footage<input className="field" min="0" name="squareFootage" step="50" type="number" /></label>
          </div>
          <label className="mt-6 grid gap-2 text-sm font-semibold">
            Tell us about the space
            <textarea className="field min-h-32" name="notes" placeholder="Describe the condition, rooms, stains, pet hair, access needs, or anything else that would help us quote accurately." required />
          </label>
          <div className="mt-6 rounded-3xl border border-dashed border-black/20 bg-tranquility-ivory p-6">
            <Camera className="size-6 text-tranquility-moss" />
            <p className="mt-3 font-semibold">Add interior photos</p>
            <p className="mt-1 text-sm leading-6 text-black/55">Choose up to {MAX_FILES} images that show the areas you want cleaned. Interior photos are treated as private quote materials.</p>
            <input accept="image/jpeg,image/png,image/webp,image/heic,image/heif" className="mt-4 block w-full text-sm" multiple onChange={(event) => handleFiles(event.target.files)} type="file" />
            {error ? <p className="mt-3 text-sm font-semibold text-red-700" role="alert">{error}</p> : null}
            {files.length ? (
              <div className="mt-4 grid gap-2" aria-label={`${files.length} selected quote images`}>
                {files.map((file) => (
                  <div key={`${file.name}-${file.lastModified}`} className="flex items-center gap-2 text-sm">
                    <FileImage className="size-4" />
                    <span className="truncate">{file.name}</span>
                  </div>
                ))}
              </div>
            ) : null}
          </div>
        </form>
      </div>
    </section>
  )
}
