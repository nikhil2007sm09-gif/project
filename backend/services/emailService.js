
/* eslint-disable */
/* This file contains HTML email templates as JavaScript template literals.
   The linter incorrectly interprets these as JSX, but they are valid JavaScript strings.
   Email templates use table-based layouts for email client compatibility. */

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
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Welcome to ClothesShop</title>
      <style type="text/css">
        * { margin: 0; padding: 0; }
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; background-color: #f4f4f4; }
        table { width: 100%; border-collapse: collapse; }
        .container { max-width: 600px; margin: 0 auto; background: white; }
        .header { background-color: #667eea; color: white; padding: 30px 20px; text-align: center; }
        .header h1 { font-size: 24px; margin: 0; }
        .content { padding: 30px 20px; }
        .content h2 { color: #667eea; margin-bottom: 15px; }
        .info-box { background: #f8f9fa; border-left: 4px solid #667eea; padding: 15px; margin: 15px 0; }
        .status-badge { display: inline-block; background: #ffc107; color: #000; padding: 8px 16px; border-radius: 4px; font-weight: bold; margin: 10px 0; }
        .footer { background: #f8f9fa; padding: 20px; text-align: center; color: #666; font-size: 12px; border-top: 1px solid #ddd; }
        ul, ol { margin: 15px 0; padding-left: 20px; }
        li { margin: 8px 0; }
        p { margin: 10px 0; }
      </style>
    </head>
    <body>
      <table class="container">
        <tr>
          <td class="header">
            <h1>Welcome to ClothesShop!</h1>
            <p>Your Vendor Account Has Been Created</p>
          </td>
        </tr>
        <tr>
          <td class="content">
            <h2>Hello ${vendorName},</h2>
            <p>Thank you for registering as a vendor on ClothesShop. We're excited to have you join our marketplace!</p>
            
            <div class="info-box">
              <p><strong>Email:</strong> ${vendorEmail}</p>
              <p><strong>Role:</strong> Vendor</p>
              <p><strong>Registration Date:</strong> ${new Date().toLocaleDateString()}</p>
            </div>
            
            <p><strong>Current Status:</strong></p>
            <span class="status-badge">Pending Admin Approval</span>
            
            <h3 style="margin-top: 20px; color: #667eea;">What Happens Next?</h3>
            <ol>
              <li>Our team will review your vendor application within 24-48 hours</li>
              <li>You'll receive an email once your account is approved</li>
              <li>After approval, you can login and start adding your products</li>
            </ol>
            
            <h3 style="margin-top: 20px; color: #667eea;">Once Approved, You Can:</h3>
            <ul>
              <li>Add unlimited products to your store</li>
              <li>Upload product images and descriptions</li>
              <li>Manage inventory and pricing</li>
              <li>Track your sales and orders</li>
              <li>Access vendor dashboard with analytics</li>
            </ul>
            
            <p style="margin-top: 20px;">If you have any questions, feel free to contact our support team.</p>
            <p style="margin-top: 20px;"><strong>Best regards,</strong><br>The ClothesShop Team</p>
          </td>
        </tr>
        <tr>
          <td class="footer">
            <p>© ${new Date().getFullYear()} ClothesShop. All rights reserved.</p>
            <p>This is an automated email. Please do not reply to this message.</p>
          </td>
        </tr>
      </table>
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
    </head>
    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; background-color: #f4f4f4;">
      <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f4f4f4;">
        <tr>
          <td align="center" style="padding: 20px;">
            <table width="600" cellpadding="0" cellspacing="0" style="background: white; border-collapse: collapse;">
              <!-- Header -->
              <tr>
                <td style="background-color: #11998e; color: white; padding: 40px 20px; text-align: center;">
                  <h1 style="margin: 0; font-size: 28px; font-weight: bold;">🎊 Congratulations!</h1>
                  <p style="margin: 10px 0 0 0; font-size: 16px;">Your Vendor Account is Approved</p>
                </td>
              </tr>
              
              <!-- Content -->
              <tr>
                <td style="padding: 40px 30px;">
                  <div style="text-align: center; font-size: 60px; margin: 20px 0;">✅</div>
                  
                  <h2 style="text-align: center; color: #11998e; margin: 20px 0;">Welcome Aboard, ${vendorName}!</h2>
                  
                  <p style="text-align: center; font-size: 16px; margin: 20px 0;">
                    Great news! Your vendor account has been approved by our admin team. You can now start selling on ClothesShop!
                  </p>
                  
                  <div style="text-align: center; margin: 30px 0;">
                    <a href="${process.env.FRONTEND_URL || 'http://localhost:5173'}/vendor/login" style="display: inline-block; background: #11998e; color: white; padding: 15px 40px; text-decoration: none; font-weight: bold;">
                      Login to Dashboard
                    </a>
                  </div>
                  
                  <h3 style="color: #11998e; margin-top: 20px;">🚀 Get Started:</h3>
                  <ol style="margin: 15px 0; padding-left: 20px;">
                    <li style="margin: 8px 0;">Login to your vendor dashboard</li>
                    <li style="margin: 8px 0;">Add your first product</li>
                    <li style="margin: 8px 0;">Upload product images</li>
                    <li style="margin: 8px 0;">Set competitive prices</li>
                    <li style="margin: 8px 0;">Start receiving orders!</li>
                  </ol>
                  
                  <p style="margin-top: 30px;">
                    <strong>Best regards,</strong><br>
                    The ClothesShop Team
                  </p>
                </td>
              </tr>
              
              <!-- Footer -->
              <tr>
                <td style="background: #f8f9fa; padding: 20px; text-align: center; color: #666; font-size: 14px; border-top: 1px solid #ddd;">
                  <p style="margin: 0;">© ${new Date().getFullYear()} ClothesShop. All rights reserved.</p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `
}

const getOrderConfirmationTemplate = (orderData) => {
  const { customerName, customerEmail, orderId, items, totalAmount, shippingAddress, orderDate } = orderData
  
  const itemsHtml = items.map(item => `
    <tr>
      <td style="padding: 15px; border-bottom: 1px solid #e0e0e0;">
        <strong>${item.name}</strong><br>
        <span style="color: #666; font-size: 14px;">Qty: ${item.quantity}</span>
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
    </head>
    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; background-color: #f4f4f4;">
      <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f4f4f4;">
        <tr>
          <td align="center" style="padding: 20px;">
            <table width="600" cellpadding="0" cellspacing="0" style="background: white; border-collapse: collapse;">
              <!-- Header -->
              <tr>
                <td style="background-color: #667eea; color: white; padding: 40px 20px; text-align: center;">
                  <h1 style="margin: 0; font-size: 28px; font-weight: bold;">🎉 Order Confirmed!</h1>
                  <p style="margin: 10px 0 0 0; font-size: 16px;">Thank you for your purchase</p>
                </td>
              </tr>
              
              <!-- Content -->
              <tr>
                <td style="padding: 40px 30px;">
                  <h2 style="margin: 0 0 20px 0;">Hello ${customerName}! 👋</h2>
                  
                  <p style="margin: 15px 0;">Your order has been successfully placed and is being processed. We'll send you another email when your order ships.</p>
                  
                  <!-- Order Details Box -->
                  <table width="100%" cellpadding="0" cellspacing="0" style="background: #f8f9fa; border-left: 4px solid #667eea; margin: 20px 0;">
                    <tr>
                      <td style="padding: 20px;">
                        <h3 style="margin: 0 0 15px 0; color: #667eea;">📦 Order Details</h3>
                        <p style="margin: 8px 0;"><strong>Order ID:</strong> #${orderId}</p>
                        <p style="margin: 8px 0;"><strong>Order Date:</strong> ${new Date(orderDate).toLocaleDateString('en-IN', { 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}</p>
                        <p style="margin: 8px 0;"><strong>Status:</strong> <span style="display: inline-block; background: #4caf50; color: white; padding: 4px 12px; border-radius: 20px; font-weight: bold;">✓ Confirmed</span></p>
                      </td>
                    </tr>
                  </table>
                  
                  <h3 style="margin: 20px 0 15px 0;">🛍️ Order Items</h3>
                  <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse: collapse;">
                    <thead>
                      <tr style="background: #f8f9fa;">
                        <th style="padding: 12px; text-align: left; border-bottom: 2px solid #667eea;">Product</th>
                        <th style="padding: 12px; text-align: right; border-bottom: 2px solid #667eea;">Price</th>
                        <th style="padding: 12px; text-align: right; border-bottom: 2px solid #667eea;">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      ${itemsHtml}
                      <tr style="background: #667eea; color: white;">
                        <td colspan="2" style="padding: 15px; font-weight: bold;">Total Amount</td>
                        <td style="padding: 15px; text-align: right; font-weight: bold; font-size: 18px;">₹${totalAmount.toLocaleString()}</td>
                      </tr>
                    </tbody>
                  </table>
                  
                  <!-- Shipping Address Box -->
                  <table width="100%" cellpadding="0" cellspacing="0" style="background: #f8f9fa; border-left: 4px solid #667eea; margin: 20px 0;">
                    <tr>
                      <td style="padding: 20px;">
                        <h3 style="margin: 0 0 15px 0; color: #667eea;">📍 Shipping Address</h3>
                        <p style="margin: 8px 0;">${shippingAddress.fullName}</p>
                        <p style="margin: 8px 0;">${shippingAddress.address}</p>
                        <p style="margin: 8px 0;">${shippingAddress.city}, ${shippingAddress.state} - ${shippingAddress.pincode}</p>
                        <p style="margin: 8px 0;">Phone: ${shippingAddress.phone}</p>
                      </td>
                    </tr>
                  </table>
                  
                  <div style="text-align: center; margin: 30px 0;">
                    <a href="${process.env.FRONTEND_URL || 'http://localhost:5173'}/orders" style="display: inline-block; background: #667eea; color: white; padding: 15px 40px; text-decoration: none; font-weight: bold;">
                      Track Your Order
                    </a>
                  </div>
                  
                  <h3 style="margin: 20px 0 15px 0;">📋 What's Next?</h3>
                  <ol style="margin: 15px 0; padding-left: 20px;">
                    <li style="margin: 8px 0;"><strong>Order Processing:</strong> We're preparing your items for shipment</li>
                    <li style="margin: 8px 0;"><strong>Quality Check:</strong> Each item is carefully inspected</li>
                    <li style="margin: 8px 0;"><strong>Packaging:</strong> Your order is securely packed</li>
                    <li style="margin: 8px 0;"><strong>Shipping:</strong> You'll receive tracking details via email</li>
                    <li style="margin: 8px 0;"><strong>Delivery:</strong> Estimated delivery in 3-5 business days</li>
                  </ol>
                  
                  <p style="margin-top: 20px;">If you have any questions about your order, feel free to contact our support team.</p>
                  
                  <p style="margin-top: 30px;">
                    <strong>Best regards,</strong><br>
                    The ClothesShop Team
                  </p>
                </td>
              </tr>
              
              <!-- Footer -->
              <tr>
                <td style="background: #f8f9fa; padding: 20px; text-align: center; color: #666; font-size: 14px; border-top: 1px solid #ddd;">
                  <p style="margin: 0;">© ${new Date().getFullYear()} ClothesShop. All rights reserved.</p>
                  <p style="margin: 10px 0 0 0; font-size: 12px;">This is an automated email. Please do not reply to this message.</p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `
}

const getCustomerWelcomeTemplate = (customerName, customerEmail) => {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Welcome to ClothesShop</title>
      <style type="text/css">
        * { margin: 0; padding: 0; }
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; background-color: #f4f4f4; }
        table { width: 100%; border-collapse: collapse; }
        .container { max-width: 600px; margin: 0 auto; background: white; }
        .header { background-color: #667eea; color: white; padding: 30px 20px; text-align: center; }
        .header h1 { font-size: 24px; margin: 0; }
        .content { padding: 30px 20px; }
        .content h2 { color: #667eea; margin-bottom: 15px; }
        .feature-box { background: #f8f9fa; padding: 15px; margin: 15px 0; border-left: 4px solid #667eea; }
        .button { display: inline-block; background-color: #667eea; color: white; padding: 12px 30px; text-decoration: none; border-radius: 4px; margin: 20px 0; font-weight: bold; }
        .footer { background: #f8f9fa; padding: 20px; text-align: center; color: #666; font-size: 12px; border-top: 1px solid #ddd; }
        ul, ol { margin: 15px 0; padding-left: 20px; }
        li { margin: 8px 0; }
        p { margin: 10px 0; }
      </style>
    </head>
    <body>
      <table class="container">
        <tr>
          <td class="header">
            <h1>Welcome to ClothesShop!</h1>
            <p>Your account has been created successfully</p>
          </td>
        </tr>
        <tr>
          <td class="content">
            <h2>Hello ${customerName},</h2>
            <p>Thank you for joining ClothesShop! We're excited to have you as part of our community.</p>
            
            <div class="feature-box">
              <p><strong>Email:</strong> ${customerEmail}</p>
              <p><strong>Account Type:</strong> Customer</p>
              <p><strong>Joined:</strong> ${new Date().toLocaleDateString()}</p>
            </div>
            
            <p style="text-align: center;">
              <a href="${process.env.FRONTEND_URL || 'http://localhost:5173'}/products" class="button">Start Shopping</a>
            </p>
            
            <h3 style="color: #667eea; margin-top: 20px;">What You Can Do:</h3>
            <ul>
              <li>Browse thousands of products</li>
              <li>Add items to cart and wishlist</li>
              <li>Secure checkout with multiple payment options</li>
              <li>Track your orders in real-time</li>
              <li>Manage your profile and addresses</li>
              <li>Get exclusive deals and offers</li>
            </ul>
            
            <h3 style="color: #667eea; margin-top: 20px;">Shopping Tips:</h3>
            <ul>
              <li>Check out our latest collections</li>
              <li>Subscribe to newsletter for exclusive deals</li>
              <li>Follow us on social media for updates</li>
              <li>Contact support anytime for help</li>
            </ul>
            
            <p style="margin-top: 20px;">Happy Shopping!</p>
            <p style="margin-top: 20px;"><strong>Best regards,</strong><br>The ClothesShop Team</p>
          </td>
        </tr>
        <tr>
          <td class="footer">
            <p>© ${new Date().getFullYear()} ClothesShop. All rights reserved.</p>
            <p>This is an automated email. Please do not reply to this message.</p>
          </td>
        </tr>
      </table>
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
    </head>
    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; background-color: #f4f4f4;">
      <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f4f4f4;">
        <tr>
          <td align="center" style="padding: 20px;">
            <table width="600" cellpadding="0" cellspacing="0" style="background: white; border-collapse: collapse;">
              <!-- Header -->
              <tr>
                <td style="background-color: #f5576c; color: white; padding: 40px 20px; text-align: center;">
                  <h1 style="margin: 0; font-size: 28px; font-weight: bold;">🎉 Welcome Affiliate Partner!</h1>
                  <p style="margin: 10px 0 0 0; font-size: 16px;">Your Affiliate Account Has Been Created</p>
                </td>
              </tr>
              
              <!-- Content -->
              <tr>
                <td style="padding: 40px 30px;">
                  <h2 style="margin: 0 0 20px 0;">Hello ${affiliateName}! 👋</h2>
                  
                  <p style="margin: 15px 0;">Thank you for joining our affiliate program! We're excited to partner with you.</p>
                  
                  <!-- Info Box -->
                  <table width="100%" cellpadding="0" cellspacing="0" style="background: #f8f9fa; border-left: 4px solid #f5576c; margin: 20px 0;">
                    <tr>
                      <td style="padding: 15px;">
                        <p style="margin: 8px 0;"><strong>📧 Email:</strong> ${affiliateEmail}</p>
                        <p style="margin: 8px 0;"><strong>👤 Role:</strong> Affiliate Partner</p>
                        <p style="margin: 8px 0;"><strong>📅 Registration Date:</strong> ${new Date().toLocaleDateString()}</p>
                      </td>
                    </tr>
                  </table>
                  
                  <p style="margin: 15px 0;"><strong>Current Status:</strong></p>
                  <p style="margin: 10px 0;"><span style="display: inline-block; background: #ffc107; color: #000; padding: 8px 16px; border-radius: 20px; font-weight: bold;">⏳ Pending Admin Approval</span></p>
                  
                  <!-- Code Box -->
                  <table width="100%" cellpadding="0" cellspacing="0" style="background: #fff3cd; border: 2px dashed #f5576c; margin: 20px 0;">
                    <tr>
                      <td style="padding: 20px; text-align: center;">
                        <h3 style="margin: 0 0 10px 0; color: #f5576c;">🎯 Your Affiliate Code</h3>
                        <div style="font-size: 24px; font-weight: bold; color: #f5576c; letter-spacing: 2px;">${affiliateCode}</div>
                        <p style="margin: 10px 0 0 0; font-size: 14px; color: #666;">Use this code to track your referrals</p>
                      </td>
                    </tr>
                  </table>
                  
                  <h3 style="margin: 20px 0 15px 0;">📋 What Happens Next?</h3>
                  <ol style="margin: 15px 0; padding-left: 20px;">
                    <li style="margin: 8px 0;"><strong>Admin Review:</strong> Our team will review your application within 24-48 hours</li>
                    <li style="margin: 8px 0;"><strong>Approval Email:</strong> You'll receive confirmation once approved</li>
                    <li style="margin: 8px 0;"><strong>Start Earning:</strong> Share your affiliate code and earn commissions!</li>
                  </ol>
                  
                  <h3 style="margin: 20px 0 15px 0;">💰 Once Approved, You Can:</h3>
                  <ul style="margin: 15px 0; padding-left: 20px;">
                    <li style="margin: 8px 0;">✅ Access your affiliate dashboard</li>
                    <li style="margin: 8px 0;">✅ Track referrals and earnings</li>
                    <li style="margin: 8px 0;">✅ Get marketing materials</li>
                    <li style="margin: 8px 0;">✅ View commission reports</li>
                    <li style="margin: 8px 0;">✅ Withdraw your earnings</li>
                  </ul>
                  
                  <p style="margin-top: 30px;">We'll notify you as soon as your account is approved!</p>
                  
                  <p style="margin-top: 20px;">
                    <strong>Best regards,</strong><br>
                    The ClothesShop Team
                  </p>
                </td>
              </tr>
              
              <!-- Footer -->
              <tr>
                <td style="background: #f8f9fa; padding: 20px; text-align: center; color: #666; font-size: 14px; border-top: 1px solid #ddd;">
                  <p style="margin: 0;">© ${new Date().getFullYear()} ClothesShop. All rights reserved.</p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
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
    </head>
    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; background-color: #f4f4f4;">
      <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f4f4f4;">
        <tr>
          <td align="center" style="padding: 20px;">
            <table width="600" cellpadding="0" cellspacing="0" style="background: white; border-collapse: collapse;">
              <!-- Header -->
              <tr>
                <td style="background-color: #f5576c; color: white; padding: 40px 20px; text-align: center;">
                  <h1 style="margin: 0; font-size: 28px; font-weight: bold;">🎊 Congratulations!</h1>
                  <p style="margin: 10px 0 0 0; font-size: 16px;">Your Affiliate Account is Approved</p>
                </td>
              </tr>
              
              <!-- Content -->
              <tr>
                <td style="padding: 40px 30px;">
                  <div style="text-align: center; font-size: 60px; margin: 20px 0;">✅</div>
                  
                  <h2 style="text-align: center; color: #f5576c; margin: 20px 0;">Welcome Aboard, ${affiliateName}!</h2>
                  
                  <p style="text-align: center; font-size: 16px; margin: 20px 0;">
                    Great news! Your affiliate account has been approved. You can now start earning commissions!
                  </p>
                  
                  <!-- Code Box -->
                  <table width="100%" cellpadding="0" cellspacing="0" style="background: #fff3cd; border: 2px dashed #f5576c; margin: 20px 0;">
                    <tr>
                      <td style="padding: 20px; text-align: center;">
                        <h3 style="margin: 0 0 10px 0; color: #f5576c;">🎯 Your Affiliate Code</h3>
                        <div style="font-size: 24px; font-weight: bold; color: #f5576c; letter-spacing: 2px;">${affiliateCode}</div>
                        <p style="margin: 10px 0 0 0; font-size: 14px; color: #666;">Share this code to earn commissions</p>
                      </td>
                    </tr>
                  </table>
                  
                  <div style="text-align: center; margin: 30px 0;">
                    <a href="${process.env.FRONTEND_URL || 'http://localhost:5173'}/affiliate/login" style="display: inline-block; background: #f5576c; color: white; padding: 15px 40px; text-decoration: none; font-weight: bold;">
                      Login to Dashboard
                    </a>
                  </div>
                  
                  <h3 style="margin: 20px 0 15px 0;">💰 Start Earning Now:</h3>
                  <ol style="margin: 15px 0; padding-left: 20px;">
                    <li style="margin: 8px 0;">Login to your affiliate dashboard</li>
                    <li style="margin: 8px 0;">Share your affiliate code with customers</li>
                    <li style="margin: 8px 0;">Track your referrals and earnings</li>
                    <li style="margin: 8px 0;">Get marketing materials</li>
                    <li style="margin: 8px 0;">Withdraw your commissions!</li>
                  </ol>
                  
                  <h3 style="margin: 20px 0 15px 0;">📊 Commission Structure:</h3>
                  <ul style="margin: 15px 0; padding-left: 20px;">
                    <li style="margin: 8px 0;">✅ Earn on every successful referral</li>
                    <li style="margin: 8px 0;">✅ Real-time tracking dashboard</li>
                    <li style="margin: 8px 0;">✅ Monthly commission payouts</li>
                    <li style="margin: 8px 0;">✅ Marketing support and materials</li>
                  </ul>
                  
                  <p style="margin-top: 30px;">
                    <strong>Best regards,</strong><br>
                    The ClothesShop Team
                  </p>
                </td>
              </tr>
              
              <!-- Footer -->
              <tr>
                <td style="background: #f8f9fa; padding: 20px; text-align: center; color: #666; font-size: 14px; border-top: 1px solid #ddd;">
                  <p style="margin: 0;">© ${new Date().getFullYear()} ClothesShop. All rights reserved.</p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
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
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; background-color: #f4f4f4;">
          <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f4f4f4;">
            <tr>
              <td align="center" style="padding: 20px;">
                <table width="600" cellpadding="0" cellspacing="0" style="background: white; border-collapse: collapse;">
                  <!-- Header -->
                  <tr>
                    <td style="background-color: #667eea; color: white; padding: 30px 20px; text-align: center;">
                      <h1 style="margin: 0; font-size: 24px; font-weight: bold;">📧 New Contact Message</h1>
                      <p style="margin: 10px 0 0 0;">From ClothesShop Website</p>
                    </td>
                  </tr>
                  
                  <!-- Content -->
                  <tr>
                    <td style="padding: 30px;">
                      <h2 style="margin: 0 0 20px 0;">Contact Details</h2>
                      
                      <table width="100%" cellpadding="0" cellspacing="0" style="background: #f8f9fa; border-left: 4px solid #667eea; margin: 15px 0;">
                        <tr>
                          <td style="padding: 15px;">
                            <p style="margin: 8px 0;"><strong>👤 Name:</strong> ${name}</p>
                            <p style="margin: 8px 0;"><strong>📧 Email:</strong> ${email}</p>
                            <p style="margin: 8px 0;"><strong>📋 Subject:</strong> ${subject}</p>
                            <p style="margin: 8px 0;"><strong>📅 Date:</strong> ${new Date().toLocaleString()}</p>
                          </td>
                        </tr>
                      </table>
                      
                      <h3 style="margin: 20px 0 15px 0;">💬 Message:</h3>
                      <table width="100%" cellpadding="0" cellspacing="0" style="background: #fff; border: 1px solid #e0e0e0; margin: 20px 0;">
                        <tr>
                          <td style="padding: 20px;">
                            <p style="margin: 0; white-space: pre-wrap;">${message.replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\n/g, '<br>')}</p>
                          </td>
                        </tr>
                      </table>
                      
                      <p style="margin-top: 30px; padding: 15px; background: #e3f2fd; border-radius: 8px;">
                        <strong>💡 Tip:</strong> Reply directly to this email to respond to ${name}
                      </p>
                    </td>
                  </tr>
                  
                  <!-- Footer -->
                  <tr>
                    <td style="background: #f8f9fa; padding: 20px; text-align: center; color: #666; font-size: 14px; border-top: 1px solid #ddd;">
                      <p style="margin: 0;">© ${new Date().getFullYear()} ClothesShop Admin Panel</p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
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
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; background-color: #f4f4f4;">
          <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f4f4f4;">
            <tr>
              <td align="center" style="padding: 20px;">
                <table width="600" cellpadding="0" cellspacing="0" style="background: white; border-collapse: collapse;">
                  <!-- Header -->
                  <tr>
                    <td style="background-color: #11998e; color: white; padding: 30px 20px; text-align: center;">
                      <h1 style="margin: 0; font-size: 24px; font-weight: bold;">💬 Response to Your Message</h1>
                      <p style="margin: 10px 0 0 0;">ClothesShop Support Team</p>
                    </td>
                  </tr>
                  
                  <!-- Content -->
                  <tr>
                    <td style="padding: 30px;">
                      <h2 style="margin: 0 0 20px 0;">Hello ${userName}! 👋</h2>
                      
                      <p style="margin: 15px 0;">Thank you for contacting us. Here's our response to your inquiry:</p>
                      
                      <table width="100%" cellpadding="0" cellspacing="0" style="background: #f8f9fa; border-left: 4px solid #11998e; margin: 20px 0;">
                        <tr>
                          <td style="padding: 20px;">
                            <h3 style="margin: 0 0 15px 0; color: #11998e;">📋 Regarding: ${subject}</h3>
                            <p style="margin: 0; white-space: pre-wrap;">${reply.replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\n/g, '<br>')}</p>
                          </td>
                        </tr>
                      </table>
                      
                      <p style="margin: 15px 0;">If you have any further questions, feel free to reply to this email or contact us again.</p>
                      
                      <p style="margin-top: 30px;">
                        <strong>Best regards,</strong><br>
                        ClothesShop Support Team
                      </p>
                    </td>
                  </tr>
                  
                  <!-- Footer -->
                  <tr>
                    <td style="background: #f8f9fa; padding: 20px; text-align: center; color: #666; font-size: 14px; border-top: 1px solid #ddd;">
                      <p style="margin: 0;">© ${new Date().getFullYear()} ClothesShop. All rights reserved.</p>
                      <p style="margin: 10px 0 0 0; font-size: 12px;">
                        Need more help? Visit our <a href="${process.env.FRONTEND_URL || 'http://localhost:5173'}/contact" style="color: #11998e; text-decoration: none;">Contact Page</a>
                      </p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
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
