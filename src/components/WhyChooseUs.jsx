import { reasons } from '../data/site'
import SectionHeading from './SectionHeading'
import Reveal from './Reveal'

export default function WhyChooseUs() {
  return (
    <section id="why" className="border-t border-line bg-ink-elevated px-5 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-[1440px]">
        <SectionHeading eyebrow="Approach" title="WHY DESIGN WITH US?" />
        <div className="grid gap-px bg-line md:grid-cols-2 lg:grid-cols-4">
          {reasons.map((reason, index) => (
            <Reveal
              key={reason.title}
              delay={index * 0.06}
              className="bg-ink-elevated p-8 md:p-10"
            >
              <p className="text-[11px] tracking-[0.24em] text-gold">0{index + 1}</p>
              <h3 className="editorial-heading mt-6 text-2xl text-cream">{reason.title}</h3>
              <p className="mt-4 text-sm leading-relaxed text-cream-muted">{reason.text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
