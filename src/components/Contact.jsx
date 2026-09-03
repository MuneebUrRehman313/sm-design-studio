import { useState } from 'react'
import { contactPlaceholders, projectTypes } from '../data/site'
import { submitInquiry, validateInquiry } from '../lib/submitInquiry'
import SectionHeading from './SectionHeading'

const empty = {
  name: '',
  phone: '',
  email: '',
  projectType: '',
  message: '',
}

const fieldClass =
  'w-full border-0 border-b border-line bg-transparent py-3 text-sm text-cream outline-none transition-colors placeholder:text-cream-muted/50 focus:border-gold'

export default function Contact() {
  const [values, setValues] = useState(empty)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle')

  const onChange = (event) => {
    const { name, value } = event.target
    setValues((prev) => ({ ...prev, [name]: value }))
  }

  const onSubmit = async (event) => {
    event.preventDefault()
    const nextErrors = validateInquiry(values)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length) return

    setStatus('submitting')
    try {
      await submitInquiry(values)
      // WhatsApp is opened in a new tab — do not show a "sent" success message
      // and do not clear the form so the user can confirm the data before sending.
      setStatus('idle')
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="contact" className="bg-ink px-5 py-24 md:px-10 md:py-32">
      <div className="mx-auto grid max-w-[1440px] gap-16 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <SectionHeading
            title="LET'S TALK ABOUT YOUR SPACE."
            subtitle="Share a few details and we will follow up once contact channels are connected."
          />
          <dl className="space-y-6 text-sm">
            <div>
              <dt className="text-[10px] tracking-[0.24em] text-gold uppercase">WhatsApp</dt>
              <dd className="mt-1 text-cream-muted">{contactPlaceholders.whatsappLabel}</dd>
            </div>
            <div>
              <dt className="text-[10px] tracking-[0.24em] text-gold uppercase">Phone</dt>
              <dd className="mt-1 text-cream-muted">{contactPlaceholders.phoneLabel}</dd>
            </div>
            <div>
              <dt className="text-[10px] tracking-[0.24em] text-gold uppercase">Email</dt>
              <dd className="mt-1 text-cream-muted">{contactPlaceholders.emailLabel}</dd>
            </div>
            <div>
              <dt className="text-[10px] tracking-[0.24em] text-gold uppercase">Instagram</dt>
              <dd className="mt-1 text-cream-muted">{contactPlaceholders.instagramLabel}</dd>
            </div>
            <div>
              <dt className="text-[10px] tracking-[0.24em] text-gold uppercase">Location</dt>
              <dd className="mt-1 text-cream-muted">{contactPlaceholders.locationLabel}</dd>
            </div>
          </dl>
        </div>

        <form className="lg:col-span-7" onSubmit={onSubmit} noValidate>
          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <label htmlFor="name" className="text-[10px] tracking-[0.22em] text-cream-muted uppercase">
                Name
              </label>
              <input
                id="name"
                name="name"
                autoComplete="name"
                value={values.name}
                onChange={onChange}
                className={fieldClass}
                placeholder="Your name"
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? 'name-error' : undefined}
              />
              {errors.name ? (
                <p id="name-error" className="mt-2 text-xs text-gold" role="alert">
                  {errors.name}
                </p>
              ) : null}
            </div>
            <div>
              <label htmlFor="phone" className="text-[10px] tracking-[0.22em] text-cream-muted uppercase">
                Phone
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                autoComplete="tel"
                value={values.phone}
                onChange={onChange}
                className={fieldClass}
                placeholder="Your phone"
                aria-invalid={!!errors.phone}
                aria-describedby={errors.phone ? 'phone-error' : undefined}
              />
              {errors.phone ? (
                <p id="phone-error" className="mt-2 text-xs text-gold" role="alert">
                  {errors.phone}
                </p>
              ) : null}
            </div>
            <div className="md:col-span-2">
              <label htmlFor="email" className="text-[10px] tracking-[0.22em] text-cream-muted uppercase">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                value={values.email}
                onChange={onChange}
                className={fieldClass}
                placeholder="Your email"
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? 'email-error' : undefined}
              />
              {errors.email ? (
                <p id="email-error" className="mt-2 text-xs text-gold" role="alert">
                  {errors.email}
                </p>
              ) : null}
            </div>
            <div className="md:col-span-2">
              <label htmlFor="projectType" className="text-[10px] tracking-[0.22em] text-cream-muted uppercase">
                Project Type
              </label>
              <select
                id="projectType"
                name="projectType"
                value={values.projectType}
                onChange={onChange}
                className={`${fieldClass} appearance-none`}
                aria-invalid={!!errors.projectType}
                aria-describedby={errors.projectType ? 'projectType-error' : undefined}
              >
                <option value="">Select a project type</option>
                {projectTypes.map((type) => (
                  <option key={type} value={type} className="bg-ink text-cream">
                    {type}
                  </option>
                ))}
              </select>
              {errors.projectType ? (
                <p id="projectType-error" className="mt-2 text-xs text-gold" role="alert">
                  {errors.projectType}
                </p>
              ) : null}
            </div>
            <div className="md:col-span-2">
              <label htmlFor="message" className="text-[10px] tracking-[0.22em] text-cream-muted uppercase">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                value={values.message}
                onChange={onChange}
                className={`${fieldClass} resize-y`}
                placeholder="Tell us about the space"
                aria-invalid={!!errors.message}
                aria-describedby={errors.message ? 'message-error' : undefined}
              />
              {errors.message ? (
                <p id="message-error" className="mt-2 text-xs text-gold" role="alert">
                  {errors.message}
                </p>
              ) : null}
            </div>
          </div>

          <button
            type="submit"
            disabled={status === 'submitting'}
            className="mt-10 inline-flex min-h-12 items-center border border-cream px-8 text-[11px] tracking-[0.22em] text-cream uppercase transition-colors hover:bg-cream hover:text-ink disabled:opacity-50"
          >
            {status === 'submitting' ? 'Sending…' : 'Send Inquiry'}
          </button>

          {status === 'success' ? (
            <p className="mt-6 text-sm text-cream-muted" role="status">
              Inquiry captured. Connect an email or form service in{' '}
              <code className="text-gold">src/lib/submitInquiry.js</code> to receive messages.
            </p>
          ) : null}
          {status === 'error' ? (
            <p className="mt-6 text-sm text-gold" role="alert">
              Something went wrong. Please try again.
            </p>
          ) : null}
        </form>
      </div>
    </section>
  )
}
