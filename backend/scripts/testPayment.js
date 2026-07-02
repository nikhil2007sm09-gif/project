import axios from 'axios'

const testPayment = async () => {
  try {
    console.log('Testing payment endpoint...')
    const response = await axios.post('http://localhost:5000/api/payment/create-order', {
      amount: 100
    })
    console.log('✅ Payment endpoint working!')
    console.log('Response:', JSON.stringify(response.data, null, 2))
  } catch (error) {
    console.error('❌ Payment endpoint error:')
    console.error('Status:', error.response?.status)
    console.error('Message:', error.response?.data?.message)
    console.error('Error:', error.message)
  }
}

testPayment()
