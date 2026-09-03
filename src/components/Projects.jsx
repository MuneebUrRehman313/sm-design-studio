import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import { projects } from '../data/site'
import ProjectCard from './ProjectCard'
import SectionHeading from './SectionHeading'

export default function Projects() {
  const [active, setActive] = useState(null)

  useEffect(() => {
    if (!active) return undefined
    const onKey = (event) => {
      if (event.key === 'Escape') setActive(null)
    }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [active])

  return (
    <section id="projects" className="bg-ink px-5 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-[1440px]">
        <SectionHeading
          eyebrow="Portfolio"
          title="SELECTED WORK"
          subtitle="A glimpse into our approach to interiors, exteriors and architectural visualization."
        />
        <div className="grid grid-cols-1 gap-3 md:grid-cols-12 md:gap-4">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} onSelect={setActive} />
          ))}
        </div>
        <p className="mt-8 max-w-2xl text-xs leading-relaxed text-cream-muted">
          Project titles and images are placeholders until SM Design Studio project names and
          renders are provided.
        </p>
      </div>

      <AnimatePresence>
        {active ? (
          <motion.div
            className="fixed inset-0 z-[60] flex items-center justify-center bg-ink/90 p-4 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-dialog-title"
          >
            <button
              type="button"
              className="absolute inset-0 cursor-default"
              aria-label="Close project preview"
              onClick={() => setActive(null)}
            />
            <motion.div
              className="relative z-10 w-full max-w-4xl overflow-hidden border border-line bg-ink-elevated"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 16 }}
            >
              <img
                src={active.image.src}
                srcSet={active.image.srcSet}
                alt={active.image.alt}
                className="aspect-[16/10] w-full object-cover"
              />
              <div className="flex items-start justify-between gap-6 p-6 md:p-8">
                <div>
                  <p className="text-[10px] tracking-[0.28em] text-gold uppercase">{active.category}</p>
                  <h3 id="project-dialog-title" className="editorial-heading mt-2 text-3xl">
                    {active.name}
                  </h3>
                  <p className="mt-3 max-w-xl text-sm leading-relaxed text-cream-muted">
                    Placeholder study. Replace with the actual project narrative, drawings and
                    studio renders when they are ready.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setActive(null)}
                  className="inline-flex h-10 w-10 shrink-0 items-center justify-center border border-line text-cream"
                  aria-label="Close"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  )
}
