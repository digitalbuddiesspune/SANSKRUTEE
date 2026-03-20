import { Link } from 'react-router-dom';

const ShippingPolicy = () => {
  const getCurrentDate = () => {
    const date = new Date();
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Link to="/" className="text-gray-600 hover:text-gray-900 mb-4 inline-flex items-center text-sm">
            <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Home
          </Link>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">Shipping Policy</h1>
          <p className="text-sm sm:text-base text-gray-600">Last updated: {getCurrentDate()}</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 lg:p-8 space-y-6 sm:space-y-8">
          <section>
            <p className="text-gray-700 leading-relaxed">
              This Shipping Policy explains how <strong>STACKSPIRE TECHNOLOGY SOLUTIONS PRIVATE LIMITED</strong> ("we", "our" or "us") handles shipping and delivery of orders placed for sarees and women's accessories through our website.
            </p>
          </section>

          <section>
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-3 sm:mb-4">1. Serviceable Locations</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              We currently ship orders across most locations in India through our trusted courier partners, subject to serviceability of your PIN code.
            </p>
            <p className="text-gray-700 leading-relaxed">
              If your PIN code is not serviceable, we will contact you to discuss alternatives or process a refund.
            </p>
          </section>

          <section>
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-3 sm:mb-4">2. Order Processing Time</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              After your order and payment are successfully confirmed, we typically take 1–3 business days to process and dispatch your order.
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>Orders are processed Monday to Saturday (excluding holidays).</li>
              <li>Orders placed on Sundays or public holidays are processed on the next working day.</li>
              <li>During sale periods or festive seasons, processing times may be slightly longer.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-3 sm:mb-4">3. Shipping Charges</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              Shipping charges (if applicable) will be clearly displayed at checkout before you confirm your order. Our standard structure is:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li><strong>Standard Shipping:</strong> ₹[X] for orders below ₹[Amount].</li>
              <li><strong>Free Shipping:</strong> for orders above ₹[Amount] (if offered).</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mt-3">
              Replace the placeholder amounts above with your actual shipping fee rules.
            </p>
          </section>

          <section>
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-3 sm:mb-4">4. Estimated Delivery Timelines</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              After dispatch, estimated delivery times are:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li><strong>Metro Cities:</strong> 3–5 business days.</li>
              <li><strong>Other Cities & Towns:</strong> 4–7 business days.</li>
              <li><strong>Remote / Out-of-delivery Areas:</strong> 7–10 business days (subject to courier coverage).</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mt-3">
              Actual delivery may vary due to courier delays, weather, strikes, festivals or other events beyond our control.
            </p>
          </section>

          <section>
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-3 sm:mb-4">5. Order Tracking</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              Once your order is dispatched, you will receive a tracking ID and link via SMS/WhatsApp/email (where available), which you can use to follow your shipment.
            </p>
            <p className="text-gray-700 leading-relaxed">
              If you face any difficulty in tracking, contact us with your order ID and registered mobile number or email.
            </p>
          </section>

          <section>
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-3 sm:mb-4">6. Shipping Address & Contact Details</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              Please ensure your address, PIN code and contact number are correct at the time of placing the order.
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>We are not responsible for delays or non-delivery caused by incorrect or incomplete details.</li>
              <li>Address changes after dispatch may not be possible. For changes before dispatch, please contact us at the earliest.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-3 sm:mb-4">7. Undelivered or Returned Shipments</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              Orders may be returned to us by the courier due to:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>Incorrect or incomplete address.</li>
              <li>Customer unavailable during multiple delivery attempts.</li>
              <li>Customer not reachable on phone.</li>
              <li>Refusal to accept delivery.</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mt-3">
              Once we receive the returned shipment, we will contact you to either:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4 mt-2">
              <li>Re-ship the order (additional shipping charges may apply), or</li>
              <li>Process a refund/store credit as per our Refund & Cancellation Policy.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-3 sm:mb-4">8. Delays Beyond Our Control</h2>
            <p className="text-gray-700 leading-relaxed">
              While we aim for timely delivery, certain events such as natural disasters, strikes, lockdowns, or issues at the courier's end may cause delays. We will coordinate with the courier to expedite delivery wherever possible and request your understanding in such cases.
            </p>
          </section>

          <section>
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-3 sm:mb-4">9. International Shipping</h2>
            <p className="text-gray-700 leading-relaxed">
              Currently, we do not offer international shipping. If we start shipping outside India in future, this section will be updated with applicable terms, duties and taxes.
            </p>
          </section>

          <section>
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-3 sm:mb-4">10. Damaged, Opened or Tampered Packages</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              If you receive a package that appears damaged, tampered or opened:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>Kindly mention this to the delivery person immediately.</li>
              <li>Take clear photos/videos of the package and product and share them with us within 24–48 hours.</li>
              <li>We will review the case as per our Refund & Cancellation Policy and provide a suitable resolution.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-3 sm:mb-4">11. Cash on Delivery (COD)</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              Cash on Delivery (COD) service is [available / not available]. If offered:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>COD eligibility and charges will be shown at checkout.</li>
              <li>Repeated refusal of COD orders may lead to restrictions on future COD availability.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-3 sm:mb-4">12. Changes to This Shipping Policy</h2>
            <p className="text-gray-700 leading-relaxed">
              We may revise this Shipping Policy from time to time. Any updates will be posted on this page with an updated "Last updated" date.
            </p>
          </section>

          <section>
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-3 sm:mb-4">13. Contact Us</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              For questions about shipping or delivery, contact:
            </p>
            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <p className="text-gray-700 font-semibold mb-2"><strong>STACKSPIRE TECHNOLOGY SOLUTIONS PRIVATE LIMITED</strong></p>
              <p className="text-gray-700"><strong>Email:</strong> support@sanskruteefashion.in</p>
              <div className="text-gray-700">
                <p className="font-semibold mb-2">Address:</p>
                <p className="ml-4"><strong>Floor No.:</strong> 4th floor</p>
                <p className="ml-4"><strong>Building No./Flat No.:</strong> 401, 6-3-862/1</p>
                <p className="ml-4"><strong>Road/Street:</strong> Laxmi Nivas</p>
                <p className="ml-4"><strong>Locality/Sub Locality:</strong> Begumpet</p>
                <p className="ml-4"><strong>City/Town/Village:</strong> Secunderabad</p>
                <p className="ml-4"><strong>District:</strong> Medchal Malkajgiri</p>
                <p className="ml-4"><strong>State:</strong> Telangana</p>
                <p className="ml-4"><strong>PIN Code:</strong> 500016</p>
              </div>
              <p className="text-gray-700 mt-3"><strong>GSTIN:</strong> 36ABQCS3170D1Z8</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ShippingPolicy;

