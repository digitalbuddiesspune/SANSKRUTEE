import { Link } from 'react-router-dom';

const About = () => {
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
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">About Us</h1>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 lg:p-8 space-y-6 sm:space-y-8">
          <section>
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-3 sm:mb-4">Company Information</h2>
            <p className="text-[#0F1012] leading-relaxed mb-4">
              <strong>STACKSPIRE TECHNOLOGY SOLUTIONS PRIVATE LIMITED</strong> is committed to providing high-quality sarees and women's accessories through our online platform.
            </p>
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <p className="text-[#0F1012] font-semibold mb-3">Contact Details:</p>
              <p className="text-[#0F1012] mb-2"><strong>Email:</strong> support@sanskruteefashion.in</p>
              <div className="text-[#0F1012] mb-2">
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
              <p className="text-[#0F1012] mt-3"><strong>GSTIN:</strong> 36ABQCS3170D1Z8</p>
            </div>
          </section>

          <section>
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-3 sm:mb-4">Grievance Officer</h2>
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-[#0F1012] mb-2"><strong>Grievance Officer:</strong></p>
              <p className="text-[#0F1012] ml-4">• Prem Kumar Yelubandi (Director, Andhra Pradesh)</p>
              <p className="text-[#0F1012] ml-4">• Sai Durga Prasad Sundrapalli (Director, Andhra Pradesh)</p>
              <p className="text-[#0F1012] mt-3"><strong>Email:</strong> support@sanskruteefashion.in</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default About;

