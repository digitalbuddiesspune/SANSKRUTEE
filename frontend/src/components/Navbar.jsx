import { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import CartSidebar from './CartSidebar';

const NAV_LINKS = [
  { 
    id: 'women', 
    label: 'New Collection', 
    path: '/women', 
    subItems: [
      { name: 'Shirts', path: '/women/shirt' },
      { name: 'T-Shirts', path: '/women/tshirt' },
      { name: 'Jeans', path: '/women/jeans' },
      { name: 'Trousers', path: '/women/trousers' },
      { name: 'Saree', path: '/women/saree' },
    ] 
  },
  { 
    id: 'watches', 
    label: 'Watches', 
    path: '/watches'
  },
  { 
    id: 'lenses', 
    label: 'Eyewear', 
    path: '/lenses', 
    subItems: [
      { name: 'Eyewear Collection', path: '/lenses?gender=women' }
    ] 
  },
  { 
    id: 'accessories', 
    label: 'Earrings', 
    path: '/accessories?subCategory=earrings'
  },
  { 
    id: 'shoes', 
    label: 'Shoes', 
    path: '/shoes', 
    subItems: [
      { name: 'All Shoes', path: '/shoes' },
      { name: 'Heels', path: '/shoes?subCategory=Heels' },
      { name: 'Flats', path: '/shoes?subCategory=Flats' },
      { name: 'Boots', path: '/shoes?subCategory=Boots' },
      { name: 'Sandals', path: '/shoes?subCategory=Sandals' },
    ] 
  },
  { 
    id: 'skincare', 
    label: 'Skincare', 
    path: '/skincare', 
    subItems: [
      { name: 'Serum', path: '/skincare?category=serum' },
      { name: 'Facewash', path: '/skincare?category=facewash' },
      { name: 'Sunscreen', path: '/skincare?category=sunscreen' },
      { name: 'Moisturizer', path: '/skincare?category=moisturizer' },
      { name: 'Cleanser', path: '/skincare?category=cleanser' },
    ] 
  },
];

const MARQUEE_TEXT = '  +++  NEW COLLECTION  +++  OPEN FOR NEW COLLECTION  +++  CREATING NEW COLLECTION  +++  OPEN FOR NEW COLLECTION  +++  ';

const Navbar = () => {
  const { getCartItemsCount } = useCart();
  const { isAuthenticated, user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const [activeCategory, setActiveCategory] = useState('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [expandedMobileCategory, setExpandedMobileCategory] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isCartSidebarOpen, setIsCartSidebarOpen] = useState(false);

  useEffect(() => {
    const path = location.pathname;
    const foundLink = NAV_LINKS.find(link => path.includes(link.path));
    if (path === '/') setActiveCategory('home');
    else if (path.includes('/sale')) setActiveCategory('sale');
    else if (foundLink) setActiveCategory(foundLink.id);
    else setActiveCategory('');
    setIsMobileMenuOpen(false);
    window.scrollTo(0, 0);
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = (isMobileMenuOpen || isCartSidebarOpen) ? 'hidden' : 'unset';
  }, [isMobileMenuOpen, isCartSidebarOpen]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  const toggleMobileAccordion = (id) => {
    setExpandedMobileCategory(expandedMobileCategory === id ? null : id);
  };

  return (
    <>
      {/* MARQUEE TICKER — teal bg, gold text, elegant style */}
      <div className="w-full bg-[#FE1157] overflow-hidden select-none">
        <div className="h-7 flex items-center">
          <div className="marquee-track">
            <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.15em] text-white whitespace-nowrap">
              {MARQUEE_TEXT}{MARQUEE_TEXT}
            </span>
          </div>
        </div>
      </div>

      {/* MAIN NAVBAR — clean, cream bg, elegant style */}
      <nav
        className={`sticky top-0 left-0 right-0 z-50 bg-[#FFFFFF] transition-[box-shadow,background-color] duration-300 ${
          isScrolled ? 'shadow-md shadow-[#0F1012]/[0.08]' : ''
        }`}
      >
        
        {/* Top row: Logo | Nav Links | Icons */}
        <div className="border-b border-[#FE1157]/80">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10">
            <div className="flex items-center justify-between h-14">

              {/* LEFT: Logo */}
              <Link
                to="/"
                className="flex items-center gap-2 flex-shrink-0 rounded-xl p-1 -ml-1 transition-transform duration-200 ease-out hover:scale-[1.03] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FE1157] focus-visible:ring-offset-2 focus-visible:ring-offset-[#FFFFFF]"
              >
                <img 
                  src="https://res.cloudinary.com/dzd47mpdo/image/upload/v1774001804/copy_of_0bfce75b-bbe6-4982-bc33-57feb8587b8c_531e09.png"
                  alt="Logo"
                  className="h-12 w-auto object-contain drop-shadow-sm"
                />
                <span className="text-sm sm:text-base font-bold uppercase tracking-[0.1em] text-[#0F1012]"></span>
              </Link>

              {/* CENTER: Desktop Nav Links — underline + pill hover */}
              <div className="hidden lg:flex items-center gap-1 xl:gap-2">
                {NAV_LINKS.slice(0, 5).map((link) => (
                  <Link
                    key={link.id}
                    to={link.path}
                    className={`relative py-2.5 px-3 rounded-lg text-[11px] xl:text-xs font-semibold uppercase tracking-[0.08em] transition-all duration-300 ease-out outline-none
                      after:absolute after:bottom-1 after:left-1/2 after:h-[2px] after:w-0 after:-translate-x-1/2 after:rounded-full after:bg-[#FE1157] after:transition-all after:duration-300 after:ease-out
                      hover:text-[#FE1157] hover:bg-[#FE1157]/[0.08] hover:after:w-[65%]
                      focus-visible:ring-2 focus-visible:ring-[#FE1157] focus-visible:ring-offset-2 focus-visible:ring-offset-[#FFFFFF]
                      ${
                        activeCategory === link.id
                          ? 'text-[#FE1157] bg-[#FE1157]/[0.1] after:w-[65%]'
                          : 'text-[#0F1012]'
                      }`}
                  >
                    {link.label}
                  </Link>
                ))}
                <Link
                  to="/sale"
                  className={`relative py-2.5 px-3 rounded-lg text-[11px] xl:text-xs font-bold uppercase tracking-[0.08em] transition-all duration-300 ease-out outline-none
                    after:absolute after:bottom-1 after:left-1/2 after:h-[2px] after:w-0 after:-translate-x-1/2 after:rounded-full after:bg-[#FE1157] after:transition-all after:duration-300
                    hover:text-[#FE1157] hover:bg-[#FE1157]/12 hover:after:w-[65%]
                    focus-visible:ring-2 focus-visible:ring-[#FE1157] focus-visible:ring-offset-2 focus-visible:ring-offset-[#FFFFFF]
                    ${
                      activeCategory === 'sale'
                        ? 'text-[#FE1157] bg-[#FE1157]/18 after:w-[65%]'
                        : 'text-[#FE1157]'
                    }`}
                >
                  Sale +++
                </Link>
              </div>

              {/* RIGHT: Icons */}
              <div className="flex items-center gap-0.5 sm:gap-1">
                {/* Inline desktop search (stays in navbar) */}
                <form
                  onSubmit={handleSearch}
                  className="hidden md:flex items-center rounded-full border border-[#FE1157]/40 bg-white transition-all duration-300 overflow-hidden w-56 lg:w-64 px-3"
                >
                  <button
                    type="submit"
                    title="Search"
                    className="w-10 h-10 flex items-center justify-center text-[#0F1012] hover:text-[#FE1157] transition-colors shrink-0"
                  >
                    <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </button>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search Sanskrutee..."
                    className="w-full bg-transparent text-sm text-[#0F1012] placeholder-[#0F1012]/50 outline-none pr-2"
                  />
                </form>

                {/* User Icon */}
                {isAuthenticated ? (
                  <Link
                    to="/profile"
                    title="Profile"
                    className="group hidden sm:flex w-10 h-10 items-center justify-center rounded-full text-[#0F1012] transition-all duration-200 ease-out hover:bg-[#FE1157]/10 hover:text-[#FE1157] active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FE1157] focus-visible:ring-offset-2 focus-visible:ring-offset-[#FFFFFF]"
                  >
                    <svg className="w-[18px] h-[18px] transition-transform duration-200 group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </Link>
                ) : (
                  <Link
                    to="/login"
                    title="Sign In"
                    className="hidden sm:inline-flex h-10 items-center justify-center rounded-full border border-[#FE1157]/35 px-4 text-[11px] font-bold uppercase tracking-[0.08em] text-[#0F1012] transition-all duration-200 ease-out hover:border-[#FE1157] hover:bg-[#FE1157]/10 hover:text-[#FE1157] active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FE1157] focus-visible:ring-offset-2 focus-visible:ring-offset-[#FFFFFF]"
                  >
                    Sign In
                  </Link>
                )}

                {/* Cart */}
                <button 
                  type="button"
                  onClick={() => setIsCartSidebarOpen(true)}
                  title="Cart"
                  className="group relative w-10 h-10 flex items-center justify-center rounded-full text-[#0F1012] transition-all duration-200 ease-out hover:bg-[#FE1157]/10 hover:text-[#FE1157] active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FE1157] focus-visible:ring-offset-2 focus-visible:ring-offset-[#FFFFFF]"
                >
                  <svg className="w-[18px] h-[18px] transition-transform duration-200 group-hover:scale-110 group-hover:-translate-y-px" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                  {getCartItemsCount() > 0 && (
                    <span className="absolute top-0.5 right-0.5 min-w-[18px] h-[18px] px-1 rounded-full bg-[#FE1157] text-[#FFFFFF] text-[9px] font-bold flex items-center justify-center leading-none shadow-sm ring-2 ring-[#FFFFFF] transition-transform duration-200 group-hover:scale-110">
                      {getCartItemsCount() > 99 ? '99+' : getCartItemsCount()}
                    </span>
                  )}
                </button>

                {/* Cart count text (desktop) */}
                <span className="hidden lg:inline text-[11px] font-semibold uppercase tracking-wider text-[#0F1012] mr-1">
                   
                </span>

                {/* Hamburger */}
                <button 
                  type="button"
                  onClick={() => setIsMobileMenuOpen(true)}
                  title="Menu"
                  className="lg:hidden w-10 h-10 flex items-center justify-center rounded-full text-[#0F1012] transition-all duration-200 ease-out hover:bg-[#FE1157]/10 hover:text-[#FE1157] active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FE1157] focus-visible:ring-offset-2 focus-visible:ring-offset-[#FFFFFF]"
                >
                  <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>

                {/* Shop All New CTA removed */}
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* SIDE DRAWER */}
      <div 
        className={`fixed inset-0 bg-black/40 z-[60] transition-opacity duration-300 ${
          isMobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsMobileMenuOpen(false)}
      />

      <div 
        className={`fixed top-0 right-0 h-full w-full sm:w-[380px] bg-[#FFFFFF] z-[61] flex flex-col overflow-hidden transition-transform duration-300 ease-out ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between px-5 h-14 border-b border-[#FE1157]">
          <span className="text-xs font-bold uppercase tracking-[0.12em] text-[#0F1012]">Menu</span>
          <button 
            type="button"
            onClick={() => setIsMobileMenuOpen(false)}
            className="w-10 h-10 flex items-center justify-center rounded-full text-[#0F1012] transition-all duration-200 hover:bg-[#FE1157]/10 hover:text-[#FE1157] active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FE1157]"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          {isAuthenticated && (
            <div className="px-5 py-4 border-b border-[#FE1157] bg-[#FFFFFF]">
              <p className="text-xs text-[#0F1012]">Hello, <span className="font-bold text-[#0F1012]">{user?.name}</span></p>
            </div>
          )}

          {/* Auth actions */}
          <div className="px-5 py-4 flex gap-3 border-b border-[#FE1157]">
            {isAuthenticated ? (
              <>
                <Link to="/profile" onClick={() => setIsMobileMenuOpen(false)} className="flex-1 btn-neon text-center text-[10px] py-3">
                  Profile
                </Link>
                <button onClick={() => { logout(); setIsMobileMenuOpen(false); }} className="flex-1 btn-black text-center text-[10px] py-3">
                  Logout
                </button>
              </>
            ) : (
              <Link to="/get-started" onClick={() => setIsMobileMenuOpen(false)} className="w-full btn-neon text-center text-[10px] py-3">
                Get Started
              </Link>
            )}
          </div>

          {/* Category Links */}
          <div className="px-5 py-4">
            <Link to="/" className="block py-3 px-2 -mx-2 rounded-lg text-sm font-semibold text-[#0F1012] uppercase tracking-wide border-b border-[#FE1157] transition-all duration-200 hover:bg-[#FE1157]/8 hover:pl-3 active:scale-[0.99]" onClick={() => setIsMobileMenuOpen(false)}>
              Home
            </Link>
            {NAV_LINKS.map((link) => (
              <div key={link.id} className="border-b border-[#FE1157]">
                {link.subItems && link.subItems.length > 0 ? (
                  <>
                    <button 
                      type="button"
                      onClick={() => toggleMobileAccordion(link.id)}
                      className="w-full flex items-center justify-between py-3 px-2 -mx-2 rounded-lg text-sm font-semibold text-[#0F1012] uppercase tracking-wide transition-all duration-200 hover:bg-[#FE1157]/8 active:bg-[#FE1157]/12"
                    >
                      <span>{link.label}</span>
                      <svg className={`w-3.5 h-3.5 text-[#0F1012] transition-transform duration-200 ${expandedMobileCategory === link.id ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    <div className={`overflow-hidden transition-all duration-200 ${expandedMobileCategory === link.id ? 'max-h-96 pb-2' : 'max-h-0'}`}>
                      <div className="pl-4 space-y-1">
                        {link.subItems.map((sub, idx) => (
                          <Link key={idx} to={sub.path} onClick={() => setIsMobileMenuOpen(false)}
                            className="block py-2 text-xs text-[#0F1012] hover:text-[#0F1012] uppercase tracking-wide transition-colors">
                            {sub.name}
                          </Link>
                        ))}
                        <Link to={link.path} onClick={() => setIsMobileMenuOpen(false)} className="block py-2.5 px-2 -mx-2 rounded-md text-xs font-bold text-[#FE1157] uppercase tracking-wide transition-all duration-200 hover:bg-[#FE1157]/10">
                          Shop All
                        </Link>
                      </div>
                    </div>
                  </>
                ) : (
                  <Link to={link.path} onClick={() => setIsMobileMenuOpen(false)}
                    className="block py-3 px-2 -mx-2 rounded-lg text-sm font-semibold text-[#0F1012] uppercase tracking-wide transition-all duration-200 hover:bg-[#FE1157]/8 hover:pl-3 active:scale-[0.99]">
                    {link.label}
                  </Link>
                )}
              </div>
            ))}
            <Link to="/sale" onClick={() => setIsMobileMenuOpen(false)}
              className="block py-3 px-2 -mx-2 rounded-lg text-sm font-bold text-[#FE1157] uppercase tracking-wide border-b border-[#FE1157] transition-all duration-200 hover:bg-[#FE1157]/12 hover:text-[#FE1157]">
              +++ Sale +++
            </Link>
          </div>

          <div className="px-5 py-4 border-t border-[#FE1157] space-y-0">
            <Link to="/contact" className="block py-3 px-2 -mx-2 rounded-lg text-xs font-semibold text-[#0F1012] hover:text-[#FE1157] hover:bg-[#FE1157]/5 uppercase tracking-wide transition-all duration-200" onClick={() => setIsMobileMenuOpen(false)}>
              Contact Us
            </Link>
            <Link to="/about" className="block py-3 px-2 -mx-2 rounded-lg text-xs font-semibold text-[#0F1012] hover:text-[#FE1157] hover:bg-[#FE1157]/5 uppercase tracking-wide transition-all duration-200" onClick={() => setIsMobileMenuOpen(false)}>
              About Brand
            </Link>
          </div>
        </div>

        {!isAuthenticated && (
          <div className="border-t border-[#FE1157] p-5">
            <Link to="/get-started" onClick={() => setIsMobileMenuOpen(false)} className="w-full block text-center btn-neon">
              Get Started
            </Link>
          </div>
        )}
      </div>

      <CartSidebar isOpen={isCartSidebarOpen} onClose={() => setIsCartSidebarOpen(false)} />
    </>
  );
};

export default Navbar;

