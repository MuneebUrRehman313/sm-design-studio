import { images } from '../data/images'
import Reveal from './Reveal'

export default function VisualShowcase() {
  return (
    <section id="showcase" className="bg-ink py-16 md:py-24" aria-label="Visual showcase">
      <Reveal className="mx-auto mb-10 max-w-[1440px] px-5 md:px-10">
        <p className="text-[11px] tracking-[0.32em] text-gold uppercase">Atmosphere</p>
        <h2 className="editorial-heading mt-3 text-4xl md:text-5xl">STUDIES IN LIGHT &amp; FORM</h2>
      </Reveal>
      <div className="hide-scrollbar flex gap-3 overflow-x-auto px-5 pb-4 md:gap-4 md:px-10">
        {images.showcase.map((image, index) => (
          <figure
            key={image.id}
            className={`group relative shrink-0 overflow-hidden ${
              index % 2 === 0 ? 'h-[52vh] w-[78vw] md:w-[38vw]' : 'h-[52vh] w-[70vw] md:mt-10 md:w-[32vw]'
            }`}
          >
            <img
              src={image.src}
              srcSet={image.srcSet}
              sizes="(max-width: 768px) 78vw, 38vw"
              alt={image.alt}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
            />
            <figcaption className="pointer-events-none absolute inset-0 bg-ink/0 transition-colors duration-500 group-hover:bg-ink/20" />
          </figure>
        ))}
      </div>
    </section>
  )
}
