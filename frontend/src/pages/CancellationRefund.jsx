import { Link } from 'react-router-dom'
import { RefreshCw, ArrowLeft } from 'lucide-react'

const CancellationRefund = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-orange-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <Link to="/" className="inline-flex items-center gap-2 text-orange-600 hover:text-orange-700 mb-6 font-semibold">
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>

        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
              <RefreshCw className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-black text-gray-900">Cancellation & Refund</h1>
              <p className="text-gray-600 mt-1">Easy cancellation and hassle-free refunds</p>
            </div>
          </div>

          <div className="prose prose-orange max-w-none space-y-6">
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Order Cancellation</h2>
              <p className="text-gray-700 leading-relaxed mb-3">
                You can cancel your order under the following conditions:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                <li>Order can be cancelled before it is shipped</li>
                <li>Cancellation is free of charge if done within 24 hours of placing the order</li>
                <li>Once shipped, cancellation is not possible (but you can return the product)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">2. How to Cancel</h2>
              <div className="bg-orange-50 border-2 border-orange-200 rounded-xl p-6">
                <ol className="list-decimal list-inside text-gray-700 space-y-3">
                  <li>Log in to your account</li>
                  <li>Go to "My Orders" section</li>
                  <li>Select the order you want to cancel</li>
                  <li>Click on "Cancel Order" button</li>
                  <li>Select cancellation reason and confirm</li>
                </ol>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Return Policy</h2>
              <p className="text-gray-700 leading-relaxed mb-3">
                We accept returns within 7 days of delivery for the following reasons:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                <li>Product received is damaged or defective</li>
                <li>Wrong product delivered</li>
                <li>Product does not match description</li>
                <li>Size or color mismatch</li>
              </ul>
              <p className="text-gray-700 leading-relaxed mt-3">
                <strong>Note:</strong> Product must be unused, unwashed, and in original packaging with all tags intact.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Non-Returnable Items</h2>
              <p className="text-gray-700 leading-relaxed mb-3">
                The following items cannot be returned:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                <li>Innerwear and lingerie</li>
                <li>Cosmetics and personal care items</li>
                <li>Products marked as "non-returnable"</li>
                <li>Items on sale or clearance (unless defective)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Refund Process</h2>
              <p className="text-gray-700 leading-relaxed mb-3">
                Refunds will be processed as follows:
              </p>
              <div className="bg-orange-50 border-2 border-orange-200 rounded-xl p-6 space-y-3">
                <div>
                  <p className="font-bold text-gray-800">Online Payment (Card/UPI/Wallet):</p>
                  <p className="text-gray-700">Refund to original payment method within 5-7 business days</p>
                </div>
                <div>
                  <p className="font-bold text-gray-800">Cash on Delivery:</p>
                  <p className="text-gray-700">Refund via bank transfer within 7-10 business days (bank details required)</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Return Shipping</h2>
              <p className="text-gray-700 leading-relaxed">
                For defective or wrong products, we will arrange free pickup. For other returns, return shipping charges may apply and will be deducted from your refund amount.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Exchange Policy</h2>
              <p className="text-gray-700 leading-relaxed">
                We offer size/color exchange within 7 days of delivery, subject to availability. Exchange is free for the first time. Subsequent exchanges may incur shipping charges.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Refund Timeline</h2>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                <li>Cancellation before shipment: Instant refund initiation</li>
                <li>Return after delivery: Refund initiated after quality check (2-3 days)</li>
                <li>Bank processing time: 5-7 business days</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Contact Support</h2>
              <p className="text-gray-700 leading-relaxed">
                For any cancellation or refund queries, please contact our customer support through the Contact page or email us with your order details.
              </p>
            </section>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-200">
            <p className="text-center text-gray-600">
              Your satisfaction is our priority. We make returns and refunds as easy as possible.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CancellationRefund
