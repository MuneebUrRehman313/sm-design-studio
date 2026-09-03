import { ArrowUpRight } from 'lucide-react'
import { services } from '../data/site'
import SectionHeading from './SectionHeading'
import Reveal from './Reveal'

export default function Services() {
  return (
    <section id="services" className="border-y border-line bg-ink-elevated px-5 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-[1440px]">
        <SectionHeading eyebrow="Capabilities" title="WHAT WE DO" />
        <div className="divide-y divide-line border-y border-line">
          {services.map((service, index) => (
            <Reveal key={service.number} delay={index * 0.04}>
              <a
                href="#contact"
                className="group grid grid-cols-[auto_1fr_auto] items-baseline gap-x-6 gap-y-3 py-8 md:grid-cols-12 md:py-10"
              >
                <span className="text-[11px] tracking-[0.2em] text-gold md:col-span-2">
                  {service.number}
                </span>
                <h3 className="editorial-heading text-2xl text-cream transition-colors group-hover:text-gold md:col-span-4 md:text-4xl">
                  {service.title}
                </h3>
                <p className="col-span-3 max-w-md text-sm leading-relaxed text-cream-muted md:col-span-5">
                  {service.description}
                </p>
                <ArrowUpRight
                  className="h-4 w-4 text-cream-muted transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-gold md:col-span-1 md:justify-self-end"
                  aria-hidden="true"
                />
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
