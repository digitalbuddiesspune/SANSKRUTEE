import { Link } from 'react-router-dom';

const ContactUs = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8 sm:py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back to Home Link */}
        <div className="mb-6">
          <Link to="/" className="text-gray-600 hover:text-gray-900 inline-flex items-center text-sm transition-colors">
            <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Home
          </Link>
        </div>

        {/* Header Section */}
        <div className="text-center mb-10 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 tracking-tight">
            CONTACT US
          </h1>
          <div className="flex justify-center mb-4">
            <div className="w-20 h-0.5 bg-gradient-to-r from-amber-400 to-amber-600"></div>
          </div>
          <p className="text-base sm:text-lg text-gray-600 italic">
            We'd love to hear from you
          </p>
        </div>

        {/* Get in Touch Section */}
        <div className="text-center mb-8 sm:mb-10">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">
            GET IN TOUCH
          </h2>
          <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Have a question about our sarees or need assistance with your order? We're here to help! Reach out to us and we'll respond as soon as possible.
          </p>
        </div>

        {/* Contact Information Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 mb-6">
          {/* Email Card */}
          <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-5 sm:p-6 border border-gray-200">
            <div className="flex items-start">
              <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center mr-3 sm:mr-4">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">Email</h3>
                <a 
                  href="mailto:support@sanskruteefashion.in" 
                  className="text-sm sm:text-base text-gray-600 hover:text-blue-600 transition-colors break-all"
                >
                  support@sanskruteefashion.in
                </a>
              </div>
            </div>
          </div>

          {/* Address Card */}
          <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-5 sm:p-6 border border-gray-200">
            <div className="flex items-start">
              <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-gradient-to-br from-pink-500 to-pink-600 flex items-center justify-center mr-3 sm:mr-4">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2 sm:mb-3">Address</h3>
                <div className="text-xs sm:text-sm text-gray-600 space-y-0.5 sm:space-y-1">
                  <p><strong className="text-gray-800">Floor No.:</strong> 4th floor</p>
                  <p><strong className="text-gray-800">Building No./Flat No.:</strong> 401, 6-3-862/1</p>
                  <p><strong className="text-gray-800">Road/Street:</strong> Laxmi Nivas</p>
                  <p><strong className="text-gray-800">Locality/Sub Locality:</strong> Begumpet</p>
                  <p><strong className="text-gray-800">City/Town/Village:</strong> Secunderabad</p>
                  <p><strong className="text-gray-800">District:</strong> Medchal Malkajgiri</p>
                  <p><strong className="text-gray-800">State:</strong> Telangana</p>
                  <p><strong className="text-gray-800">PIN Code:</strong> 500016</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* GSTIN and Company Info */}
        <div className="bg-white rounded-lg shadow-md p-5 sm:p-6 border border-gray-200">
          <div className="text-center space-y-3">
            <div>
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">GSTIN</h3>
              <p className="text-lg sm:text-xl font-mono font-semibold text-gray-800">36ABQCS3170D1Z8</p>
            </div>
            <div className="pt-3 border-t border-gray-200">
              <p className="text-sm sm:text-base text-gray-700 font-semibold">
                <strong>STACKSPIRE TECHNOLOGY SOLUTIONS PRIVATE LIMITED</strong>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
