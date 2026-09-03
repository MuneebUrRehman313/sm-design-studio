import { ArrowUpRight } from 'lucide-react'

export default function ProjectCard({ project, onSelect }) {
  return (
    <article className={`${project.span} ${project.height}`}>
      <button
        type="button"
        onClick={() => onSelect?.(project)}
        className="group relative block h-full w-full overflow-hidden text-left focus-visible:outline-none"
        aria-label={`View project: ${project.name}`}
      >
        <img
          src={project.image.src}
          srcSet={project.image.srcSet}
          sizes={project.image.sizes}
          alt={project.image.alt}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/15 to-transparent transition-colors duration-500 group-hover:bg-ink/45" />
        <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-6 md:p-8">
          <div>
            <p className="text-[10px] tracking-[0.28em] text-gold uppercase">{project.category}</p>
            <h3 className="editorial-heading mt-2 text-2xl text-cream md:text-3xl">{project.name}</h3>
            <p className="mt-1 text-xs text-cream-muted">{project.location}</p>
          </div>
          <span className="translate-y-2 text-xs tracking-[0.18em] text-cream uppercase opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
            View Project
            <ArrowUpRight className="ml-1 inline h-3.5 w-3.5" aria-hidden="true" />
          </span>
        </div>
      </button>
    </article>
  )
}
