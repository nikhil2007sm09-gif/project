
import fs from 'fs'
import readline from 'readline'

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

const question = (query) => new Promise((resolve) => rl.question(query, resolve))

console.log('\n🔧 Email Configuration Setup\n')
console.log('This will help you configure email sending for your application.\n')

async function setup() {
  try {
    console.log('Choose an option:')
    console.log('1. Setup Gmail (Recommended)')
    console.log('2. Skip (Use console mode only)\n')
    
    const choice = await question('Enter your choice (1 or 2): ')
    
    if (choice === '2') {
      console.log('\n✅ Skipping email setup. Emails will be logged to console.')
      console.log('You can setup email later by running: npm run setup-email\n')
      rl.close()
      return
    }
    
    if (choice !== '1') {
      console.log('\n❌ Invalid choice. Exiting.')
      rl.close()
      return
    }
    
    console.log('\n📧 Gmail Setup Instructions:')
    console.log('1. Go to: https://myaccount.google.com/security')
    console.log('2. Enable 2-Step Verification')
    console.log('3. Go to: https://myaccount.google.com/apppasswords')
    console.log('4. Generate App Password for "Mail"')
    console.log('5. Copy the 16-character password\n')
    
    const email = await question('Enter your Gmail address: ')
    const password = await question('Enter your App Password (16 characters): ')
    
    if (!email || !password) {
      console.log('\n❌ Email and password are required!')
      rl.close()
      return
    }
    
    // Read current .env file
    let envContent = ''
    try {
      envContent = fs.readFileSync('.env', 'utf8')
    } catch (error) {
      console.log('\n⚠️  .env file not found. Creating new one...')
    }
    
    // Remove existing email config if any
    envContent = envContent.replace(/EMAIL_HOST=.*/g, '')
    envContent = envContent.replace(/EMAIL_PORT=.*/g, '')
    envContent = envContent.replace(/EMAIL_SECURE=.*/g, '')
    envContent = envContent.replace(/EMAIL_USER=.*/g, '')
    envContent = envContent.replace(/EMAIL_PASS=.*/g, '')
    
    // Clean up extra newlines
    envContent = envContent.replace(/\n\n+/g, '\n\n')
    
    // Add email configuration
    const emailConfig = `
# Email Configuration
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=${email}
EMAIL_PASS=${password.replace(/\s/g, '')}
`
    
    envContent += emailConfig
    
    // Write to .env file
    fs.writeFileSync('.env', envContent)
    
    console.log('\n✅ Email configuration saved to .env file!')
    console.log('\n📧 Testing email service...\n')
    
    // Test email
    const { sendVendorRegistrationEmail } = await import('./services/emailService.js')
    const result = await sendVendorRegistrationEmail(email, 'Test User')
    
    if (result.success) {
      console.log('\n✅ Email sent successfully!')
      console.log(`📬 Check your inbox: ${email}`)
      console.log('\nIf you don\'t see the email:')
      console.log('- Check spam folder')
      console.log('- Wait a few minutes')
      console.log('- Verify App Password is correct\n')
    } else {
      console.log('\n❌ Error sending email:', result.error)
      console.log('\nPlease check:')
      console.log('- App Password is correct (16 characters)')
      console.log('- 2FA is enabled on Gmail')
      console.log('- Internet connection is working\n')
    }
    
  } catch (error) {
    console.error('\n❌ Error:', error.message)
  } finally {
    rl.close()
  }
}

setup()
