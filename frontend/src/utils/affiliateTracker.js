// Affiliate tracking utility
export const trackAffiliateClick = async (affiliateCode, productId = null) => {
  try {
    const response = await fetch('http://localhost:5000/api/affiliate/track-click', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        affiliateCode,
        productId
      })
    })

    if (response.ok) {
      console.log('Affiliate click tracked successfully')
    }
  } catch (error) {
    console.error('Error tracking affiliate click:', error)
  }
}

// Get affiliate code from URL
export const getAffiliateCodeFromURL = () => {
  const urlParams = new URLSearchParams(window.location.search)
  return urlParams.get('ref')
}

// Store affiliate code in session storage
export const storeAffiliateCode = (code) => {
  if (code) {
    sessionStorage.setItem('affiliateCode', code)
  }
}

// Get stored affiliate code
export const getStoredAffiliateCode = () => {
  return sessionStorage.getItem('affiliateCode')
}

// Generate affiliate link for product
export const generateAffiliateLink = (affiliateCode, productId = null) => {
  const baseUrl = window.location.origin
  if (productId) {
    return `${baseUrl}/product/${productId}?ref=${affiliateCode}`
  }
  return `${baseUrl}?ref=${affiliateCode}`
}

// Generate share links
export const generateShareLinks = (productUrl, productName, affiliateCode = null) => {
  const finalUrl = affiliateCode ? `${productUrl}?ref=${affiliateCode}` : productUrl
  const encodedUrl = encodeURIComponent(finalUrl)
  const encodedText = encodeURIComponent(`Check out this amazing product: ${productName}`)
  
  return {
    whatsapp: `https://wa.me/?text=${encodedText}%20${encodedUrl}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    twitter: `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`,
    telegram: `https://t.me/share/url?url=${encodedUrl}&text=${encodedText}`,
    copy: finalUrl
  }
}