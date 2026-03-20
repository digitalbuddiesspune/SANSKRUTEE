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
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isDesktopSearchExpanded, setIsDesktopSearchExpanded] = useState(false);
  const [expandedMobileCategory, setExpandedMobileCategory] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isCartSidebarOpen, setIsCartSidebarOpen] = useState(false);

  const searchInputRef = useRef(null);

  useEffect(() => {
    const path = location.pathname;
    const foundLink = NAV_LINKS.find(link => path.includes(link.path));
    if (path === '/') setActiveCategory('home');
    else if (path.includes('/sale')) setActiveCategory('sale');
    else if (foundLink) setActiveCategory(foundLink.id);
    else setActiveCategory('');
    setIsMobileMenuOpen(false);
    setIsSearchOpen(false);
    window.scrollTo(0, 0);
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = (isMobileMenuOpen || isCartSidebarOpen || isSearchOpen) ? 'hidden' : 'unset';
  }, [isMobileMenuOpen, isCartSidebarOpen, isSearchOpen]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchInputRef.current && !searchInputRef.current.contains(event.target)) {
        if (!searchQuery) setIsDesktopSearchExpanded(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [searchQuery]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      setIsSearchOpen(false);
      setIsDesktopSearchExpanded(false);
    }
  };

  const toggleMobileAccordion = (id) => {
    setExpandedMobileCategory(expandedMobileCategory === id ? null : id);
  };

  return (
    <>
      {/* MARQUEE TICKER — teal bg, gold text, elegant style */}
      <div className="w-full bg-[#2B6B5A] overflow-hidden select-none">
        <div className="h-7 flex items-center">
          <div className="marquee-track">
            <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.15em] text-[#C4A265] whitespace-nowrap">
              {MARQUEE_TEXT}{MARQUEE_TEXT}
            </span>
          </div>
        </div>
      </div>

      {/* MAIN NAVBAR — clean, cream bg, elegant style */}
      <nav className={`sticky top-0 left-0 right-0 z-50 bg-[#FAF6F0] transition-shadow duration-200 ${isScrolled ? 'shadow-[0_1px_0_#E0D8CE]' : ''}`}>
        
        {/* Top row: Logo | Nav Links | Icons */}
        <div className="border-b border-[#E0D8CE]">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10">
            <div className="flex items-center justify-between h-14">

              {/* LEFT: Logo */}
              <Link to="/" className="flex items-center gap-2 flex-shrink-0">
                <img 
                  src="https://res.cloudinary.com/dzd47mpdo/image/upload/v1774001804/copy_of_0bfce75b-bbe6-4982-bc33-57feb8587b8c_531e09.png"
                  alt="Logo"
                  className="h-12 w-auto object-contain"
                />
                <span className="text-sm sm:text-base font-bold uppercase tracking-[0.1em] text-[#1A2F2A]"></span>
              </Link>

              {/* CENTER: Desktop Nav Links */}
              <div className="hidden lg:flex items-center gap-6 xl:gap-8">
                {NAV_LINKS.slice(0, 5).map((link) => (
                  <Link
                    key={link.id}
                    to={link.path}
                    className={`text-[11px] xl:text-xs font-semibold uppercase tracking-[0.08em] transition-colors duration-200 ${
                      activeCategory === link.id ? 'text-[#2B6B5A]' : 'text-[#8B9A95] hover:text-[#2B6B5A]'
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
                <Link
                  to="/sale"
                  className={`text-[11px] xl:text-xs font-bold uppercase tracking-[0.08em] transition-colors duration-200 ${
                    activeCategory === 'sale' ? 'text-[#C4A265]' : 'text-[#8B9A95] hover:text-[#C4A265]'
                  }`}
                >
                  Sale +++
                </Link>
              </div>

              {/* RIGHT: Icons */}
              <div className="flex items-center gap-1">
                {/* Search Icon (hide on mobile) */}
                <button
                  onClick={() => setIsSearchOpen(!isSearchOpen)}
                  className="hidden md:flex w-9 h-9 items-center justify-center text-[#1A2F2A] hover:bg-[#E0D8CE]/50 transition-colors"
                >
                  <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>

                {/* User Icon */}
                {isAuthenticated ? (
                  <Link to="/profile" className="hidden sm:flex w-9 h-9 items-center justify-center text-[#1A2F2A] hover:bg-[#E0D8CE]/50 transition-colors">
                    <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </Link>
                ) : (
                  <Link to="/get-started" className="hidden sm:flex w-9 h-9 items-center justify-center text-[#1A2F2A] hover:bg-[#E0D8CE]/50 transition-colors">
                    <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </Link>
                )}

                {/* Cart */}
                <button 
                  onClick={() => setIsCartSidebarOpen(true)}
                  className="relative w-9 h-9 flex items-center justify-center text-[#1A2F2A] hover:bg-[#E0D8CE]/50 transition-colors"
                >
                  <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                  {getCartItemsCount() > 0 && (
                    <span className="absolute top-0.5 right-0.5 min-w-[16px] h-4 px-1 bg-[#2B6B5A] text-[#FAF6F0] text-[9px] font-bold flex items-center justify-center leading-none">
                      {getCartItemsCount() > 99 ? '99+' : getCartItemsCount()}
                    </span>
                  )}
                </button>

                {/* Cart count text (desktop) */}
                <span className="hidden lg:inline text-[11px] font-semibold uppercase tracking-wider text-[#1A2F2A] mr-1">
                   
                </span>

                {/* Hamburger */}
                <button 
                  onClick={() => setIsMobileMenuOpen(true)}
                  className="lg:hidden w-9 h-9 flex items-center justify-center text-[#1A2F2A] hover:bg-[#E0D8CE]/50 transition-colors"
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

      {/* SEARCH OVERLAY */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-[70] bg-[#FAF6F0] animate-fadeIn">
          <div className="max-w-2xl mx-auto px-6 pt-20">
            <form onSubmit={handleSearch} className="relative">
              <input
                ref={searchInputRef}
                type="text"
                className="w-full border-b-2 border-[#2B6B5A] bg-transparent outline-none text-2xl sm:text-3xl font-bold text-[#1A2F2A] placeholder-[#8B9A95] pb-4"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
              />
            </form>
            <button 
              onClick={() => { setIsSearchOpen(false); setSearchQuery(''); }}
              className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center text-[#1A2F2A] hover:bg-[#E0D8CE]/50 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* SIDE DRAWER */}
      <div 
        className={`fixed inset-0 bg-black/40 z-[60] transition-opacity duration-300 ${
          isMobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsMobileMenuOpen(false)}
      />

      <div 
        className={`fixed top-0 right-0 h-full w-full sm:w-[380px] bg-[#FAF6F0] z-[61] flex flex-col overflow-hidden transition-transform duration-300 ease-out ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between px-5 h-14 border-b border-[#E0D8CE]">
          <span className="text-xs font-bold uppercase tracking-[0.12em] text-[#1A2F2A]">Menu</span>
          <button 
            onClick={() => setIsMobileMenuOpen(false)}
            className="w-9 h-9 flex items-center justify-center text-[#1A2F2A] hover:bg-[#E0D8CE]/50 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          {isAuthenticated && (
            <div className="px-5 py-4 border-b border-[#E0D8CE] bg-[#F0EBE3]">
              <p className="text-xs text-[#8B9A95]">Hello, <span className="font-bold text-[#1A2F2A]">{user?.name}</span></p>
            </div>
          )}

          {/* Auth actions */}
          <div className="px-5 py-4 flex gap-3 border-b border-[#E0D8CE]">
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
            <Link to="/" className="block py-3 text-sm font-semibold text-[#1A2F2A] uppercase tracking-wide border-b border-[#E0D8CE]" onClick={() => setIsMobileMenuOpen(false)}>
              Home
            </Link>
            {NAV_LINKS.map((link) => (
              <div key={link.id} className="border-b border-[#E0D8CE]">
                {link.subItems && link.subItems.length > 0 ? (
                  <>
                    <button 
                      onClick={() => toggleMobileAccordion(link.id)}
                      className="w-full flex items-center justify-between py-3 text-sm font-semibold text-[#1A2F2A] uppercase tracking-wide"
                    >
                      <span>{link.label}</span>
                      <svg className={`w-3.5 h-3.5 text-[#8B9A95] transition-transform duration-200 ${expandedMobileCategory === link.id ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    <div className={`overflow-hidden transition-all duration-200 ${expandedMobileCategory === link.id ? 'max-h-96 pb-2' : 'max-h-0'}`}>
                      <div className="pl-4 space-y-1">
                        {link.subItems.map((sub, idx) => (
                          <Link key={idx} to={sub.path} onClick={() => setIsMobileMenuOpen(false)}
                            className="block py-2 text-xs text-[#8B9A95] hover:text-[#1A2F2A] uppercase tracking-wide transition-colors">
                            {sub.name}
                          </Link>
                        ))}
                        <Link to={link.path} onClick={() => setIsMobileMenuOpen(false)} className="block py-2 text-xs font-bold text-[#1A2F2A] uppercase tracking-wide">
                          Shop All
                        </Link>
                      </div>
                    </div>
                  </>
                ) : (
                  <Link to={link.path} onClick={() => setIsMobileMenuOpen(false)}
                    className="block py-3 text-sm font-semibold text-[#1A2F2A] uppercase tracking-wide">
                    {link.label}
                  </Link>
                )}
              </div>
            ))}
            <Link to="/sale" onClick={() => setIsMobileMenuOpen(false)}
              className="block py-3 text-sm font-bold text-[#1A2F2A] uppercase tracking-wide border-b border-[#E0D8CE]">
              +++ Sale +++
            </Link>
          </div>

          <div className="px-5 py-4 border-t border-[#E0D8CE] space-y-0">
            <Link to="/contact" className="block py-3 text-xs font-semibold text-[#8B9A95] hover:text-[#1A2F2A] uppercase tracking-wide transition-colors" onClick={() => setIsMobileMenuOpen(false)}>
              Contact Us
            </Link>
            <Link to="/about" className="block py-3 text-xs font-semibold text-[#8B9A95] hover:text-[#1A2F2A] uppercase tracking-wide transition-colors" onClick={() => setIsMobileMenuOpen(false)}>
              About Brand
            </Link>
          </div>
        </div>

        {!isAuthenticated && (
          <div className="border-t border-[#E0D8CE] p-5">
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
