import { useRef, useState } from 'react'
import { ImagePlus, X } from 'lucide-react'

const MAX_FILE_SIZE = 10 * 1024 * 1024
const ACCEPTED_TYPES = ['image/jpeg', 'image/png', 'image/webp']

export default function ImageUploader({ files, setFiles }) {
  const inputRef = useRef(null)
  const [error, setError] = useState('')

  const addFiles = (event) => {
    const selected = Array.from(event.target.files || [])
    const invalid = selected.find((file) => !ACCEPTED_TYPES.includes(file.type) || file.size > MAX_FILE_SIZE)
    if (invalid) {
      setError('Use JPG, PNG or WEBP images up to 10 MB each.')
      event.target.value = ''
      return
    }
    setError('')
    setFiles((current) => [...current, ...selected.map((file) => ({ file, url: URL.createObjectURL(file) }))])
    event.target.value = ''
  }

  const removeFile = (url) => {
    URL.revokeObjectURL(url)
    setFiles((current) => current.filter((item) => item.url !== url))
  }

  return (
    <div className="border-t border-line pt-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h3 className="text-sm text-cream">Upload project images</h3>
          <p className="mt-1 text-xs text-cream-muted">JPG, PNG or WEBP, up to 10 MB each.</p>
        </div>
        <button type="button" onClick={() => inputRef.current?.click()} className="inline-flex items-center gap-2 border border-line px-3 py-2 text-[10px] tracking-[0.16em] text-cream uppercase transition-colors hover:border-gold hover:text-gold">
          <ImagePlus className="h-4 w-4" /> Add Images
        </button>
      </div>
      <input ref={inputRef} type="file" accept="image/jpeg,image/png,image/webp" multiple className="sr-only" onChange={addFiles} />
      {error ? <p className="mt-4 text-xs text-gold">{error}</p> : null}
      {files.length ? (
        <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {files.map(({ file, url }) => (
            <div key={url} className="relative aspect-square overflow-hidden border border-line">
              <img src={url} alt={file.name} className="h-full w-full object-cover" />
              <button type="button" onClick={() => removeFile(url)} className="absolute right-2 top-2 inline-flex h-8 w-8 items-center justify-center bg-ink/80 text-cream" aria-label={`Remove ${file.name}`}>
                <X className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  )
}