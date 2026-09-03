import { processSteps } from '../data/site'
import SectionHeading from './SectionHeading'
import Reveal from './Reveal'

export default function Process() {
  return (
    <section id="process" className="border-t border-line bg-ink px-5 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-[1440px]">
        <SectionHeading eyebrow="Method" title="FROM IDEA TO SPACE" />
        <div className="relative grid gap-0 md:grid-cols-4">
          <div className="pointer-events-none absolute top-0 bottom-0 left-[11px] w-px bg-line md:top-8 md:right-0 md:left-0 md:h-px md:w-full" />
          {processSteps.map((step, index) => (
            <Reveal key={step.number} delay={index * 0.08} className="relative pl-10 md:pl-0 md:pr-8">
              <div className="absolute top-1.5 left-0 h-2.5 w-2.5 rounded-full border border-gold bg-ink md:top-6" />
              <p className="text-[11px] tracking-[0.24em] text-gold md:mt-12">{step.number}</p>
              <h3 className="editorial-heading mt-3 text-2xl uppercase md:text-3xl">{step.title}</h3>
              <p className="mt-4 mb-12 max-w-xs text-sm leading-relaxed text-cream-muted md:mb-0">
                {step.description}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
