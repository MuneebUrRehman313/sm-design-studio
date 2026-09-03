import Reveal from './Reveal'

export default function SectionHeading({ eyebrow, title, subtitle, align = 'left' }) {
  const alignment =
    align === 'center' ? 'text-center mx-auto items-center' : 'text-left items-start'

  return (
    <Reveal className={`mb-12 flex max-w-3xl flex-col md:mb-16 ${alignment}`}>
      {eyebrow ? (
        <p className="mb-4 text-[11px] font-medium tracking-[0.32em] text-gold uppercase">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="editorial-heading text-4xl text-cream sm:text-5xl md:text-6xl">{title}</h2>
      {subtitle ? (
        <p className="mt-5 max-w-xl text-sm leading-relaxed text-cream-muted md:text-base">
          {subtitle}
        </p>
      ) : null}
    </Reveal>
  )
}
