
import { sendVendorRegistrationEmail, sendVendorApprovalEmail } from './services/emailService.js'

console.log('🧪 Testing Email Service...\n')

// Test vendor registration email
console.log('📧 Test 1: Vendor Registration Email')
const result1 = await sendVendorRegistrationEmail('test@example.com', 'Test Vendor')
console.log('Result:', result1)

console.log('\n📧 Test 2: Vendor Approval Email')
const result2 = await sendVendorApprovalEmail('test@example.com', 'Test Vendor')
console.log('Result:', result2)

console.log('\n✅ Email service test completed!')
console.log('\nNote: If email config is not set in .env, emails are logged to console.')
console.log('To send real emails, add EMAIL_HOST, EMAIL_USER, EMAIL_PASS to .env file.')

process.exit(0)
