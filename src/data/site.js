import { images } from './images'

export const studio = {
  name: 'SM DESIGN STUDIO',
  shortName: 'SM Design Studio',
  tagline: 'INTERIOR • EXTERIOR • VISUALIZATION',
}

export const navLinks = [
  { id: 'home', label: 'Home', href: '#home' },
  { id: 'projects', label: 'Projects', href: '#projects' },
  { id: 'services', label: 'Services', href: '#services' },
  { id: 'about', label: 'About', href: '#about' },
  { id: 'contact', label: 'Contact', href: '#contact' },
]

/**
 * Replace placeholder contact values before launch.
 * Keep keys stable so components do not need rewriting.
 */
export const contactPlaceholders = {
  phoneLabel: '9753111687',
  phoneHref: 'tel:',
  emailLabel: 'rehman9753111@gmail.com',
  emailHref: 'mailto:hello@example.com',
  whatsappLabel: '+91 9753111687',
  whatsappHref: 'https://wa.me/',
  instagramLabel: 'SM Design Studio',
  instagramHref: 'https://www.instagram.com/sm_design_studi0/?hl=en',
  locationLabel: 'INDORE, MP, INDIA ',
}

export const projectTypes = [
  'Interior Design',
  'Exterior Design',
  '3D Visualization',
  'Architectural Rendering',
  'Commercial Project',
  'Other',
]

export const projects = [
  {
    id: 'modern-luxury-residence',
    name: 'Modern Luxury Residence',
    category: 'Interior · Residential',
    location: '[Location]',
    span: 'lg:col-span-8',
    height: 'min-h-[420px] lg:min-h-[620px]',
    image: images.projects.luxuryResidence,
  },
  {
    id: 'contemporary-living-space',
    name: 'Contemporary Living Space',
    category: 'Interior',
    location: '[Location]',
    span: 'lg:col-span-4',
    height: 'min-h-[420px] lg:min-h-[620px]',
    image: images.projects.contemporaryLiving,
  },
  {
    id: 'minimalist-villa',
    name: 'Minimalist Villa',
    category: 'Exterior · Residential',
    location: '[Location]',
    span: 'md:col-span-6 lg:col-span-5',
    height: 'min-h-[380px] lg:min-h-[520px]',
    image: images.projects.minimalistVilla,
  },
  {
    id: 'premium-bedroom-interior',
    name: 'Premium Bedroom Interior',
    category: 'Interior · 3D Visualization',
    location: '[Location]',
    span: 'md:col-span-6 lg:col-span-7',
    height: 'min-h-[380px] lg:min-h-[520px]',
    image: images.projects.premiumBedroom,
  },
  {
    id: 'modern-commercial-space',
    name: 'Modern Commercial Space',
    category: 'Commercial',
    location: '[Location]',
    span: 'md:col-span-6',
    height: 'min-h-[360px] lg:min-h-[460px]',
    image: images.projects.commercialSpace,
  },
  {
    id: 'contemporary-exterior',
    name: 'Contemporary Exterior',
    category: 'Exterior · 3D Visualization',
    location: '[Location]',
    span: 'md:col-span-6',
    height: 'min-h-[360px] lg:min-h-[460px]',
    image: images.projects.contemporaryExterior,
  },
]

export const services = [
  {
    number: '01',
    title: 'Interior Design',
    description: 'Functional, refined interiors designed around the way you live and work.',
  },
  {
    number: '02',
    title: 'Exterior Design',
    description: 'Distinctive architectural exteriors that create a strong visual identity.',
  },
  {
    number: '03',
    title: '3D Visualization',
    description: 'Photorealistic visualizations that help you experience the design before execution.',
  },
  {
    number: '04',
    title: 'Architectural Rendering',
    description: 'Detailed renders that communicate materials, lighting and spatial character.',
  },
  {
    number: '05',
    title: 'Space Planning',
    description: 'Thoughtful layouts that balance functionality, movement and aesthetics.',
  },
  {
    number: '06',
    title: 'Commercial Design',
    description: 'Professional spaces designed to reflect your brand and business.',
  },
]

export const processSteps = [
  {
    number: '01',
    title: 'Discover',
    description: 'Understanding your vision, requirements and lifestyle.',
  },
  {
    number: '02',
    title: 'Design',
    description: 'Developing concepts, layouts, materials and visual direction.',
  },
  {
    number: '03',
    title: 'Visualize',
    description: 'Creating detailed 3D visualizations and realistic renders.',
  },
  {
    number: '04',
    title: 'Refine',
    description: 'Finalizing the design with attention to every detail.',
  },
]

export const reasons = [
  {
    title: 'Creative & Functional Design',
    text: 'Spaces are composed to feel considered — beautiful in image, practical in daily use.',
  },
  {
    title: 'Attention to Detail',
    text: 'Materials, proportion, light and joinery are treated as part of one architectural language.',
  },
  {
    title: 'Photorealistic Visualization',
    text: 'Renders are used to test atmosphere and intent before a space is built.',
  },
  {
    title: 'Personalized Approach',
    text: 'Each project is shaped around the people, brief and character of the place.',
  },
]
