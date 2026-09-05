import { ArrowUpRight } from 'lucide-react'
import { motion } from 'framer-motion'

export default function OnSiteProjectCard({ project, index, onSelect }) {
  const span = index === 0 ? 'md:col-span-7 md:row-span-2' : index === 1 ? 'md:col-span-5' : 'md:col-span-5'
  const height = index === 0 ? 'min-h-[480px] md:min-h-[680px]' : 'min-h-[340px] md:min-h-[330px]'

  return (
    <motion.article
      className={`${span} ${height}`}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.7, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
    >
      <button
        type="button"
        onClick={() => onSelect(project)}
        className="group relative block h-full w-full overflow-hidden text-left focus-visible:outline-none"
        aria-label={`View project: ${project.title}`}
      >
        <img
          src={project.image.src}
          srcSet={project.image.srcSet}
          sizes="(max-width: 768px) 100vw, 58vw"
          alt={project.image.alt}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/10 to-transparent transition-colors duration-700 group-hover:bg-ink/55" />
        {project.isPlaceholder ? (
          <span className="absolute right-5 top-5 border border-cream/30 bg-ink/50 px-3 py-2 text-[9px] tracking-[0.2em] text-cream uppercase backdrop-blur-sm">
            Image Placeholder
          </span>
        ) : null}
        <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-5 p-5 md:p-7">
          <div>
            <p className="text-[10px] tracking-[0.25em] text-gold uppercase">{project.category}</p>
            <h3 className="editorial-heading mt-2 text-2xl text-cream md:text-3xl">{project.title}</h3>
            <p className="mt-2 text-xs text-cream-muted">
              {project.status}{project.location ? ` · ${project.location}` : ''}{project.year ? ` · ${project.year}` : ''}
            </p>
          </div>
          <span className="shrink-0 translate-y-2 text-[10px] tracking-[0.18em] text-cream uppercase opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
            View Project <ArrowUpRight className="ml-1 inline h-3.5 w-3.5" aria-hidden="true" />
          </span>
        </div>
      </button>
    </motion.article>
  )
}