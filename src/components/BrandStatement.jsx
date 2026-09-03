import Reveal from './Reveal'

export default function BrandStatement() {
  return (
    <section id="statement" className="border-b border-line bg-ink">
      <div className="mx-auto grid max-w-[1440px] gap-12 px-5 py-24 md:grid-cols-12 md:px-10 md:py-32 lg:py-40">
        <Reveal className="md:col-span-8">
          <p className="editorial-heading text-3xl text-cream sm:text-5xl md:text-6xl lg:text-[4.25rem]">
            DESIGN IS NOT JUST ABOUT HOW A SPACE LOOKS.
            <span className="mt-4 block italic text-gold">It&apos;s about how it feels.</span>
          </p>
        </Reveal>
        <Reveal delay={0.15} className="flex items-end md:col-span-4 md:col-start-9">
          <p className="max-w-sm text-sm leading-[1.85] text-cream-muted md:text-[15px]">
            SM Design Studio combines creativity, functionality and visualization to create spaces
            with character — interiors that live well, exteriors with presence, and images that
            make the idea tangible before it is built.
          </p>
        </Reveal>
      </div>
    </section>
  )
}
