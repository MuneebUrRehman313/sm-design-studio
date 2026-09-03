/**
 * Contact submission adapter.
 * Replace the body of `submitInquiry` with an email service, form backend, or API call.
 */
export async function submitInquiry(payload) {
  // Build a WhatsApp click-to-chat message using the business number.
  // If `window` is available (browser), open WhatsApp; otherwise return a test-friendly object.
  const phone = '+919977906634'
  const message = `Hello SM Design Studio,\n\nI have a new project inquiry.\n\nName: ${payload.name}\nPhone: ${payload.phone}\nEmail: ${payload.email}\nProject Type: ${payload.projectType}\n\nMessage:\n${payload.message}\n\nPlease contact me regarding this project.`
  const encoded = typeof encodeURIComponent === 'function' ? encodeURIComponent(message) : message
  const url = `https://wa.me/${phone}?text=${encoded}`

  if (typeof window !== 'undefined' && typeof window.open === 'function') {
    // Expose the URL on `window` for testability in the local dev environment.
    try {
      // eslint-disable-next-line no-undef
      window.__lastWhatsAppUrl = url
    } catch (e) {
      // ignore
    }
    // Open in a new tab/window so desktop opens WhatsApp Web and mobile opens the app.
    window.open(url, '_blank')
    return { ok: true, opened: true, url }
  }

  // Node/test environment fallback — do not attempt to open a browser.
  void url
  return {
    ok: true,
    pendingIntegration: true,
  }
}

// Helper used for testing or other client-side integrations.
export function buildWhatsAppUrl(payload) {
  const phone = '9753111687'
  const message = `Hello SM Design Studio,\n\nI have a new project inquiry.\n\nName: ${payload.name}\nPhone: ${payload.phone}\nEmail: ${payload.email}\nProject Type: ${payload.projectType}\n\nMessage:\n${payload.message}\n\nPlease contact me regarding this project.`
  const encoded = typeof encodeURIComponent === 'function' ? encodeURIComponent(message) : message
  return `https://wa.me/${phone}?text=${encoded}`
}

export function validateInquiry(values) {
  const errors = {}
  if (!values.name.trim()) errors.name = 'Please enter your name.'
  if (!values.phone.trim()) errors.phone = 'Please enter a phone number.'
  if (!values.email.trim()) {
    errors.email = 'Please enter an email address.'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = 'Please enter a valid email address.'
  }
  if (!values.projectType) errors.projectType = 'Please select a project type.'
  if (!values.message.trim()) errors.message = 'Please tell us a little about your space.'
  return errors
}
