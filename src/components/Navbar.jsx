import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X, ArrowRight } from 'lucide-react'
import { navLinks, studio } from '../data/site'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'border-b border-line bg-ink/80 shadow-[0_1px_0_rgba(243,238,230,0.06)] backdrop-blur-md'
          : 'bg-transparent'
      }`}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-cream focus:px-3 focus:py-2 focus:text-ink"
      >
        Skip to content
      </a>
      <nav
        className="mx-auto flex h-[72px] max-w-[1440px] items-center justify-between px-5 md:px-10"
        aria-label="Primary"
      >
        <a href="#home" className="text-[12px] font-medium tracking-[0.28em] text-cream uppercase">
          {studio.name}
        </a>

        <ul className="hidden items-center gap-9 lg:flex">
          {navLinks.map((link) => (
            <li key={link.id}>
              <a
                href={link.href}
                className="text-[11px] tracking-[0.22em] text-cream-muted uppercase transition-colors hover:text-cream"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#contact"
          className="hidden items-center gap-2 text-[11px] tracking-[0.22em] text-gold uppercase transition-colors hover:text-cream lg:inline-flex"
        >
          Let&apos;s Talk
          <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
        </a>

        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center text-cream lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="mobile-nav"
            className="fixed inset-0 z-40 flex flex-col bg-ink lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
          >
            <div className="flex h-[72px] items-center justify-between px-5">
              <span className="text-[12px] tracking-[0.28em] text-cream uppercase">{studio.name}</span>
              <button
                type="button"
                className="inline-flex h-11 w-11 items-center justify-center"
                aria-label="Close menu"
                onClick={() => setOpen(false)}
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <motion.ul
              className="flex flex-1 flex-col justify-center gap-8 px-8"
              initial="hidden"
              animate="show"
              variants={{
                hidden: {},
                show: { transition: { staggerChildren: 0.08 } },
              }}
            >
              {navLinks.map((link) => (
                <motion.li
                  key={link.id}
                  variants={{
                    hidden: { opacity: 0, y: 16 },
                    show: { opacity: 1, y: 0 },
                  }}
                >
                  <a
                    href={link.href}
                    className="editorial-heading text-4xl text-cream"
                    onClick={() => setOpen(false)}
                  >
                    {link.label}
                  </a>
                </motion.li>
              ))}
            </motion.ul>
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="mx-8 mb-12 inline-flex items-center gap-2 border-t border-line pt-6 text-sm tracking-[0.2em] text-gold uppercase"
            >
              Let&apos;s Talk <ArrowRight className="h-4 w-4" />
            </a>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  )
}
