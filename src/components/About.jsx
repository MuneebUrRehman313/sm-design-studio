import { images } from '../data/images'
import Reveal from './Reveal'

export default function About() {
  return (
    <section id="about" className="bg-ink">
      <div className="mx-auto grid max-w-[1440px] lg:grid-cols-2">
        <div className="relative min-h-[420px] overflow-hidden lg:min-h-[760px]">
          <img
            src={images.about.src}
            srcSet={images.about.srcSet}
            sizes="(max-width: 1024px) 100vw, 50vw"
            alt={images.about.alt}
            loading="lazy"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>
        <div className="flex flex-col justify-center px-5 py-16 md:px-12 md:py-24 lg:px-16">
          <Reveal>
            <p className="text-[11px] tracking-[0.32em] text-gold uppercase">Studio</p>
            <h2 className="editorial-heading mt-4 text-4xl text-cream md:text-5xl">
              ABOUT SM DESIGN STUDIO
            </h2>
            <p className="mt-8 max-w-md text-sm leading-[1.9] text-cream-muted md:text-[15px]">
              SM Design Studio brings together architecture, interiors and visualization to create
              spaces that balance aesthetics, functionality and individuality.
            </p>
            <p className="editorial-heading mt-14 text-3xl text-cream md:text-4xl">
              DESIGN WITH PURPOSE.
              <span className="mt-2 block italic text-gold">Detail with intention.</span>
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
