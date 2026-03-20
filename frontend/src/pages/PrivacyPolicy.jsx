import { Link } from 'react-router-dom';

const PrivacyPolicy = () => {
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
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">Privacy Policy</h1>
          <p className="text-sm sm:text-base text-gray-600">Version 1.0 • Last updated: {getCurrentDate()}</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 lg:p-8 space-y-6 sm:space-y-8">
          <section>
            <p className="text-gray-700 leading-relaxed">
              This Privacy Policy explains how <strong>STACKSPIRE TECHNOLOGY SOLUTIONS PRIVATE LIMITED</strong> ("we", "our" or "us") collects, uses, shares and protects your information when you browse or shop for our sarees and women's accessories through our website (the "Service").
            </p>
          </section>

          <section>
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-3 sm:mb-4">At a Glance – What This Policy Covers</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>What personal and technical data we collect.</li>
              <li>How we use your data to process orders and improve our store.</li>
              <li>How cookies, payments and analytics work on our site.</li>
              <li>When we share data with trusted partners (couriers, gateways, etc.).</li>
              <li>Your rights to access, correct or delete your data.</li>
              <li>How to contact our Grievance Officer for privacy concerns.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-3 sm:mb-4">1. Introduction</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              By accessing or using our website, you agree to the collection and use of your information in accordance with this Privacy Policy. If you do not agree with any part of this Policy, please discontinue use of our website and services.
            </p>
            <p className="text-gray-700 leading-relaxed">
              This Policy applies to all users of our website, including visitors, registered customers and anyone who interacts with us through contact forms, WhatsApp, email or social media.
            </p>
          </section>

          <section>
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-3 sm:mb-4">2. Information We Collect</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              We collect the following categories of information:
            </p>
            <div className="space-y-3">
              <div>
                <p className="text-gray-700 leading-relaxed font-semibold">Personal Information:</p>
                <p className="text-gray-700 leading-relaxed ml-4">Name, email address, phone number, shipping/billing address and other details provided during checkout or account creation.</p>
              </div>
              <div>
                <p className="text-gray-700 leading-relaxed font-semibold">Order & Transaction Information:</p>
                <p className="text-gray-700 leading-relaxed ml-4">Products purchased (sarees and accessories), order history, payment method used and transaction identifiers. Card details are processed securely by our payment gateway; we do not store your full card information.</p>
              </div>
              <div>
                <p className="text-gray-700 leading-relaxed font-semibold">Account Information:</p>
                <p className="text-gray-700 leading-relaxed ml-4">Username, password, preferences, saved addresses and wishlist items (if you create an account).</p>
              </div>
              <div>
                <p className="text-gray-700 leading-relaxed font-semibold">Usage Data:</p>
                <p className="text-gray-700 leading-relaxed ml-4">Pages visited, time spent, clicked links and other analytical data regarding how you use our website.</p>
              </div>
              <div>
                <p className="text-gray-700 leading-relaxed font-semibold">Device & Technical Data:</p>
                <p className="text-gray-700 leading-relaxed ml-4">IP address, browser type, device type, operating system and similar technical information.</p>
              </div>
              <div>
                <p className="text-gray-700 leading-relaxed font-semibold">Communication Data:</p>
                <p className="text-gray-700 leading-relaxed ml-4">Messages, reviews, queries or feedback you send via forms, email, WhatsApp or social media.</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-3 sm:mb-4">3. How We Use Your Information</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              We use your information for the following purposes:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>To process, confirm and deliver your orders.</li>
              <li>To manage your account, order history and preferences.</li>
              <li>To communicate with you regarding orders, deliveries, returns and support.</li>
              <li>To send you offers, new collections and styling updates (only if you have opted in).</li>
              <li>To improve our website design, product catalogue and user experience using analytics and feedback.</li>
              <li>To prevent fraud, abuse or security threats to our systems.</li>
              <li>To comply with legal, tax and regulatory obligations.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-3 sm:mb-4">4. Legal Basis for Processing (Where Applicable)</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              Depending on your jurisdiction, we may rely on the following legal bases:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>Your consent (e.g., for marketing communications).</li>
              <li>Performance of a contract (to fulfil your order).</li>
              <li>Compliance with legal obligations.</li>
              <li>Our legitimate interests (improving services, preventing fraud).</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-3 sm:mb-4">5. Cookies and Tracking Technologies</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              We use cookies and similar technologies to enhance and personalise your shopping experience. Cookies help us:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>Remember your cart items and login sessions.</li>
              <li>Show recently viewed sarees and accessory suggestions.</li>
              <li>Measure website performance and fix issues.</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mt-3">
              You can control cookies from your browser settings. Some features of the website may not work properly if cookies are disabled.
            </p>
          </section>

          <section>
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-3 sm:mb-4">6. Payment Information & Security</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              Online payments made on our website are processed through secure, reputable payment gateway partners that use industry-standard encryption and security certifications. Your full payment card details are not stored on our servers.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Please do not share your OTP, CVV or net-banking credentials with anyone, including anyone claiming to be from our support team.
            </p>
          </section>

          <section>
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-3 sm:mb-4">7. How We Share Your Information</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              We do not sell your personal information. We may share your data only with:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li><strong>Payment gateways & banks</strong> – to securely process your payments.</li>
              <li><strong>Courier & logistics partners</strong> – to deliver your orders to your address.</li>
              <li><strong>Technology & hosting providers</strong> – for website hosting, storage, analytics and communication tools.</li>
              <li><strong>Marketing & analytics tools</strong> – to understand usage and improve our offerings, where permitted by law.</li>
              <li><strong>Legal or regulatory authorities</strong> – when required to comply with obligations or protect our rights, property or safety.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-3 sm:mb-4">8. Data Security</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              We implement reasonable technical and organisational measures to protect your personal data from unauthorised access, alteration, disclosure or destruction.
            </p>
            <p className="text-gray-700 leading-relaxed">
              However, no method of transmission over the Internet or electronic storage is completely secure, and we cannot guarantee absolute security.
            </p>
          </section>

          <section>
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-3 sm:mb-4">9. Data Retention</h2>
            <p className="text-gray-700 leading-relaxed">
              We retain your information for as long as necessary to fulfil the purposes outlined in this Policy, including order fulfilment, accounting, tax and legal requirements. Order and transaction records may be retained for longer periods as required by law.
            </p>
          </section>

          <section>
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-3 sm:mb-4">10. Your Rights and Choices</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              Subject to applicable law, you may have the right to:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>Access the personal data we hold about you.</li>
              <li>Request correction of inaccurate or incomplete data.</li>
              <li>Request deletion of your data, subject to legal and contractual limitations.</li>
              <li>Object to or restrict certain types of processing.</li>
              <li>Withdraw consent where processing is based on consent.</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mt-3">
              To exercise these rights, please contact us using the details provided below. We may need to verify your identity before responding.
            </p>
          </section>

          <section>
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-3 sm:mb-4">11. Children's Privacy</h2>
            <p className="text-gray-700 leading-relaxed">
              Our website and services are intended for individuals who are at least 18 years of age. We do not knowingly collect personal information from children under 18. If you believe that a child has provided us with personal data, please contact us so that we can delete such information.
            </p>
          </section>

          <section>
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-3 sm:mb-4">12. Third-Party Websites and Services</h2>
            <p className="text-gray-700 leading-relaxed">
              Our website may contain links to third-party websites or services such as social media platforms and payment gateways. We are not responsible for the privacy practices or content of these external sites. We encourage you to review their privacy policies before sharing any personal information with them.
            </p>
          </section>

          <section>
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-3 sm:mb-4">13. International Data Transfers</h2>
            <p className="text-gray-700 leading-relaxed">
              Your information may be transferred to and stored on servers located outside your state or country, where data-protection laws may differ. By using our website, you consent to such transfers in accordance with this Privacy Policy.
            </p>
          </section>

          <section>
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-3 sm:mb-4">14. Grievance Officer & Data Protection Queries</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              In accordance with applicable Indian data-protection regulations, you may contact our Grievance Officer for concerns, complaints or queries relating to your personal data or this Privacy Policy.
            </p>
            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <p className="text-gray-700 mb-2"><strong>Grievance Officer:</strong></p>
              <p className="text-gray-700 ml-4">• Prem Kumar Yelubandi (Director, Andhra Pradesh)</p>
              <p className="text-gray-700 ml-4">• Sai Durga Prasad Sundrapalli (Director, Andhra Pradesh)</p>
              <p className="text-gray-700 mt-3"><strong>Email:</strong> support@sanskruteefashion.in</p>
            </div>
          </section>

          <section>
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-3 sm:mb-4">15. Changes to This Privacy Policy</h2>
            <p className="text-gray-700 leading-relaxed">
              We may update this Privacy Policy from time to time to reflect changes in our practices, legal requirements or operational needs. Any changes will be posted on this page with an updated "Last updated" date. We encourage you to review this Policy periodically.
            </p>
          </section>

          <section>
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-3 sm:mb-4">16. Contact Us</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              If you have any questions or concerns regarding this Privacy Policy or your personal information, you may contact us at:
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
              <p className="text-gray-700"><strong>GSTIN:</strong> 36ABQCS3170D1Z8</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;

