import { images } from '../data/images'
import { contactPlaceholders } from '../data/site'
import Reveal from './Reveal'

export default function CTA() {
  return (
    <section className="relative overflow-hidden" aria-labelledby="cta-heading">
      <img
        src={images.cta.src}
        srcSet={images.cta.srcSet}
        sizes="100vw"
        alt={images.cta.alt}
        loading="lazy"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-ink/70" />
      <div className="relative mx-auto max-w-[1440px] px-5 py-28 md:px-10 md:py-36">
        <Reveal>
          <h2 id="cta-heading" className="editorial-heading max-w-3xl text-5xl text-cream sm:text-6xl md:text-7xl lg:text-8xl">
            LET&apos;S CREATE
            <span className="block">SOMETHING</span>
            <span className="block italic text-gold">EXCEPTIONAL.</span>
          </h2>
          <p className="mt-8 max-w-md text-sm leading-relaxed text-cream-muted md:text-base">
            Have a space in mind? Let&apos;s turn your vision into a design.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-5">
            <a
              href="#contact"
              className="inline-flex min-h-12 items-center border border-cream px-7 text-[11px] tracking-[0.22em] text-cream uppercase transition-colors hover:bg-cream hover:text-ink"
            >
              Start Your Project →
            </a>
            <a
              href={contactPlaceholders.whatsappHref}
              className="text-[11px] tracking-[0.22em] text-gold uppercase transition-colors hover:text-cream"
            >
              Talk on WhatsApp
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
