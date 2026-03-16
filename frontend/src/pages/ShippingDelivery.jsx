import { Link } from 'react-router-dom'
import { Truck, ArrowLeft } from 'lucide-react'

const ShippingDelivery = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-green-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <Link to="/" className="inline-flex items-center gap-2 text-green-600 hover:text-green-700 mb-6 font-semibold">
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>

        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
              <Truck className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-black text-gray-900">Shipping & Delivery</h1>
              <p className="text-gray-600 mt-1">Fast and reliable delivery to your doorstep</p>
            </div>
          </div>

          <div className="prose prose-green max-w-none space-y-6">
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Shipping Methods</h2>
              <p className="text-gray-700 leading-relaxed mb-3">
                We offer multiple shipping options to meet your needs:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                <li><strong>Standard Shipping:</strong> 5-7 business days</li>
                <li><strong>Express Shipping:</strong> 2-3 business days</li>
                <li><strong>Next Day Delivery:</strong> Available in select cities</li>
                <li><strong>Free Shipping:</strong> On orders above ₹999</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Shipping Charges</h2>
              <div className="bg-green-50 border-2 border-green-200 rounded-xl p-6">
                <table className="w-full text-gray-700">
                  <thead>
                    <tr className="border-b-2 border-green-200">
                      <th className="text-left py-2">Order Value</th>
                      <th className="text-left py-2">Shipping Charge</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-green-100">
                      <td className="py-2">Below ₹499</td>
                      <td className="py-2">₹99</td>
                    </tr>
                    <tr className="border-b border-green-100">
                      <td className="py-2">₹499 - ₹999</td>
                      <td className="py-2">₹49</td>
                    </tr>
                    <tr>
                      <td className="py-2">Above ₹999</td>
                      <td className="py-2 font-bold text-green-600">FREE</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Delivery Timeline</h2>
              <p className="text-gray-700 leading-relaxed">
                Orders are processed within 1-2 business days. Delivery time starts from the date of shipment, not the order date. Delivery times may vary based on your location and product availability.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Order Tracking</h2>
              <p className="text-gray-700 leading-relaxed">
                Once your order is shipped, you will receive a tracking number via email and SMS. You can track your order status in real-time through our website or the courier partner's website.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Delivery Areas</h2>
              <p className="text-gray-700 leading-relaxed">
                We currently deliver across India. Some remote areas may have extended delivery times. We will notify you if your area falls under this category.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Failed Delivery Attempts</h2>
              <p className="text-gray-700 leading-relaxed mb-3">
                If delivery fails due to:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                <li>Incorrect address provided</li>
                <li>Recipient unavailable</li>
                <li>Refusal to accept delivery</li>
              </ul>
              <p className="text-gray-700 leading-relaxed mt-3">
                The courier will make up to 3 delivery attempts. After that, the order will be returned to us, and you may be charged for return shipping.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">7. International Shipping</h2>
              <p className="text-gray-700 leading-relaxed">
                Currently, we only ship within India. International shipping will be available soon.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Contact for Shipping Issues</h2>
              <p className="text-gray-700 leading-relaxed">
                For any shipping-related queries or issues, please contact our customer support through the Contact page.
              </p>
            </section>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-200">
            <p className="text-center text-gray-600">
              We strive to deliver your orders as quickly and safely as possible.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ShippingDelivery
