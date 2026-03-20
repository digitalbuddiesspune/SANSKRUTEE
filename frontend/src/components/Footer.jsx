import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer>
      {/* Elegant marquee divider — teal bg, gold text */}
      <div className="w-full bg-[#2B6B5A] overflow-hidden select-none border-t border-b border-[#1A4D3F]">
        <div className="h-10 flex items-center">
          <div className="marquee-track">
            <span className="text-xs sm:text-sm font-bold uppercase tracking-[0.08em] text-[#C4A265] whitespace-nowrap">
              {'  ·  SANSKRUTEE  ·  PREMIUM FASHION  ·  SANSKRUTEE  ·  ETHNIC ELEGANCE  ·  SANSKRUTEE  ·  TIMELESS STYLE  '.repeat(2)}
            </span>
          </div>
        </div>
      </div>

      {/* Main footer — deep teal bg */}
      <div className="bg-[#1A2F2A] text-white">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12">
          
          {/* Top section: oversized brand name */}
          <div className="pt-12 sm:pt-16 lg:pt-20 pb-10 sm:pb-14 border-b border-white/10">
            <div className="flex items-center gap-3 mb-6">
              <img
                src="https://res.cloudinary.com/dzd47mpdo/image/upload/v1774001804/copy_of_0bfce75b-bbe6-4982-bc33-57feb8587b8c_531e09.png"
                alt="Logo"
                className="h-8 w-auto object-contain invert"
                style={{ filter: 'invert(1) brightness(2)' }}
              />
              <span className="text-lg font-bold uppercase tracking-[0.1em]">Sanskrutee</span>
            </div>
            <p className="text-sm text-white/50 max-w-md leading-relaxed">
              Your one-stop destination for fashion, watches, and accessories. Shop the latest trends with the best prices.
            </p>
          </div>

          {/* Link columns */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12 py-10 sm:py-14">
            
            {/* Quick Links */}
            <div>
              <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#C4A265] mb-5">Shop</h4>
              <ul className="space-y-3">
                {[
                  { label: "Women's Fashion", path: '/women' },
                  { label: 'Watches', path: '/watches' },
                  { label: 'Eyewear', path: '/lenses' },
                  { label: 'Skincare', path: '/skincare' },
                  { label: 'Shoes', path: '/shoes' },
                ].map(link => (
                  <li key={link.path}>
                    <Link to={link.path} className="text-xs text-white/50 hover:text-white uppercase tracking-wide transition-colors duration-200">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Customer Service */}
            <div>
              <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#C4A265] mb-5">Help</h4>
              <ul className="space-y-3">
                {[
                  { label: 'Contact Us', path: '/contact' },
                  { label: 'FAQ', path: '/faq' },
                  { label: 'Shipping Info', path: '/shipping' },
                  { label: 'Returns', path: '/returns' },
                  { label: 'Track Order', path: '/track-order' },
                  { label: 'Size Guide', path: '/size-guide' },
                ].map(link => (
                  <li key={link.path}>
                    <Link to={link.path} className="text-xs text-white/50 hover:text-white uppercase tracking-wide transition-colors duration-200">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* About */}
            <div>
              <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#C4A265] mb-5">About</h4>
              <ul className="space-y-3">
                {[
                  { label: 'About Brand', path: '/about' },
                  { label: 'Blog', path: '/blog' },
                  { label: 'Careers', path: '/careers' },
                ].map(link => (
                  <li key={link.path}>
                    <Link to={link.path} className="text-xs text-white/50 hover:text-white uppercase tracking-wide transition-colors duration-200">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#C4A265] mb-5">Contact</h4>
              <div className="space-y-3 text-xs text-white/50">
                <a href="mailto:support@sanskruteefashion.in" className="block hover:text-white transition-colors duration-200">
                  support@sanskruteefashion.in
                </a>
                <div className="leading-relaxed">
                  <p>4th Floor, 401, 6-3-862/1</p>
                  <p>Laxmi Nivas, Begumpet</p>
                  <p>Secunderabad, Telangana 500016</p>
                </div>
              </div>

              {/* Social Icons */}
              <div className="flex gap-3 mt-6">
                {['Facebook', 'Twitter', 'Instagram'].map((social) => (
                  <a key={social} href="#" className="w-8 h-8 bg-white/10 hover:bg-[#C4A265] hover:text-[#1A2F2A] text-white/60 flex items-center justify-center transition-all duration-200" aria-label={social}>
                    {social === 'Facebook' && (
                      <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
                    )}
                    {social === 'Twitter' && (
                      <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" /></svg>
                    )}
                    {social === 'Instagram' && (
                      <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>
                    )}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="border-t border-white/10 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-[10px] text-white/30 uppercase tracking-wider text-center md:text-left">
              <p>&copy; 2026 Sanskrutee. All rights reserved.</p>
              <p className="mt-1">STACKSPIRE TECHNOLOGY SOLUTIONS PRIVATE LIMITED &middot; GSTIN: 36ABQCS3170D1Z8</p>
            </div>
            <div className="flex gap-5 text-[10px] text-white/30 uppercase tracking-wider">
              <Link to="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
              <Link to="/terms-of-service" className="hover:text-white transition-colors">Terms of Service</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
