import { validateInquiry, submitInquiry } from '../src/lib/submitInquiry.js'

async function run() {
  const invalid = { name: '', phone: '', email: 'bad', projectType: '', message: '' }
  console.log('Invalid validation:', validateInquiry(invalid))

  const valid = { name: 'Alice', phone: '123-456', email: 'alice@example.com', projectType: 'Residential', message: 'Hello' }
  console.log('Valid validation (should be {}):', validateInquiry(valid))

  try {
    const res = await submitInquiry(valid)
    console.log('submitInquiry result:', res)
  } catch (err) {
    console.error('submitInquiry threw:', err)
  }
}

run()
