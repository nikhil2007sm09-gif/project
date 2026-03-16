import axios from 'axios'

// SMS Service using Fast2SMS (India)
export const sendOTP = async (mobile, otp) => {
  try {
    // Check if SMS gateway is configured
    const apiKey = process.env.FAST2SMS_API_KEY
    
    if (!apiKey || apiKey === 'your_api_key_here') {
      // Development mode - just log OTP
      console.log(`\n${'='.repeat(50)}`)
      console.log(`📱 OTP for +91-${mobile}: ${otp}`)
      console.log(`⏰ Valid for 5 minutes`)
      console.log(`${'='.repeat(50)}\n`)
      return {
        success: true,
        message: 'OTP logged to console (Development mode)',
        otp: otp // Return OTP in development
      }
    }

    // Production mode - send real SMS
    const message = `Your ClothesShop OTP is: ${otp}. Valid for 5 minutes. Do not share with anyone.`
    
    const response = await axios.post(
      'https://www.fast2sms.com/dev/bulkV2',
      {
        route: 'v3',
        sender_id: 'FSTSMS',
        message: message,
        language: 'english',
        flash: 0,
        numbers: mobile
      },
      {
        headers: {
          'authorization': apiKey,
          'Content-Type': 'application/json'
        }
      }
    )

    if (response.data.return === true) {
      console.log(`✅ SMS sent successfully to ${mobile}`)
      return {
        success: true,
        message: 'OTP sent successfully'
      }
    } else {
      throw new Error('SMS sending failed')
    }
  } catch (error) {
    console.error('SMS Error:', error.message)
    
    // Fallback to console in case of error
    console.log(`\n${'='.repeat(50)}`)
    console.log(`📱 OTP for +91-${mobile}: ${otp}`)
    console.log(`⚠️  SMS service error - OTP logged to console`)
    console.log(`${'='.repeat(50)}\n`)
    
    return {
      success: true,
      message: 'OTP logged to console (SMS service unavailable)',
      otp: otp // Return OTP as fallback
    }
  }
}

// Alternative: MSG91 (India)
export const sendOTPViaMSG91 = async (mobile, otp) => {
  try {
    const authKey = process.env.MSG91_AUTH_KEY
    
    if (!authKey) {
      console.log(`📱 OTP for ${mobile}: ${otp}`)
      return { success: true, otp }
    }

    const response = await axios.get('https://api.msg91.com/api/v5/otp', {
      params: {
        authkey: authKey,
        mobile: mobile,
        otp: otp,
        template_id: process.env.MSG91_TEMPLATE_ID
      }
    })

    return {
      success: true,
      message: 'OTP sent successfully'
    }
  } catch (error) {
    console.error('MSG91 Error:', error.message)
    console.log(`📱 OTP for ${mobile}: ${otp}`)
    return { success: true, otp }
  }
}

// Alternative: Twilio (International)
export const sendOTPViaTwilio = async (mobile, otp) => {
  try {
    const accountSid = process.env.TWILIO_ACCOUNT_SID
    const authToken = process.env.TWILIO_AUTH_TOKEN
    const fromNumber = process.env.TWILIO_PHONE_NUMBER
    
    if (!accountSid || !authToken) {
      console.log(`📱 OTP for ${mobile}: ${otp}`)
      return { success: true, otp }
    }

    // Note: Requires twilio package - npm install twilio
    const twilio = require('twilio')
    const client = twilio(accountSid, authToken)

    await client.messages.create({
      body: `Your ClothesShop OTP is: ${otp}. Valid for 5 minutes.`,
      from: fromNumber,
      to: `+91${mobile}`
    })

    return {
      success: true,
      message: 'OTP sent successfully'
    }
  } catch (error) {
    console.error('Twilio Error:', error.message)
    console.log(`📱 OTP for ${mobile}: ${otp}`)
    return { success: true, otp }
  }
}
