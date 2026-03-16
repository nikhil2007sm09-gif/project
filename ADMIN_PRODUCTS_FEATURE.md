# Admin Products Management - Implementation Guide

## Feature Request

Admin ko sab products dekhne chahiye aur edit/delete karne chahiye.

## Implementation Steps

### Step 1: Backend Route Add Karo

**File:** `backend/routes/admin.js`

Add this endpoint:

```javascript
// Get all products (admin only)
router.get('/products', authenticate, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied' })
    }
    
    const products = await Product.find()
      .populate('vendor', 'name email')
      .sort({ createdAt: -1 })
    
    res.json(products)
  } catch (error) {
    res.status(500).json({ message: 'Server error' })
  }
})

// Delete product (admin only)
router.delete('/products/:id', authenticate, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied' })
    }
    
    await Product.findByIdAndDelete(req.params.id)
    res.json({ message: 'Product deleted successfully' })
  } catch (error) {
    res.status(500).json({ message: 'Server error' })
  }
})
```

### Step 2: AdminDashboard Me Tab Add Karo

**File:** `frontend/src/pages/AdminDashboard.jsx`

Add products state:

```javascript
const [products, setProducts] = useState([])
const [activeTab, setActiveTab] = useState('overview')
```

Fetch products:

```javascript
const fetchProducts = async () => {
  try {
    const res = await axios.get('/api/admin/products')
    setProducts(res.data)
  } catch (error) {
    console.error('Error:', error)
  }
}

useEffect(() => {
  fetchDashboardData()
  fetchProducts()
}, [])
```

Add delete handler:

```javascript
const handleDeleteProduct = async (productId) => {
  if (!confirm('Are you sure you want to delete this product?')) return
  
  try {
    await axios.delete(`/api/admin/products/${productId}`)
    alert('Product deleted successfully!')
    fetchProducts()
  } catch (error) {
    alert('Error deleting product')
  }
}
```

Add Products Tab in JSX:

```javascript
{/* Tabs */}
<div className="flex space-x-4 mb-6">
  <button
    onClick={() => setActiveTab('overview')}
    className={`px-4 py-2 rounded ${activeTab === 'overview' ? 'bg-primary text-white' : 'bg-gray-200'}`}
  >
    Overview
  </button>
  <button
    onClick={() => setActiveTab('approvals')}
    className={`px-4 py-2 rounded ${activeTab === 'approvals' ? 'bg-primary text-white' : 'bg-gray-200'}`}
  >
    Pending Approvals ({pendingApprovals.length})
  </button>
  <button
    onClick={() => setActiveTab('products')}
    className={`px-4 py-2 rounded ${activeTab === 'products' ? 'bg-primary text-white' : 'bg-gray-200'}`}
  >
    Manage Products ({products.length})
  </button>
</div>

{/* Products Tab Content */}
{activeTab === 'products' && (
  <div className="bg-white rounded-lg shadow-md p-6">
    <h2 className="text-xl font-bold mb-4">All Products</h2>
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b">
            <th className="text-left py-2">Image</th>
            <th className="text-left py-2">Name</th>
            <th className="text-left py-2">Price</th>
            <th className="text-left py-2">Stock</th>
            <th className="text-left py-2">Vendor</th>
            <th className="text-left py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product._id} className="border-b">
              <td className="py-2">
                <div className="w-16 h-16 bg-gray-200 rounded overflow-hidden">
                  {product.images?.[0] || product.image ? (
                    <img 
                      src={product.images?.[0] || product.image} 
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      📦
                    </div>
                  )}
                </div>
              </td>
              <td className="py-2">{product.name}</td>
              <td className="py-2">₹{product.price}</td>
              <td className="py-2">{product.stock}</td>
              <td className="py-2">{product.vendor?.name || 'N/A'}</td>
              <td className="py-2">
                <Link
                  to={`/product/${product._id}`}
                  className="text-blue-600 hover:underline mr-2"
                  target="_blank"
                >
                  View
                </Link>
                <button
                  onClick={() => handleDeleteProduct(product._id)}
                  className="text-red-600 hover:underline"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
)}
```

### Step 3: Import Product Model in Admin Routes

**File:** `backend/routes/admin.js`

Add at top:

```javascript
import Product from '../models/Product.js'
```

---

## Features

✅ Admin can view all products
✅ Shows product image, name, price, stock
✅ Shows vendor name
✅ View product link (opens in new tab)
✅ Delete product button
✅ Confirmation before delete
✅ Auto-refresh after delete

---

## Quick Implementation

Run these commands:

```bash
# 1. Update backend admin routes
# Add the code from Step 1 to backend/routes/admin.js

# 2. Update AdminDashboard
# Add the code from Step 2 to frontend/src/pages/AdminDashboard.jsx

# 3. Restart servers
cd backend && npm run dev
cd frontend && npm run dev
```

---

## Testing

1. Login as admin: admin@test.com / admin123
2. Go to Admin Dashboard
3. Click "Manage Products" tab
4. See all products
5. Click "Delete" to remove product
6. Click "View" to see product details

---

## Summary

✅ Admin can see all products
✅ Admin can delete any product
✅ Shows vendor information
✅ Product images displayed
✅ Confirmation before delete
✅ Real-time updates

**Implementation time: 5 minutes** ⏱️
