# Vendor & Affiliate Live Analytics

## Overview
Added comprehensive live analytics dashboards for both Vendor and Affiliate panels with real-time insights, charts, and performance metrics.

---

## VENDOR ANALYTICS

### Backend Endpoint
**GET** `/api/products/vendor/analytics`

Returns:
```javascript
{
  overview: {
    totalProducts,
    totalStock,
    lowStockProducts,
    totalRevenue,
    totalSales,
    thisMonthRevenue,
    recentOrders
  },
  topProducts: [
    {
      product: { _id, name, price, stock, images },
      quantity: totalSold,
      revenue: totalRevenue
    }
  ],
  salesByDay: [
    {
      date: '2024-01-15',
      revenue: 5000,
      sales: 50,
      orders: 10
    }
  ],
  categoryDistribution: [
    {
      category: 'T-Shirts',
      count: 25,
      stock: 500
    }
  ]
}
```

### Features

#### 1. Key Metrics Cards
- **Total Revenue**: All-time earnings (blue gradient)
- **This Month Revenue**: Current month with recent orders count (green gradient)
- **Total Products**: Product count with total stock (purple gradient)
- **Total Sales**: Units sold (orange gradient)

#### 2. Low Stock Alert
- Yellow alert banner when products have < 10 units
- Shows count of low stock products

#### 3. Sales Trend Chart
- Last 7 days revenue visualization
- Shows units sold and revenue per day
- Gradient progress bars

#### 4. Top Selling Products
- Top 5 products ranked by units sold
- Shows product name, units sold, and revenue
- Green revenue highlight

#### 5. Category Distribution
- Products grouped by category
- Shows product count and stock per category
- Purple-pink gradient bars

---

## AFFILIATE ANALYTICS

### Backend Endpoint
**GET** `/api/affiliate/analytics`

Returns:
```javascript
{
  overview: {
    totalSales,
    totalRevenue,
    totalCommission,
    thisMonthCommission,
    lastMonthCommission,
    commissionGrowth,
    recentOrders,
    recentCommission,
    clicks,
    conversionRate
  },
  salesByDay: [
    {
      date: '2024-01-15',
      orders: 5,
      revenue: 10000,
      commission: 1000
    }
  ],
  topCustomers: [
    {
      customer: { name, email },
      orders: 10,
      revenue: 50000,
      commission: 5000
    }
  ],
  recentOrders: [
    {
      _id,
      customer: 'John Doe',
      amount: 5000,
      commission: 500,
      status: 'completed',
      createdAt
    }
  ],
  affiliateLink,
  affiliateCode
}
```

### Features

#### 1. Overview Tab
- Total Clicks (blue gradient)
- Total Sales (green gradient)
- Commission Earned (purple gradient)
- Affiliate link with copy button

#### 2. Analytics Tab - Key Metrics
- **Total Commission**: All-time earnings (blue gradient)
- **This Month Commission**: With growth % vs last month (green gradient)
- **Total Sales**: With recent 7-day count (purple gradient)
- **Conversion Rate**: Click to sale ratio (orange gradient)

#### 3. Commission Trend Chart
- Last 7 days commission visualization
- Shows orders count and commission per day
- Green-blue gradient bars

#### 4. Top Customers
- Top 5 customers by commission generated
- Shows customer name, order count, and commission
- Ranked display

#### 5. Recent Orders
- Last 10 orders with customer name
- Shows commission earned per order
- Status badges (completed, pending, etc.)
- Scrollable list

#### 6. Affiliate Link Section
- Gradient purple-pink background
- Affiliate link with copy button
- Displays affiliate code
- Prominent call-to-action

---

## UI/UX Features

### Common Elements
- **Tabs Navigation**: Switch between different views
- **Loading States**: Spinner while fetching data
- **Gradient Cards**: Beautiful color-coded metrics
- **Responsive Design**: Mobile, tablet, desktop layouts
- **Interactive Charts**: Progress bars with animations
- **Hover Effects**: Smooth transitions on cards

### Color Scheme
- Blue: Revenue/Commission
- Green: Growth/This Month
- Purple: Products/Sales
- Orange: Users/Conversion
- Yellow: Alerts/Warnings

### Animations
- Smooth tab transitions
- Progress bar animations (500ms)
- Card hover effects
- Loading spinner

---

## Commission Calculation
- **Rate**: 10% of order total
- **Formula**: `commission = orderAmount * 0.1`
- Applied to all orders with affiliate code

---

## Files Modified

### Backend
1. **backend/routes/products.js**
   - Added `/vendor/analytics` endpoint
   - Complex aggregation for sales data
   - Product performance calculations

2. **backend/routes/affiliate.js**
   - Added `/analytics` endpoint
   - Commission calculations
   - Customer and order statistics

### Frontend
1. **frontend/src/pages/VendorDashboard.jsx**
   - Added analytics tab
   - Key metrics visualization
   - Sales trends and top products
   - Category distribution

2. **frontend/src/pages/AffiliateDashboard.jsx**
   - Complete redesign with tabs
   - Overview and analytics sections
   - Commission tracking
   - Top customers and recent orders

---

## Usage

### Vendor
1. Login as vendor
2. Go to Vendor Dashboard
3. Click "📊 Analytics" tab
4. View:
   - Revenue metrics
   - Sales trends
   - Top products
   - Category distribution
   - Low stock alerts

### Affiliate
1. Login as affiliate
2. Go to Affiliate Dashboard
3. **Overview Tab**: Quick stats and affiliate link
4. **Analytics Tab**: Detailed insights
   - Commission metrics
   - Growth trends
   - Top customers
   - Recent orders

---

## Performance Optimizations
- Data fetched only when tab is active
- Efficient MongoDB aggregations
- Limited results for performance
- Cached calculations
- Optimized queries

---

## Future Enhancements
- Real-time updates with WebSocket
- Date range selector
- Export to PDF/Excel
- More chart types (line, pie)
- Email reports
- Goal tracking
- Predictive analytics
- Comparison with previous periods
- Click tracking for affiliates
- Detailed conversion funnel

---

## Summary

✅ Vendor Analytics: Revenue, sales, products, categories
✅ Affiliate Analytics: Commission, customers, orders, trends
✅ Live data with beautiful visualizations
✅ Responsive design
✅ Loading states
✅ Growth calculations
✅ Top performers tracking
✅ Recent activity monitoring
✅ Low stock alerts (vendor)
✅ Conversion tracking (affiliate)
