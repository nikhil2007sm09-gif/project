import fetch from 'node-fetch'

const testStatsAPI = async () => {
  try {
    console.log('Testing Stats API...')
    
    const response = await fetch('http://localhost:5000/api/stats/public')
    console.log('Response status:', response.status)
    
    if (response.ok) {
      const data = await response.json()
      console.log('Stats API Response:')
      console.log(JSON.stringify(data, null, 2))
      
      // Verify required fields
      const requiredFields = ['customers', 'orders', 'products', 'rating', 'deliveryHours']
      const missingFields = requiredFields.filter(field => data[field] === undefined)
      
      if (missingFields.length === 0) {
        console.log('✅ All required fields present')
      } else {
        console.log('❌ Missing fields:', missingFields)
      }
    } else {
      console.log('❌ API request failed')
      const errorText = await response.text()
      console.log('Error:', errorText)
    }
  } catch (error) {
    console.error('❌ Test failed:', error.message)
  }
}

testStatsAPI()