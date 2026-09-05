import { buildWhatsAppUrl } from '../src/lib/submitInquiry.js'

const payload = {
  name: 'Alice & Bob',
  phone: '+91 9753111687',
  email: 'a+b@example.com',
  projectType: '3D Visualization',
  message: 'Hello!\nNewline test & special chars: % & ? ='
}

console.log(buildWhatsAppUrl(payload))
