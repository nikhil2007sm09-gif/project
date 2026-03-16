import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white mt-12">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">ClothesShop</h3>
            <p className="text-gray-400">Best quality clothes at affordable prices</p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/products" className="text-gray-400 hover:text-white">Products</Link></li>
              <li><Link to="/about" className="text-gray-400 hover:text-white">About Us</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-white">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Policies</h4>
            <ul className="space-y-2">
              <li><Link to="/terms-conditions" className="text-gray-400 hover:text-white">Terms & Conditions</Link></li>
              <li><Link to="/privacy-policy" className="text-gray-400 hover:text-white">Privacy Policy</Link></li>
              <li><Link to="/shipping-delivery" className="text-gray-400 hover:text-white">Shipping & Delivery</Link></li>
              <li><Link to="/cancellation-refund" className="text-gray-400 hover:text-white">Cancellation & Refund</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">For Business</h4>
            <ul className="space-y-2 mb-4">
              <li><Link to="/vendor/login" className="text-gray-400 hover:text-white">Vendor Login</Link></li>
              <li><Link to="/affiliate/login" className="text-gray-400 hover:text-white">Affiliate Login</Link></li>
            </ul>
            <h4 className="font-semibold mb-2 mt-4">Contact</h4>
            <p className="text-gray-400 text-sm">Email: nikhil2007sm09@gmail.com</p>
            <p className="text-gray-400 text-sm">Phone: 7988454150</p>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2026 ClothesShop. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
