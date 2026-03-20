import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const GetStarted = () => {
  const navigate = useNavigate();
  const scrollRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Product images for horizontal scroll
  const productImages = [
    'https://res.cloudinary.com/dvkxgrcbv/image/upload/v1767158570/thumb3_fj2lak.jpg',
    'https://res.cloudinary.com/dvkxgrcbv/image/upload/v1767158615/1605072025267-jpg-500x500_szxfo2.jpg',
    'https://res.cloudinary.com/dvkxgrcbv/image/upload/v1767158665/women-in-a-clothing-boutique-2023-11-27-05-27-02-u_rnsjan.jpg',
    'https://res.cloudinary.com/dvkxgrcbv/image/upload/v1767158697/photo-1525845859779-54d477ff291f_m8pu52.jpg',
    'https://res.cloudinary.com/dvkxgrcbv/image/upload/v1767158757/5-must-have-winter-wear-for-women_1100x_rsua6w.jpg',
    'https://res.cloudinary.com/dvkxgrcbv/image/upload/v1767158813/Indian_Saree_2_aa5ox6.jpg',
  ];

  // Text content for each slide
  const slideContent = [
    {
      headline: 'Lights. Camera. Shop!',
      subtitle: 'Dive into your favorite fashion and lifestyle products in seconds.'
    },
    {
      headline: 'Discover Your Style',
      subtitle: 'Explore curated collections designed just for you.'
    },
    {
      headline: 'Shop with Confidence',
      subtitle: 'Quality products delivered right to your doorstep.'
    }
  ];

  // Auto-advance slides
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 3);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-[#1A2F2A] font-sans">
      {/* MOBILE VIEW */}
      <div className="lg:hidden min-h-screen flex flex-col">
        {/* Top Section - Product Posters in Single Line */}
        <div className="pt-12 pb-6">
          {/* Horizontal Scrollable Posters */}
          <div 
            ref={scrollRef}
            className="flex gap-3 overflow-x-auto scrollbar-hide px-4"
            style={{ scrollSnapType: 'x mandatory' }}
          >
            {productImages.map((img, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-32 h-48 rounded-lg overflow-hidden shadow-lg"
                style={{ scrollSnapAlign: 'start' }}
              >
                <img
                  src={img}
                  alt={`Product ${index + 1}`}
                  className="w-full h-full object-cover"
                  style={{ objectFit: 'cover' }}
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/128x192/2B6B5A/F5F0E8?text=Product';
                  }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Middle Section - Text and Navigation Dots */}
        <div className="px-6 py-6 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3 transition-opacity duration-500">
            {slideContent[currentSlide].headline}
          </h1>
          <p className="text-white/80 text-sm sm:text-base mb-6 transition-opacity duration-500">
            {slideContent[currentSlide].subtitle}
          </p>
          
          {/* Navigation Dots */}
          <div className="flex justify-center gap-2 mb-8">
            {[0, 1, 2].map((index) => (
              <div
                key={index}
                className={`h-1 transition-all rounded-full ${
                  index === currentSlide
                    ? 'w-8 bg-white'
                    : 'w-2 bg-white/40'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Bottom Section - Buttons */}
        <div className="px-6 pb-8 space-y-4">
          <button
            onClick={() => navigate('/signup')}
            className="w-full py-4 bg-[#2B6B5A] hover:bg-[#1A4D3F] text-white font-bold text-lg rounded-lg transition-colors shadow-lg"
          >
            SIGN UP
          </button>
          <button
            onClick={() => navigate('/login')}
            className="w-full py-4 bg-[#1A2F2A] hover:bg-[#142822] text-white font-bold text-lg rounded-lg transition-colors"
          >
            LOG IN
          </button>
        </div>
      </div>

      {/* DESKTOP VIEW */}
      <div className="hidden lg:flex min-h-screen bg-[#1A2F2A]">
        <div className="max-w-6xl mx-auto w-full flex flex-col justify-center items-center px-8 py-12">
          {/* Product Images in Single Horizontal Line */}
          <div className="w-full mb-12 overflow-x-auto scrollbar-hide">
            <div className="flex gap-4 justify-center">
              {productImages.map((img, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 w-48 h-72 rounded-lg overflow-hidden shadow-2xl"
                >
                  <img
                    src={img}
                    alt={`Product ${index + 1}`}
                    className="w-full h-full object-cover"
                    style={{ objectFit: 'cover' }}
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/192x288/2B6B5A/F5F0E8?text=Product';
                    }}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Text Section */}
          <div className="text-center mb-8">
            <h1 className="text-5xl font-bold text-white mb-4 transition-opacity duration-500">
              {slideContent[currentSlide].headline}
            </h1>
            <p className="text-white/80 text-lg mb-8 transition-opacity duration-500">
              {slideContent[currentSlide].subtitle}
            </p>
            
            {/* Navigation Dots */}
            <div className="flex justify-center gap-2 mb-8">
              {[0, 1, 2].map((index) => (
                <div
                  key={index}
                  className={`h-1 transition-all rounded-full ${
                    index === currentSlide
                      ? 'w-8 bg-white'
                      : 'w-2 bg-white/40'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-4 w-full max-w-md">
            <button
              onClick={() => navigate('/signup')}
              className="flex-1 py-4 bg-[#2B6B5A] hover:bg-[#1A4D3F] text-white font-bold text-lg rounded-lg transition-colors shadow-lg"
            >
              SIGN UP
            </button>
            <button
              onClick={() => navigate('/login')}
              className="flex-1 py-4 bg-[#1A2F2A] hover:bg-[#142822] text-white font-bold text-lg rounded-lg transition-colors"
            >
              LOG IN
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GetStarted;

