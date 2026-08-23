import { useState } from 'react'
import { Camera, FileImage } from 'lucide-react'

const MAX_FILES = 12
const MAX_FILE_SIZE = 8 * 1024 * 1024
const acceptedTypes = new Set(['image/jpeg', 'image/png', 'image/webp', 'image/heic'])

export function Quote() {
  const [files, setFiles] = useState<File[]>([])
  const [error, setError] = useState<string | null>(null)

  function handleFiles(nextFiles: FileList | null) {
    if (!nextFiles) return
    const selected = Array.from(nextFiles)
    if (selected.length > MAX_FILES) {
      setError(`Upload up to ${MAX_FILES} images per quote request.`)
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

  return (
    <section className="px-5 py-14 lg:px-8 lg:py-20">
      <div className="mx-auto max-w-5xl">
        <p className="eyebrow">Virtual consultation</p>
        <h1 className="mt-4 font-serif text-5xl tracking-tight">Request a more accurate quote.</h1>
        <p className="mt-5 max-w-2xl text-base leading-7 text-black/60">For custom jobs or homes that need visual review, send the property details and optional interior images. Images are not uploaded anywhere in this frontend-only milestone.</p>
        <div className="mt-10 rounded-4xl bg-white p-7 shadow-soft sm:p-9">
          <div className="grid gap-6 sm:grid-cols-2">
            {['Full name', 'Email', 'Phone', 'Property address'].map((label) => (
              <label key={label} className="grid gap-2 text-sm font-semibold">{label}<input className="field" /></label>
            ))}
          </div>
          <label className="mt-6 grid gap-2 text-sm font-semibold">Tell us about the space<textarea className="field min-h-32" /></label>
          <div className="mt-6 rounded-3xl border border-dashed border-black/20 bg-tranquility-ivory p-6">
            <Camera className="size-6 text-tranquility-moss" />
            <p className="mt-3 font-semibold">Add interior photos</p>
            <p className="mt-1 text-sm text-black/55">Up to {MAX_FILES} images. Private Supabase Storage and signed access will be added before production submissions are enabled.</p>
            <input accept="image/jpeg,image/png,image/webp,image/heic" className="mt-4 block w-full text-sm" multiple onChange={(event) => handleFiles(event.target.files)} type="file" />
            {error ? <p className="mt-3 text-sm font-semibold text-red-700" role="alert">{error}</p> : null}
            {files.length ? <div className="mt-4 grid gap-2">{files.map((file) => <div key={`${file.name}-${file.lastModified}`} className="flex items-center gap-2 text-sm"><FileImage className="size-4" />{file.name}</div>)}</div> : null}
          </div>
        </div>
      </div>
    </section>
  )
}
