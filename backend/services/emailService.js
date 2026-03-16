import nodemailer from 'nodemailer'

// Create transporter
const createTransporter = () => {
  // For development, use ethereal email (fake SMTP)
  // For production, use real SMTP like Gmail, SendGrid, etc.
  
  if (process.env.EMAIL_HOST && process.env.EMAIL_USER && process.env.EMAIL_PASS) {
    // Production email configuration
    return nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT || 587,
      secure: process.env.EMAIL_SECURE === 'true',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    })
  } else {
    // Development mode - log to console
    console.log('⚠️  Email service not configured. Emails will be logged to console.')
    return null
  }
}

// Email templates
const getVendorRegistrationTemplate = (vendorName, vendorEmail) => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        body {
          font-family: 'Arial', sans-serif;
          line-height: 1.6;
          color: #333;
          margin: 0;
          padding: 0;
          background-color: #f4f4f4;
        }
        .container {
          max-width: 600px;
          margin: 20px auto;
          background: white;
          border-radius: 10px;
          overflow: hidden;
          box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        }
        .header {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 40px 20px;
          text-align: center;
        }
        .header h1 {
          margin: 0;
          font-size: 28px;
          font-weight: bold;
        }
        .content {
          padding: 40px 30px;
        }
        .content h2 {
          color: #667eea;
          margin-top: 0;
        }
        .info-box {
          background: #f8f9fa;
          border-left: 4px solid #667eea;
          padding: 15px;
          margin: 20px 0;
          border-radius: 4px;
        }
        .info-box p {
          margin: 5px 0;
        }
        .status-badge {
          display: inline-block;
          background: #ffc107;
          color: #000;
          padding: 8px 16px;
          border-radius: 20px;
          font-weight: bold;
          margin: 10px 0;
        }
        .next-steps {
          background: #e3f2fd;
          padding: 20px;
          border-radius: 8px;
          margin: 20px 0;
        }
        .next-steps h3 {
          color: #1976d2;
          margin-top: 0;
        }
        .next-steps ol {
          margin: 10px 0;
          padding-left: 20px;
        }
        .next-steps li {
          margin: 8px 0;
        }
        .footer {
          background: #f8f9fa;
          padding: 20px;
          text-align: center;
          color: #666;
          font-size: 14px;
        }
        .button {
          display: inline-block;
          background: #667eea;
          color: white;
          padding: 12px 30px;
          text-decoration: none;
          border-radius: 5px;
          margin: 20px 0;
          font-weight: bold;
        }
        .divider {
          height: 1px;
          background: #e0e0e0;
          margin: 30px 0;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🎉 Welcome to ClothesShop!</h1>
          <p style="margin: 10px 0 0 0; font-size: 16px;">Your Vendor Account Has Been Created</p>
        </div>
        
        <div class="content">
          <h2>Hello ${vendorName}! 👋</h2>
          
          <p>Thank you for registering as a vendor on ClothesShop. We're excited to have you join our marketplace!</p>
          
          <div class="info-box">
            <p><strong>📧 Email:</strong> ${vendorEmail}</p>
            <p><strong>👤 Role:</strong> Vendor</p>
            <p><strong>📅 Registration Date:</strong> ${new Date().toLocaleDateString()}</p>
          </div>
          
          <p><strong>Current Status:</strong></p>
          <span class="status-badge">⏳ Pending Admin Approval</span>
          
          <div class="next-steps">
            <h3>📋 What Happens Next?</h3>
            <ol>
              <li><strong>Admin Review:</strong> Our team will review your vendor application within 24-48 hours.</li>
              <li><strong>Approval Notification:</strong> You'll receive an email once your account is approved.</li>
              <li><strong>Start Selling:</strong> After approval, you can login and start adding your products!</li>
            </ol>
          </div>
          
          <div class="divider"></div>
          
          <h3>🚀 Once Approved, You Can:</h3>
          <ul>
            <li>✅ Add unlimited products to your store</li>
            <li>✅ Upload product images and descriptions</li>
            <li>✅ Manage inventory and pricing</li>
            <li>✅ Track your sales and orders</li>
            <li>✅ Access vendor dashboard with analytics</li>
          </ul>
          
          <div class="divider"></div>
          
          <h3>💡 Tips for Success:</h3>
          <ul>
            <li>Use high-quality product images</li>
            <li>Write detailed product descriptions</li>
            <li>Keep your inventory updated</li>
            <li>Respond quickly to customer inquiries</li>
            <li>Offer competitive pricing</li>
          </ul>
          
          <p style="margin-top: 30px;">If you have any questions, feel free to contact our support team.</p>
          
          <p style="margin-top: 20px;">
            <strong>Best regards,</strong><br>
            The ClothesShop Team
          </p>
        </div>
        
        <div class="footer">
          <p>© ${new Date().getFullYear()} ClothesShop. All rights reserved.</p>
          <p style="margin-top: 10px; font-size: 12px;">
            This is an automated email. Please do not reply to this message.
          </p>
        </div>
      </div>
    </body>
    </html>
  `
}

const getVendorApprovalTemplate = (vendorName) => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        body {
          font-family: 'Arial', sans-serif;
          line-height: 1.6;
          color: #333;
          margin: 0;
          padding: 0;
          background-color: #f4f4f4;
        }
        .container {
          max-width: 600px;
          margin: 20px auto;
          background: white;
          border-radius: 10px;
          overflow: hidden;
          box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        }
        .header {
          background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%);
          color: white;
          padding: 40px 20px;
          text-align: center;
        }
        .header h1 {
          margin: 0;
          font-size: 28px;
          font-weight: bold;
        }
        .content {
          padding: 40px 30px;
        }
        .success-icon {
          text-align: center;
          font-size: 60px;
          margin: 20px 0;
        }
        .button {
          display: inline-block;
          background: #11998e;
          color: white;
          padding: 15px 40px;
          text-decoration: none;
          border-radius: 5px;
          margin: 20px 0;
          font-weight: bold;
          text-align: center;
        }
        .footer {
          background: #f8f9fa;
          padding: 20px;
          text-align: center;
          color: #666;
          font-size: 14px;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🎊 Congratulations!</h1>
          <p style="margin: 10px 0 0 0; font-size: 16px;">Your Vendor Account is Approved</p>
        </div>
        
        <div class="content">
          <div class="success-icon">✅</div>
          
          <h2 style="text-align: center; color: #11998e;">Welcome Aboard, ${vendorName}!</h2>
          
          <p style="text-align: center; font-size: 16px;">
            Great news! Your vendor account has been approved by our admin team. 
            You can now start selling on ClothesShop!
          </p>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${process.env.FRONTEND_URL || 'http://localhost:5173'}/vendor/login" class="button">
              Login to Dashboard
            </a>
          </div>
          
          <h3>🚀 Get Started:</h3>
          <ol>
            <li>Login to your vendor dashboard</li>
            <li>Add your first product</li>
            <li>Upload product images</li>
            <li>Set competitive prices</li>
            <li>Start receiving orders!</li>
          </ol>
          
          <p style="margin-top: 30px;">
            <strong>Best regards,</strong><br>
            The ClothesShop Team
          </p>
        </div>
        
        <div class="footer">
          <p>© ${new Date().getFullYear()} ClothesShop. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `
}

const getOrderConfirmationTemplate = (orderData) => {
  const { customerName, customerEmail, orderId, items, totalAmount, shippingAddress, orderDate } = orderData
  
  const itemsHtml = items.map(item => `
    <tr>
      <td style="padding: 15px; border-bottom: 1px solid #e0e0e0;">
        <div style="display: flex; align-items: center;">
          <div>
            <strong>${item.name}</strong><br>
            <span style="color: #666; font-size: 14px;">Qty: ${item.quantity}</span>
          </div>
        </div>
      </td>
      <td style="padding: 15px; border-bottom: 1px solid #e0e0e0; text-align: right;">
        ₹${item.price}
      </td>
      <td style="padding: 15px; border-bottom: 1px solid #e0e0e0; text-align: right;">
        <strong>₹${item.price * item.quantity}</strong>
      </td>
    </tr>
  `).join('')

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        body {
          font-family: 'Arial', sans-serif;
          line-height: 1.6;
          color: #333;
          margin: 0;
          padding: 0;
          background-color: #f4f4f4;
        }
        .container {
          max-width: 600px;
          margin: 20px auto;
          background: white;
          border-radius: 10px;
          overflow: hidden;
          box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        }
        .header {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 40px 20px;
          text-align: center;
        }
        .header h1 {
          margin: 0;
          font-size: 28px;
          font-weight: bold;
        }
        .content {
          padding: 40px 30px;
        }
        .order-box {
          background: #f8f9fa;
          border-left: 4px solid #667eea;
          padding: 20px;
          margin: 20px 0;
          border-radius: 4px;
        }
        .order-box h3 {
          margin-top: 0;
          color: #667eea;
        }
        .order-table {
          width: 100%;
          border-collapse: collapse;
          margin: 20px 0;
        }
        .order-table th {
          background: #f8f9fa;
          padding: 12px;
          text-align: left;
          border-bottom: 2px solid #667eea;
        }
        .total-row {
          background: #667eea;
          color: white;
          font-weight: bold;
        }
        .total-row td {
          padding: 15px;
          font-size: 18px;
        }
        .button {
          display: inline-block;
          background: #667eea;
          color: white;
          padding: 15px 40px;
          text-decoration: none;
          border-radius: 5px;
          margin: 20px 0;
          font-weight: bold;
        }
        .footer {
          background: #f8f9fa;
          padding: 20px;
          text-align: center;
          color: #666;
          font-size: 14px;
        }
        .success-badge {
          display: inline-block;
          background: #4caf50;
          color: white;
          padding: 8px 16px;
          border-radius: 20px;
          font-weight: bold;
          margin: 10px 0;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🎉 Order Confirmed!</h1>
          <p style="margin: 10px 0 0 0; font-size: 16px;">Thank you for your purchase</p>
        </div>
        
        <div class="content">
          <h2>Hello ${customerName}! 👋</h2>
          
          <p>Your order has been successfully placed and is being processed. We'll send you another email when your order ships.</p>
          
          <div class="order-box">
            <h3>📦 Order Details</h3>
            <p><strong>Order ID:</strong> #${orderId}</p>
            <p><strong>Order Date:</strong> ${new Date(orderDate).toLocaleDateString('en-IN', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}</p>
            <p><strong>Status:</strong> <span class="success-badge">✓ Confirmed</span></p>
          </div>
          
          <h3>🛍️ Order Items</h3>
          <table class="order-table">
            <thead>
              <tr>
                <th>Product</th>
                <th style="text-align: right;">Price</th>
                <th style="text-align: right;">Total</th>
              </tr>
            </thead>
            <tbody>
              ${itemsHtml}
              <tr class="total-row">
                <td colspan="2">Total Amount</td>
                <td style="text-align: right;">₹${totalAmount.toLocaleString()}</td>
              </tr>
            </tbody>
          </table>
          
          <div class="order-box">
            <h3>📍 Shipping Address</h3>
            <p>${shippingAddress.fullName}</p>
            <p>${shippingAddress.address}</p>
            <p>${shippingAddress.city}, ${shippingAddress.state} - ${shippingAddress.pincode}</p>
            <p>Phone: ${shippingAddress.phone}</p>
          </div>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${process.env.FRONTEND_URL || 'http://localhost:5173'}/orders" class="button">
              Track Your Order
            </a>
          </div>
          
          <h3>📋 What's Next?</h3>
          <ol>
            <li><strong>Order Processing:</strong> We're preparing your items for shipment</li>
            <li><strong>Quality Check:</strong> Each item is carefully inspected</li>
            <li><strong>Packaging:</strong> Your order is securely packed</li>
            <li><strong>Shipping:</strong> You'll receive tracking details via email</li>
            <li><strong>Delivery:</strong> Estimated delivery in 3-5 business days</li>
          </ol>
          
          <p style="margin-top: 30px;">If you have any questions about your order, feel free to contact our support team.</p>
          
          <p style="margin-top: 20px;">
            <strong>Best regards,</strong><br>
            The ClothesShop Team
          </p>
        </div>
        
        <div class="footer">
          <p>© ${new Date().getFullYear()} ClothesShop. All rights reserved.</p>
          <p style="margin-top: 10px; font-size: 12px;">
            This is an automated email. Please do not reply to this message.
          </p>
        </div>
      </div>
    </body>
    </html>
  `
}

const getCustomerWelcomeTemplate = (customerName, customerEmail) => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        body {
          font-family: 'Arial', sans-serif;
          line-height: 1.6;
          color: #333;
          margin: 0;
          padding: 0;
          background-color: #f4f4f4;
        }
        .container {
          max-width: 600px;
          margin: 20px auto;
          background: white;
          border-radius: 10px;
          overflow: hidden;
          box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        }
        .header {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 40px 20px;
          text-align: center;
        }
        .header h1 {
          margin: 0;
          font-size: 28px;
          font-weight: bold;
        }
        .content {
          padding: 40px 30px;
        }
        .button {
          display: inline-block;
          background: #667eea;
          color: white;
          padding: 15px 40px;
          text-decoration: none;
          border-radius: 5px;
          margin: 20px 0;
          font-weight: bold;
        }
        .feature-box {
          background: #f8f9fa;
          padding: 15px;
          margin: 10px 0;
          border-radius: 8px;
          border-left: 4px solid #667eea;
        }
        .footer {
          background: #f8f9fa;
          padding: 20px;
          text-align: center;
          color: #666;
          font-size: 14px;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🎉 Welcome to ClothesShop!</h1>
          <p style="margin: 10px 0 0 0; font-size: 16px;">Your account has been created successfully</p>
        </div>
        
        <div class="content">
          <h2>Hello ${customerName}! 👋</h2>
          
          <p>Thank you for joining ClothesShop! We're excited to have you as part of our community.</p>
          
          <div class="feature-box">
            <p><strong>📧 Email:</strong> ${customerEmail}</p>
            <p><strong>👤 Account Type:</strong> Customer</p>
            <p><strong>📅 Joined:</strong> ${new Date().toLocaleDateString()}</p>
          </div>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${process.env.FRONTEND_URL || 'http://localhost:5173'}/products" class="button">
              Start Shopping
            </a>
          </div>
          
          <h3>🛍️ What You Can Do:</h3>
          <ul>
            <li>✅ Browse thousands of products</li>
            <li>✅ Add items to cart and wishlist</li>
            <li>✅ Secure checkout with multiple payment options</li>
            <li>✅ Track your orders in real-time</li>
            <li>✅ Manage your profile and addresses</li>
            <li>✅ Get exclusive deals and offers</li>
          </ul>
          
          <h3>💡 Shopping Tips:</h3>
          <ul>
            <li>Check out our latest collections</li>
            <li>Subscribe to newsletter for exclusive deals</li>
            <li>Follow us on social media for updates</li>
            <li>Contact support anytime for help</li>
          </ul>
          
          <p style="margin-top: 30px;">Happy Shopping!</p>
          
          <p style="margin-top: 20px;">
            <strong>Best regards,</strong><br>
            The ClothesShop Team
          </p>
        </div>
        
        <div class="footer">
          <p>© ${new Date().getFullYear()} ClothesShop. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `
}

const getAffiliateRegistrationTemplate = (affiliateName, affiliateEmail, affiliateCode) => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        body {
          font-family: 'Arial', sans-serif;
          line-height: 1.6;
          color: #333;
          margin: 0;
          padding: 0;
          background-color: #f4f4f4;
        }
        .container {
          max-width: 600px;
          margin: 20px auto;
          background: white;
          border-radius: 10px;
          overflow: hidden;
          box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        }
        .header {
          background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
          color: white;
          padding: 40px 20px;
          text-align: center;
        }
        .header h1 {
          margin: 0;
          font-size: 28px;
          font-weight: bold;
        }
        .content {
          padding: 40px 30px;
        }
        .info-box {
          background: #f8f9fa;
          border-left: 4px solid #f5576c;
          padding: 15px;
          margin: 20px 0;
          border-radius: 4px;
        }
        .code-box {
          background: #fff3cd;
          border: 2px dashed #f5576c;
          padding: 20px;
          margin: 20px 0;
          border-radius: 8px;
          text-align: center;
        }
        .code-box h3 {
          margin: 0 0 10px 0;
          color: #f5576c;
        }
        .code {
          font-size: 24px;
          font-weight: bold;
          color: #f5576c;
          letter-spacing: 2px;
        }
        .status-badge {
          display: inline-block;
          background: #ffc107;
          color: #000;
          padding: 8px 16px;
          border-radius: 20px;
          font-weight: bold;
          margin: 10px 0;
        }
        .footer {
          background: #f8f9fa;
          padding: 20px;
          text-align: center;
          color: #666;
          font-size: 14px;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🎉 Welcome Affiliate Partner!</h1>
          <p style="margin: 10px 0 0 0; font-size: 16px;">Your Affiliate Account Has Been Created</p>
        </div>
        
        <div class="content">
          <h2>Hello ${affiliateName}! 👋</h2>
          
          <p>Thank you for joining our affiliate program! We're excited to partner with you.</p>
          
          <div class="info-box">
            <p><strong>📧 Email:</strong> ${affiliateEmail}</p>
            <p><strong>👤 Role:</strong> Affiliate Partner</p>
            <p><strong>📅 Registration Date:</strong> ${new Date().toLocaleDateString()}</p>
          </div>
          
          <p><strong>Current Status:</strong></p>
          <span class="status-badge">⏳ Pending Admin Approval</span>
          
          <div class="code-box">
            <h3>🎯 Your Affiliate Code</h3>
            <div class="code">${affiliateCode}</div>
            <p style="margin: 10px 0 0 0; font-size: 14px; color: #666;">
              Use this code to track your referrals
            </p>
          </div>
          
          <h3>📋 What Happens Next?</h3>
          <ol>
            <li><strong>Admin Review:</strong> Our team will review your application within 24-48 hours</li>
            <li><strong>Approval Email:</strong> You'll receive confirmation once approved</li>
            <li><strong>Start Earning:</strong> Share your affiliate code and earn commissions!</li>
          </ol>
          
          <h3>💰 Once Approved, You Can:</h3>
          <ul>
            <li>✅ Access your affiliate dashboard</li>
            <li>✅ Track referrals and earnings</li>
            <li>✅ Get marketing materials</li>
            <li>✅ View commission reports</li>
            <li>✅ Withdraw your earnings</li>
          </ul>
          
          <p style="margin-top: 30px;">We'll notify you as soon as your account is approved!</p>
          
          <p style="margin-top: 20px;">
            <strong>Best regards,</strong><br>
            The ClothesShop Team
          </p>
        </div>
        
        <div class="footer">
          <p>© ${new Date().getFullYear()} ClothesShop. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `
}

const getAffiliateApprovalTemplate = (affiliateName, affiliateCode) => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        body {
          font-family: 'Arial', sans-serif;
          line-height: 1.6;
          color: #333;
          margin: 0;
          padding: 0;
          background-color: #f4f4f4;
        }
        .container {
          max-width: 600px;
          margin: 20px auto;
          background: white;
          border-radius: 10px;
          overflow: hidden;
          box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        }
        .header {
          background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
          color: white;
          padding: 40px 20px;
          text-align: center;
        }
        .header h1 {
          margin: 0;
          font-size: 28px;
          font-weight: bold;
        }
        .content {
          padding: 40px 30px;
        }
        .success-icon {
          text-align: center;
          font-size: 60px;
          margin: 20px 0;
        }
        .code-box {
          background: #fff3cd;
          border: 2px dashed #f5576c;
          padding: 20px;
          margin: 20px 0;
          border-radius: 8px;
          text-align: center;
        }
        .code {
          font-size: 24px;
          font-weight: bold;
          color: #f5576c;
          letter-spacing: 2px;
        }
        .button {
          display: inline-block;
          background: #f5576c;
          color: white;
          padding: 15px 40px;
          text-decoration: none;
          border-radius: 5px;
          margin: 20px 0;
          font-weight: bold;
        }
        .footer {
          background: #f8f9fa;
          padding: 20px;
          text-align: center;
          color: #666;
          font-size: 14px;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🎊 Congratulations!</h1>
          <p style="margin: 10px 0 0 0; font-size: 16px;">Your Affiliate Account is Approved</p>
        </div>
        
        <div class="content">
          <div class="success-icon">✅</div>
          
          <h2 style="text-align: center; color: #f5576c;">Welcome Aboard, ${affiliateName}!</h2>
          
          <p style="text-align: center; font-size: 16px;">
            Great news! Your affiliate account has been approved. 
            You can now start earning commissions!
          </p>
          
          <div class="code-box">
            <h3 style="margin: 0 0 10px 0; color: #f5576c;">🎯 Your Affiliate Code</h3>
            <div class="code">${affiliateCode}</div>
            <p style="margin: 10px 0 0 0; font-size: 14px; color: #666;">
              Share this code to earn commissions
            </p>
          </div>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${process.env.FRONTEND_URL || 'http://localhost:5173'}/affiliate/login" class="button">
              Login to Dashboard
            </a>
          </div>
          
          <h3>💰 Start Earning Now:</h3>
          <ol>
            <li>Login to your affiliate dashboard</li>
            <li>Share your affiliate code with customers</li>
            <li>Track your referrals and earnings</li>
            <li>Get marketing materials</li>
            <li>Withdraw your commissions!</li>
          </ol>
          
          <h3>📊 Commission Structure:</h3>
          <ul>
            <li>✅ Earn on every successful referral</li>
            <li>✅ Real-time tracking dashboard</li>
            <li>✅ Monthly commission payouts</li>
            <li>✅ Marketing support and materials</li>
          </ul>
          
          <p style="margin-top: 30px;">
            <strong>Best regards,</strong><br>
            The ClothesShop Team
          </p>
        </div>
        
        <div class="footer">
          <p>© ${new Date().getFullYear()} ClothesShop. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `
}

// Send vendor registration email
export const sendVendorRegistrationEmail = async (vendorEmail, vendorName) => {
  try {
    const transporter = createTransporter()
    
    if (!transporter) {
      // Log email to console in development
      console.log('\n📧 ===== VENDOR REGISTRATION EMAIL =====')
      console.log(`To: ${vendorEmail}`)
      console.log(`Subject: Welcome to ClothesShop - Vendor Registration Successful`)
      console.log(`Vendor Name: ${vendorName}`)
      console.log('Status: Pending Admin Approval')
      console.log('========================================\n')
      return { success: true, message: 'Email logged to console (dev mode)' }
    }

    const mailOptions = {
      from: `"ClothesShop" <${process.env.EMAIL_USER}>`,
      to: vendorEmail,
      subject: '🎉 Welcome to ClothesShop - Vendor Registration Successful',
      html: getVendorRegistrationTemplate(vendorName, vendorEmail)
    }

    const info = await transporter.sendMail(mailOptions)
    console.log('✅ Vendor registration email sent:', info.messageId)
    return { success: true, messageId: info.messageId }
  } catch (error) {
    console.error('❌ Error sending vendor registration email:', error)
    return { success: false, error: error.message }
  }
}

// Send vendor approval email
export const sendVendorApprovalEmail = async (vendorEmail, vendorName) => {
  try {
    const transporter = createTransporter()
    
    if (!transporter) {
      console.log('\n📧 ===== VENDOR APPROVAL EMAIL =====')
      console.log(`To: ${vendorEmail}`)
      console.log(`Subject: Congratulations! Your Vendor Account is Approved`)
      console.log(`Vendor Name: ${vendorName}`)
      console.log('====================================\n')
      return { success: true, message: 'Email logged to console (dev mode)' }
    }

    const mailOptions = {
      from: `"ClothesShop" <${process.env.EMAIL_USER}>`,
      to: vendorEmail,
      subject: '🎊 Congratulations! Your Vendor Account is Approved',
      html: getVendorApprovalTemplate(vendorName)
    }

    const info = await transporter.sendMail(mailOptions)
    console.log('✅ Vendor approval email sent:', info.messageId)
    return { success: true, messageId: info.messageId }
  } catch (error) {
    console.error('❌ Error sending vendor approval email:', error)
    return { success: false, error: error.message }
  }
}

// Send order confirmation email
export const sendOrderConfirmationEmail = async (orderData) => {
  try {
    const transporter = createTransporter()
    
    if (!transporter) {
      console.log('\n📧 ===== ORDER CONFIRMATION EMAIL =====')
      console.log(`To: ${orderData.customerEmail}`)
      console.log(`Subject: Order Confirmed - #${orderData.orderId}`)
      console.log(`Customer: ${orderData.customerName}`)
      console.log(`Total: ₹${orderData.totalAmount}`)
      console.log('=======================================\n')
      return { success: true, message: 'Email logged to console (dev mode)' }
    }

    const mailOptions = {
      from: `"ClothesShop" <${process.env.EMAIL_USER}>`,
      to: orderData.customerEmail,
      subject: `🎉 Order Confirmed - #${orderData.orderId}`,
      html: getOrderConfirmationTemplate(orderData)
    }

    const info = await transporter.sendMail(mailOptions)
    console.log('✅ Order confirmation email sent:', info.messageId)
    return { success: true, messageId: info.messageId }
  } catch (error) {
    console.error('❌ Error sending order confirmation email:', error)
    return { success: false, error: error.message }
  }
}

// Send customer welcome email
export const sendCustomerWelcomeEmail = async (customerEmail, customerName) => {
  try {
    const transporter = createTransporter()
    
    if (!transporter) {
      console.log('\n📧 ===== CUSTOMER WELCOME EMAIL =====')
      console.log(`To: ${customerEmail}`)
      console.log(`Subject: Welcome to ClothesShop!`)
      console.log(`Customer: ${customerName}`)
      console.log('====================================\n')
      return { success: true, message: 'Email logged to console (dev mode)' }
    }

    const mailOptions = {
      from: `"ClothesShop" <${process.env.EMAIL_USER}>`,
      to: customerEmail,
      subject: '🎉 Welcome to ClothesShop!',
      html: getCustomerWelcomeTemplate(customerName, customerEmail)
    }

    const info = await transporter.sendMail(mailOptions)
    console.log('✅ Customer welcome email sent:', info.messageId)
    return { success: true, messageId: info.messageId }
  } catch (error) {
    console.error('❌ Error sending customer welcome email:', error)
    return { success: false, error: error.message }
  }
}

// Send affiliate registration email
export const sendAffiliateRegistrationEmail = async (affiliateEmail, affiliateName, affiliateCode) => {
  try {
    const transporter = createTransporter()
    
    if (!transporter) {
      console.log('\n📧 ===== AFFILIATE REGISTRATION EMAIL =====')
      console.log(`To: ${affiliateEmail}`)
      console.log(`Subject: Welcome Affiliate Partner!`)
      console.log(`Affiliate: ${affiliateName}`)
      console.log(`Code: ${affiliateCode}`)
      console.log('==========================================\n')
      return { success: true, message: 'Email logged to console (dev mode)' }
    }

    const mailOptions = {
      from: `"ClothesShop" <${process.env.EMAIL_USER}>`,
      to: affiliateEmail,
      subject: '🎉 Welcome to ClothesShop Affiliate Program!',
      html: getAffiliateRegistrationTemplate(affiliateName, affiliateEmail, affiliateCode)
    }

    const info = await transporter.sendMail(mailOptions)
    console.log('✅ Affiliate registration email sent:', info.messageId)
    return { success: true, messageId: info.messageId }
  } catch (error) {
    console.error('❌ Error sending affiliate registration email:', error)
    return { success: false, error: error.message }
  }
}

// Send affiliate approval email
export const sendAffiliateApprovalEmail = async (affiliateEmail, affiliateName, affiliateCode) => {
  try {
    const transporter = createTransporter()
    
    if (!transporter) {
      console.log('\n📧 ===== AFFILIATE APPROVAL EMAIL =====')
      console.log(`To: ${affiliateEmail}`)
      console.log(`Subject: Congratulations! Affiliate Account Approved`)
      console.log(`Affiliate: ${affiliateName}`)
      console.log(`Code: ${affiliateCode}`)
      console.log('=========================================\n')
      return { success: true, message: 'Email logged to console (dev mode)' }
    }

    const mailOptions = {
      from: `"ClothesShop" <${process.env.EMAIL_USER}>`,
      to: affiliateEmail,
      subject: '🎊 Congratulations! Your Affiliate Account is Approved',
      html: getAffiliateApprovalTemplate(affiliateName, affiliateCode)
    }

    const info = await transporter.sendMail(mailOptions)
    console.log('✅ Affiliate approval email sent:', info.messageId)
    return { success: true, messageId: info.messageId }
  } catch (error) {
    console.error('❌ Error sending affiliate approval email:', error)
    return { success: false, error: error.message }
  }
}

export default {
  sendVendorRegistrationEmail,
  sendVendorApprovalEmail,
  sendOrderConfirmationEmail,
  sendCustomerWelcomeEmail,
  sendAffiliateRegistrationEmail,
  sendAffiliateApprovalEmail
}


// Send contact notification email to admin
export const sendContactNotificationEmail = async (name, email, subject, message) => {
  try {
    const transporter = createTransporter()
    
    const adminEmail = process.env.ADMIN_EMAIL || process.env.EMAIL_USER
    
    if (!transporter) {
      console.log('\n📧 ===== CONTACT NOTIFICATION EMAIL =====')
      console.log(`To: ${adminEmail}`)
      console.log(`From: ${name} <${email}>`)
      console.log(`Subject: ${subject}`)
      console.log(`Message: ${message}`)
      console.log('========================================\n')
      return { success: true, message: 'Email logged to console (dev mode)' }
    }

    const mailOptions = {
      from: `"ClothesShop Contact" <${process.env.EMAIL_USER}>`,
      to: adminEmail,
      replyTo: email,
      subject: `📧 New Contact Message: ${subject}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <style>
            body {
              font-family: Arial, sans-serif;
              line-height: 1.6;
              color: #333;
              background-color: #f4f4f4;
              margin: 0;
              padding: 0;
            }
            .container {
              max-width: 600px;
              margin: 20px auto;
              background: white;
              border-radius: 10px;
              overflow: hidden;
              box-shadow: 0 4px 6px rgba(0,0,0,0.1);
            }
            .header {
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              color: white;
              padding: 30px 20px;
              text-align: center;
            }
            .content {
              padding: 30px;
            }
            .info-box {
              background: #f8f9fa;
              border-left: 4px solid #667eea;
              padding: 15px;
              margin: 15px 0;
              border-radius: 4px;
            }
            .message-box {
              background: #fff;
              border: 1px solid #e0e0e0;
              padding: 20px;
              margin: 20px 0;
              border-radius: 8px;
            }
            .footer {
              background: #f8f9fa;
              padding: 20px;
              text-align: center;
              color: #666;
              font-size: 14px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>📧 New Contact Message</h1>
              <p style="margin: 10px 0 0 0;">From ClothesShop Website</p>
            </div>
            
            <div class="content">
              <h2>Contact Details</h2>
              
              <div class="info-box">
                <p><strong>👤 Name:</strong> ${name}</p>
                <p><strong>📧 Email:</strong> ${email}</p>
                <p><strong>📋 Subject:</strong> ${subject}</p>
                <p><strong>📅 Date:</strong> ${new Date().toLocaleString()}</p>
              </div>
              
              <h3>💬 Message:</h3>
              <div class="message-box">
                <p>${message.replace(/\n/g, '<br>')}</p>
              </div>
              
              <p style="margin-top: 30px; padding: 15px; background: #e3f2fd; border-radius: 8px;">
                <strong>💡 Tip:</strong> Reply directly to this email to respond to ${name}
              </p>
            </div>
            
            <div class="footer">
              <p>© ${new Date().getFullYear()} ClothesShop Admin Panel</p>
            </div>
          </div>
        </body>
        </html>
      `
    }

    const info = await transporter.sendMail(mailOptions)
    console.log('✅ Contact notification email sent to admin:', info.messageId)
    return { success: true, messageId: info.messageId }
  } catch (error) {
    console.error('❌ Error sending contact notification email:', error)
    return { success: false, error: error.message }
  }
}

// Send contact reply email to user
export const sendContactReplyEmail = async (userEmail, userName, subject, reply) => {
  try {
    const transporter = createTransporter()
    
    if (!transporter) {
      console.log('\n📧 ===== CONTACT REPLY EMAIL =====')
      console.log(`To: ${userEmail}`)
      console.log(`Subject: Re: ${subject}`)
      console.log(`Reply: ${reply}`)
      console.log('========================================\n')
      return { success: true, message: 'Email logged to console (dev mode)' }
    }

    const mailOptions = {
      from: `"ClothesShop Support" <${process.env.EMAIL_USER}>`,
      to: userEmail,
      subject: `Re: ${subject}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <style>
            body {
              font-family: Arial, sans-serif;
              line-height: 1.6;
              color: #333;
              background-color: #f4f4f4;
              margin: 0;
              padding: 0;
            }
            .container {
              max-width: 600px;
              margin: 20px auto;
              background: white;
              border-radius: 10px;
              overflow: hidden;
              box-shadow: 0 4px 6px rgba(0,0,0,0.1);
            }
            .header {
              background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%);
              color: white;
              padding: 30px 20px;
              text-align: center;
            }
            .content {
              padding: 30px;
            }
            .reply-box {
              background: #f8f9fa;
              border-left: 4px solid #11998e;
              padding: 20px;
              margin: 20px 0;
              border-radius: 4px;
            }
            .footer {
              background: #f8f9fa;
              padding: 20px;
              text-align: center;
              color: #666;
              font-size: 14px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>💬 Response to Your Message</h1>
              <p style="margin: 10px 0 0 0;">ClothesShop Support Team</p>
            </div>
            
            <div class="content">
              <h2>Hello ${userName}! 👋</h2>
              
              <p>Thank you for contacting us. Here's our response to your inquiry:</p>
              
              <div class="reply-box">
                <h3 style="margin-top: 0; color: #11998e;">📋 Regarding: ${subject}</h3>
                <p>${reply.replace(/\n/g, '<br>')}</p>
              </div>
              
              <p>If you have any further questions, feel free to reply to this email or contact us again.</p>
              
              <p style="margin-top: 30px;">
                <strong>Best regards,</strong><br>
                ClothesShop Support Team
              </p>
            </div>
            
            <div class="footer">
              <p>© ${new Date().getFullYear()} ClothesShop. All rights reserved.</p>
              <p style="margin-top: 10px; font-size: 12px;">
                Need more help? Visit our <a href="${process.env.FRONTEND_URL || 'http://localhost:5173'}/contact">Contact Page</a>
              </p>
            </div>
          </div>
        </body>
        </html>
      `
    }

    const info = await transporter.sendMail(mailOptions)
    console.log('✅ Contact reply email sent:', info.messageId)
    return { success: true, messageId: info.messageId }
  } catch (error) {
    console.error('❌ Error sending contact reply email:', error)
    return { success: false, error: error.message }
  }
}
