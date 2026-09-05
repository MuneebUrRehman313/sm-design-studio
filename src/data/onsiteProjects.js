import { images } from './images'

/**
 * Replace these clearly marked placeholders with real on-site project data.
 * Each project can hold multiple images and an optional concept-to-completion journey.
 */
export const onsiteProjectCategories = [
  'All Projects',
  'Completed Projects',
  'Work In Progress',
  'Interior Execution',
  'Exterior Execution',
  'Residential Projects',
  'Commercial Projects',
]

export const onsiteProjects = [
  {
    id: 'onsite-placeholder-01',
    title: 'On-Site Project Placeholder 01',
    category: 'Interior Execution',
    status: 'Project Details Pending',
    projectType: 'Residential Projects',
    description: 'Replace this placeholder with the real project story, scope and execution details.',
    isPlaceholder: true,
    image: images.projects.luxuryResidence,
    images: [images.projects.luxuryResidence],
    stages: [],
  },
  {
    id: 'onsite-placeholder-02',
    title: 'On-Site Project Placeholder 02',
    category: 'Exterior Execution',
    status: 'Project Details Pending',
    projectType: 'Residential Projects',
    description: 'Replace this placeholder with the real project story, scope and execution details.',
    isPlaceholder: true,
    image: images.projects.minimalistVilla,
    images: [images.projects.minimalistVilla],
    stages: [],
  },
  {
    id: 'onsite-placeholder-03',
    title: 'On-Site Project Placeholder 03',
    category: 'Interior Execution',
    status: 'Project Details Pending',
    projectType: 'Commercial Projects',
    description: 'Replace this placeholder with the real project story, scope and execution details.',
    isPlaceholder: true,
    image: images.projects.commercialSpace,
    images: [images.projects.commercialSpace],
    stages: [],
  },
]