import { motion, useReducedMotion } from 'framer-motion'
import { ArrowDown } from 'lucide-react'
import { images } from '../data/images'
import { studio } from '../data/site'

const lineVariants = {
  hidden: { opacity: 0, y: 28 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.35 + i * 0.12, duration: 0.9, ease: [0.22, 1, 0.36, 1] },
  }),
}

export default function Hero() {
  const reduce = useReducedMotion()
  const heading = ['WE DESIGN', 'SPACES THAT', 'INSPIRE.']

  return (
    <section id="home" className="relative h-dvh min-h-[640px] overflow-hidden" aria-label="Introduction">
      <div className="absolute inset-0">
        <img
          src={images.hero.src}
          srcSet={images.hero.srcSet}
          sizes="100vw"
          alt={images.hero.alt}
          className={`h-full w-full object-cover ${reduce ? '' : 'ken-burns'}`}
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-ink/55" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-ink/35" />
      </div>

      <div className="relative z-10 mx-auto flex h-full max-w-[1440px] flex-col justify-end px-5 pb-24 pt-28 md:px-10 md:pb-16">
        <motion.p
          className="text-[11px] tracking-[0.34em] text-gold uppercase"
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
        >
          {studio.tagline}
        </motion.p>

        <h1 className="editorial-heading mt-6 max-w-5xl text-[14vw] text-cream sm:text-7xl md:text-8xl lg:text-[6.5rem]">
          {heading.map((line, i) => (
            <motion.span
              key={line}
              className="block"
              custom={i}
              variants={lineVariants}
              initial={reduce ? false : 'hidden'}
              animate="show"
            >
              {line}
            </motion.span>
          ))}
        </h1>

        <motion.p
          className="mt-7 max-w-xl text-sm leading-relaxed text-cream-muted md:text-base"
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.85 }}
        >
          Thoughtful interiors, striking exteriors and photorealistic visualizations crafted to
          bring architectural ideas to life.
        </motion.p>

        <motion.div
          className="mt-10 flex flex-wrap items-center gap-4"
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <a
            href="#projects"
            className="inline-flex min-h-12 items-center border border-cream/80 px-7 text-[11px] tracking-[0.22em] text-cream uppercase transition-colors hover:bg-cream hover:text-ink"
          >
            Explore Projects
          </a>
          <a
            href="#contact"
            className="inline-flex min-h-12 items-center px-4 text-[11px] tracking-[0.22em] text-gold uppercase transition-colors hover:text-cream"
          >
            Start Your Project
          </a>
        </motion.div>
      </div>

      <a
        href="#statement"
        className="absolute bottom-7 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-[10px] tracking-[0.28em] text-cream-muted uppercase"
        aria-label="Scroll to next section"
      >
        <span className="hidden sm:inline">Scroll</span>
        <ArrowDown className="h-4 w-4 animate-bounce" aria-hidden="true" />
      </a>
    </section>
  )
}
