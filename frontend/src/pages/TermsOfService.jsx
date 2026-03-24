import { Link } from 'react-router-dom';

const TermsOfService = () => {
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
          <Link to="/" className="text-[#0F1012] hover:text-gray-900 mb-4 inline-flex items-center text-sm">
            <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Home
          </Link>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">Terms & Conditions</h1>
          <p className="text-sm sm:text-base text-[#0F1012]">Last updated: {getCurrentDate()}</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 lg:p-8 space-y-6 sm:space-y-8">
          <section>
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-3 sm:mb-4">1. Introduction</h2>
            <p className="text-[#0F1012] leading-relaxed">
              These Terms & Conditions ("Terms") govern your use of the website and services offered by <strong>STACKSPIRE TECHNOLOGY SOLUTIONS PRIVATE LIMITED</strong>("we", "our", "us"). By accessing or purchasing from our website, you agree to be bound by these Terms. If you do not agree, please do not use our website.
            </p>
          </section>

          <section>
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-3 sm:mb-4">2. Eligibility</h2>
            <p className="text-[#0F1012] leading-relaxed">
              You must be at least 18 years of age and capable of entering into a legally binding contract under applicable law to place orders on our website.
            </p>
          </section>

          <section>
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-3 sm:mb-4">3. Products, Availability & Pricing</h2>
            <ul className="list-disc list-inside space-y-2 text-[#0F1012] ml-4">
              <li>We sell sarees and women's accessories. Product images are for reference; slight colour or texture variations may occur.</li>
              <li>Prices are listed in Indian Rupees (INR) and are subject to change at any time without prior notice.</li>
              <li>Acceptance of your order is subject to product availability and successful payment confirmation.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-3 sm:mb-4">4. Orders & Payments</h2>
            <ul className="list-disc list-inside space-y-2 text-[#0F1012] ml-4">
              <li>When you place an order, you agree that all information provided is accurate and complete.</li>
              <li>We reserve the right to cancel any order in case of pricing errors, suspected fraud or other legitimate reasons. Any amount charged will be refunded in such cases.</li>
              <li>Payments must be made via the methods listed at checkout (UPI/cards/net banking/wallets etc.).</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-3 sm:mb-4">5. Shipping & Delivery</h2>
            <p className="text-[#0F1012] leading-relaxed">
              Shipping timelines, charges and delivery conditions are governed by our Shipping Policy. By placing an order, you agree to those terms as well.
            </p>
          </section>

          <section>
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-3 sm:mb-4">6. Returns, Refunds & Cancellations</h2>
            <p className="text-[#0F1012] leading-relaxed">
              All requests for returns, exchanges, refunds or cancellations are handled in accordance with our Refund & Cancellation Policy.
            </p>
          </section>

          <section>
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-3 sm:mb-4">7. User Responsibilities</h2>
            <ul className="list-disc list-inside space-y-2 text-[#0F1012] ml-4">
              <li>Do not use the website for any unlawful or fraudulent purpose.</li>
              <li>Do not attempt to gain unauthorised access to our systems.</li>
              <li>Do not post or transmit any defamatory, abusive, obscene or harmful content.</li>
              <li>Do not resell our products commercially without written permission.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-3 sm:mb-4">8. Intellectual Property</h2>
            <p className="text-[#0F1012] leading-relaxed">
              All content on the website including logos, product photos, designs, text, graphics and layout is the property of <strong>STACKSPIRE TECHNOLOGY SOLUTIONS PRIVATE LIMITED</strong> or its licensors and is protected by applicable copyright and trademark laws. Unauthorised use, reproduction or distribution is strictly prohibited.
            </p>
          </section>

          <section>
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-3 sm:mb-4">9. Limitation of Liability</h2>
            <p className="text-[#0F1012] leading-relaxed">
              To the maximum extent permitted by law, we shall not be liable for any indirect, incidental, special or consequential damages arising out of your use of the website or purchase of products, including but not limited to loss due to courier delays, minor colour variations, improper washing or misuse of products.
            </p>
          </section>

          <section>
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-3 sm:mb-4">10. Fraud Prevention</h2>
            <p className="text-[#0F1012] leading-relaxed">
              We reserve the right to cancel orders, block accounts or refuse service in cases of suspected fraud, repeated COD refusals or policy abuse.
            </p>
          </section>

          <section>
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-3 sm:mb-4">11. Third-Party Links</h2>
            <p className="text-[#0F1012] leading-relaxed">
              Our website may contain links to third-party sites such as social media platforms and payment gateways. We are not responsible for the content, privacy practices or terms of those websites.
            </p>
          </section>

          <section>
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-3 sm:mb-4">12. Changes to These Terms</h2>
            <p className="text-[#0F1012] leading-relaxed">
              We may modify these Terms from time to time. Updated Terms will be posted on this page. Continued use of the website after such changes constitutes your acceptance of the revised Terms.
            </p>
          </section>

          <section>
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-3 sm:mb-4">13. Governing Law & Jurisdiction</h2>
            <p className="text-[#0F1012] leading-relaxed">
              These Terms are governed by the laws of India. Any disputes shall be subject to the exclusive jurisdiction of the courts at Rajkot, Gujarat.
            </p>
          </section>

          <section>
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-3 sm:mb-4">14. Grievance Officer & Data Protection Queries</h2>
            <p className="text-[#0F1012] leading-relaxed mb-3">
              In accordance with applicable Indian data-protection regulations, you may contact our Grievance Officer for concerns, complaints or queries relating to your personal data or these Terms.
            </p>
            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <p className="text-[#0F1012] mb-2"><strong>Grievance Officer:</strong></p>
              <p className="text-[#0F1012] ml-4">• Prem Kumar Yelubandi (Director, Andhra Pradesh)</p>
              <p className="text-[#0F1012] ml-4">• Sai Durga Prasad Sundrapalli (Director, Andhra Pradesh)</p>
              <p className="text-[#0F1012] mt-3"><strong>Email:</strong> support@sanskruteefashion.in</p>
            </div>
          </section>

          <section>
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-3 sm:mb-4">15. Contact Us</h2>
            <p className="text-[#0F1012] leading-relaxed mb-3">
              For any queries regarding these Terms, contact:
            </p>
            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <p className="text-[#0F1012] font-semibold mb-2"><strong>STACKSPIRE TECHNOLOGY SOLUTIONS PRIVATE LIMITED</strong></p>
              <p className="text-[#0F1012]"><strong>Email:</strong> support@sanskruteefashion.in</p>
              <div className="text-[#0F1012]">
                <p className="font-semibold">Address
                Floor No.: 4th floor
                Building No./Flat No.: 401, 6-3-862/1
                Road/Street: Laxmi Nivas
                Locality/Sub Locality: Begumpet
                City/Town/Village: Secunderabad
                District: Medchal Malkajgiri
                State: Telangana</p>
                <p className="ml-4 pb-2"><strong>PIN Code:</strong> 500016</p> 
              </div> 
              <p className="text-[#0F1012]"><strong>GSTIN:</strong> 36ABQCS3170D1Z8</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;

