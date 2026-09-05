import { useState } from 'react'
import { onsiteProjectCategories, onsiteProjects } from '../data/onsiteProjects'
import OnSiteProjectCard from './OnSiteProjectCard'
import ProjectModal from './ProjectModal'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading'

export default function OnSiteProjects() {
  const [activeCategory, setActiveCategory] = useState('All Projects')
  const [activeProject, setActiveProject] = useState(null)
  const visibleProjects = activeCategory === 'All Projects'
    ? onsiteProjects
    : onsiteProjects.filter((project) => [project.category, project.projectType].includes(activeCategory))

  return (
    <section id="on-site-projects" className="border-t border-line bg-ink-elevated px-5 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-[1440px]">
        <SectionHeading
          eyebrow="From Design To Reality"
          title="ON-SITE PROJECTS"
          subtitle="From concept to reality — explore our work beyond the screen."
        />
        <Reveal className="mb-10 max-w-2xl" delay={0.08}>
          <p className="text-sm leading-relaxed text-cream-muted md:text-base">
            Explore real spaces, ongoing transformations and completed projects brought to life through thoughtful design and execution.
          </p>
        </Reveal>
        <Reveal className="mb-10 overflow-x-auto pb-2" delay={0.12}>
          <div className="flex min-w-max gap-6 border-b border-line" role="tablist" aria-label="On-site project categories">
            {onsiteProjectCategories.map((category) => (
              <button
                key={category}
                type="button"
                role="tab"
                aria-selected={activeCategory === category}
                onClick={() => setActiveCategory(category)}
                className={`border-b-2 pb-3 text-[10px] tracking-[0.18em] uppercase transition-colors ${activeCategory === category ? 'border-gold text-cream' : 'border-transparent text-cream-muted hover:text-cream'}`}
              >
                {category}
              </button>
            ))}
          </div>
        </Reveal>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-12 md:auto-rows-[330px] md:gap-4">
          {visibleProjects.map((project, index) => (
            <OnSiteProjectCard key={project.id} project={project} index={index} onSelect={setActiveProject} />
          ))}
        </div>
        <p className="mt-8 max-w-2xl text-xs leading-relaxed text-cream-muted">
          On-site project photography and details will be added as they become available.
        </p>
      </div>
      <ProjectModal project={activeProject} onClose={() => setActiveProject(null)} />
    </section>
  )
}