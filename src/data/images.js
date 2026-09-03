/**
 * Central image registry for SM Design Studio.
 * Replace `src` / `srcSet` values with actual studio renders when available.
 * Keep `alt` accurate to each photograph.
 */

const unsplash = (id, w = 1600) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`

const unsplashSet = (id) => ({
  src: unsplash(id, 1600),
  srcSet: `${unsplash(id, 800)} 800w, ${unsplash(id, 1200)} 1200w, ${unsplash(id, 1800)} 1800w, ${unsplash(id, 2400)} 2400w`,
  sizes: '(max-width: 768px) 100vw, (max-width: 1280px) 80vw, 1400px',
})

export const images = {
  hero: {
    ...unsplashSet('photo-1600210492486-724fe5c67fb0'),
    alt: 'Warm luxury living room with sculptural furniture and architectural lighting',
  },
  intro: {
    ...unsplashSet('photo-1600607687939-ce8a6c25118c'),
    alt: 'Double-height contemporary interior with natural stone and timber',
  },
  about: {
    ...unsplashSet('photo-1600585154340-be6161a56a0c'),
    alt: 'Modern residence exterior with clean architectural lines at dusk',
  },
  cta: {
    ...unsplashSet('photo-1600566753086-00f18fb6b3ea'),
    alt: 'Refined interior corridor with layered materials and warm ambient light',
  },
  projects: {
    luxuryResidence: {
      ...unsplashSet('photo-1600607687644-c7171b42498f'),
      alt: 'Open-plan luxury residence interior with large windows and muted tones',
    },
    contemporaryLiving: {
      ...unsplashSet('photo-1618221195710-dd6b41faaea6'),
      alt: 'Contemporary living space with tailored seating and layered textiles',
    },
    minimalistVilla: {
      ...unsplashSet('photo-1600596542815-ffad4c1539a9'),
      alt: 'Minimalist villa exterior with landscaped courtyard',
    },
    premiumBedroom: {
      ...unsplashSet('photo-1616594039964-ae9021a400a0'),
      alt: 'Premium bedroom interior with soft lighting and refined materials',
    },
    commercialSpace: {
      ...unsplashSet('photo-1497366216548-37526070297c'),
      alt: 'Modern commercial interior with architectural glazing and open plan',
    },
    contemporaryExterior: {
      ...unsplashSet('photo-1600047509807-ba8f99d2cdbc'),
      alt: 'Contemporary house exterior with stone facade and evening lighting',
    },
  },
  showcase: [
    {
      id: 'living',
      ...unsplashSet('photo-1600210491892-03d54c0aaf87'),
      alt: 'Editorial living room composition with art and natural light',
    },
    {
      id: 'kitchen',
      ...unsplashSet('photo-1556912173-46c336c7fd55'),
      alt: 'Sculptural kitchen interior with stone surfaces and cabinetry',
    },
    {
      id: 'exterior-night',
      ...unsplashSet('photo-1600585154526-990dced4db0d'),
      alt: 'Architectural exterior of a modern home at twilight',
    },
    {
      id: 'bathroom',
      ...unsplashSet('photo-1600566752355-35792bedcfea'),
      alt: 'Calm bathroom interior with stone, timber and diffused light',
    },
    {
      id: 'workspace',
      ...unsplashSet('photo-1497366811353-6870744d04b2'),
      alt: 'Refined commercial workspace with architectural volume',
    },
  ],
}
