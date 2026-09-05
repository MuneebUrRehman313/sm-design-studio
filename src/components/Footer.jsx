import { contactPlaceholders, navLinks, studio } from '../data/site'

export default function Footer() {
  return (
    <footer className="border-t border-line bg-ink px-5 py-14 md:px-10">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-12">
        <div className="flex flex-col justify-between gap-10 md:flex-row md:items-start">
          <div>
            <p className="text-[12px] tracking-[0.28em] text-cream uppercase">{studio.name}</p>
            <p className="mt-3 text-[11px] tracking-[0.22em] text-cream-muted">{studio.tagline}</p>
          </div>
          <nav aria-label="Footer">
            <ul className="flex flex-wrap gap-x-8 gap-y-3">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <a
                    href={link.href}
                    className="text-[11px] tracking-[0.2em] text-cream-muted uppercase transition-colors hover:text-cream"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="flex flex-col gap-3 text-[11px] tracking-[0.2em] uppercase">
            <a href={contactPlaceholders.instagramHref} className="text-cream-muted hover:text-cream">
              Instagram
            </a>
            <a href={contactPlaceholders.whatsappHref} className="text-cream-muted hover:text-cream">
              WhatsApp
            </a>
            <a href="/admin/login" className="text-cream-muted hover:text-cream">
              Admin Login
            </a>
          </div>
        </div>
        <p className="border-t border-line pt-6 text-xs text-cream-muted">
          © 2026 SM Design Studio. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
