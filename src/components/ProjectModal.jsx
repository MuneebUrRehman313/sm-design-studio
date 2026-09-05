import { useEffect, useId } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'

export default function ProjectModal({ project, onClose }) {
  const titleId = useId()

  useEffect(() => {
    if (!project) return undefined
    const onKeyDown = (event) => {
      if (event.key === 'Escape') onClose()
    }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [project, onClose])

  return (
    <AnimatePresence>
      {project ? (
        <motion.div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-ink/90 p-4 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
        >
          <button type="button" className="absolute inset-0 cursor-default" aria-label="Close project details" onClick={onClose} />
          <motion.div
            className="relative z-10 max-h-[calc(100dvh-2rem)] w-full max-w-5xl overflow-y-auto border border-line bg-ink-elevated"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.35 }}
          >
            <div className="grid md:grid-cols-[1.1fr_0.9fr]">
              <div className="grid gap-px bg-line sm:grid-cols-2 md:block">
                {project.images.map((image) => (
                  <img key={image.src} src={image.src} srcSet={image.srcSet} alt={image.alt} className="aspect-[4/3] h-full w-full object-cover md:aspect-[4/5]" />
                ))}
              </div>
              <div className="p-6 md:p-10">
                <div className="flex items-start justify-between gap-6">
                  <div>
                    <p className="text-[10px] tracking-[0.28em] text-gold uppercase">{project.category}</p>
                    <h2 id={titleId} className="editorial-heading mt-3 text-3xl text-cream md:text-4xl">{project.title}</h2>
                  </div>
                  <button type="button" onClick={onClose} className="inline-flex h-10 w-10 shrink-0 items-center justify-center border border-line text-cream" aria-label="Close">
                    <X className="h-4 w-4" />
                  </button>
                </div>
                <dl className="mt-8 grid grid-cols-2 gap-y-5 border-y border-line py-5 text-xs">
                  <div><dt className="text-cream-muted">Status</dt><dd className="mt-1 text-cream">{project.status}</dd></div>
                  {project.location ? <div><dt className="text-cream-muted">Location</dt><dd className="mt-1 text-cream">{project.location}</dd></div> : null}
                  {project.projectType ? <div><dt className="text-cream-muted">Project Type</dt><dd className="mt-1 text-cream">{project.projectType}</dd></div> : null}
                  {project.year ? <div><dt className="text-cream-muted">Completion Year</dt><dd className="mt-1 text-cream">{project.year}</dd></div> : null}
                </dl>
                <p className="mt-7 text-sm leading-relaxed text-cream-muted">{project.description}</p>
                {project.stages?.length ? (
                  <div className="mt-10">
                    <p className="text-[10px] tracking-[0.25em] text-gold uppercase">Project Journey</p>
                    <div className="mt-4 grid gap-4 sm:grid-cols-3">
                      {project.stages.map((stage) => (
                        <div key={stage.label}>
                          <img src={stage.image.src} srcSet={stage.image.srcSet} alt={stage.image.alt} className="aspect-square w-full object-cover" />
                          <p className="mt-2 text-xs text-cream-muted">{stage.label}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}