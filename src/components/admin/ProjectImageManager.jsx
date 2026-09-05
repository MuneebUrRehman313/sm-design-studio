import { Trash2 } from 'lucide-react'

export default function ProjectImageManager({ images, onDelete, deletingId }) {
  if (!images.length) return null
  return (
    <div className="border-t border-line pt-6">
      <h3 className="text-sm text-cream">Current images</h3>
      <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {images.map((image) => (
          <div key={image.id} className="relative aspect-square overflow-hidden border border-line">
            <img src={image.src} alt={image.alt} className="h-full w-full object-cover" />
            <button type="button" onClick={() => onDelete(image)} disabled={deletingId === image.id} className="absolute right-2 top-2 inline-flex h-8 w-8 items-center justify-center bg-ink/80 text-cream disabled:opacity-50" aria-label="Delete image">
              <Trash2 className="h-4 w-4" />
            </button>
            {image.stage ? <span className="absolute inset-x-0 bottom-0 bg-ink/75 px-2 py-1 text-[9px] text-cream">{image.stage}</span> : null}
          </div>
        ))}
      </div>
    </div>
  )
}