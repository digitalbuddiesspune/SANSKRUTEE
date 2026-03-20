import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// import Footer from '../components/Footer'; 
import ProductCard from '../components/ProductCard';
import { productAPI } from '../utils/api';
import { handleImageError } from '../utils/imageFallback';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { formatPriceWithCurrency } from '../utils/formatUtils';
import { optimizeImageUrl } from '../utils/imageOptimizer';

// --- ICONS (Embedded directly so no install needed) ---
const IconChevronLeft = () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>;
const IconChevronRight = () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>;
const IconClose = () => <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>;

// --- API FETCH FUNCTIONS (Kept from previous version) ---
const fetchFreshDrops = async () => {
  try {
    const [womenShoes, accessories, watches, lenses] = await Promise.all([
      productAPI.getWomenItems({ limit: 10, category: 'shoes' }),
      productAPI.getAccessories({ limit: 10, subCategory: 'earrings' }),
      productAPI.getWatches({ limit: 10 }),
      productAPI.getLenses({ limit: 10 })
    ]);
    
    // Get shoes from women, take exactly 12
    let allShoes = [];
    if (womenShoes.success && womenShoes.data.products) {
      allShoes = [...allShoes, ...womenShoes.data.products];
    }
    const shoes = allShoes.slice(0, 12);
    
    // Get exactly 10 accessories
    const acc = accessories.success && accessories.data.products 
      ? accessories.data.products.slice(0, 10) 
      : [];
    
    // Get exactly 10 watches
    const watch = watches.success && watches.data.products 
      ? watches.data.products.slice(0, 10) 
      : [];
    
    // Get exactly 10 lenses
    const lens = lenses.success && lenses.data.products 
      ? lenses.data.products.slice(0, 10) 
      : [];
    
    // Combine all: 12 shoes + 10 accessories + 10 watches + 10 lenses = 42 products total
    return [...shoes, ...acc, ...watch, ...lens];
  } catch (error) {
    console.error("Error fetching fresh drops:", error);
    return [];
  }
};

const fetchSaleItems = async () => {
  const res = await productAPI.getAllProducts({ limit: 4, onSale: true, sort: 'discountPercent', order: 'desc' });
  return res.success ? res.data.products : [];
};

const fetchWomen = async () => {
  const res = await productAPI.getWomenItems({ limit: 4 });
  return res.success ? res.data.products : [];
};

const fetchWatches = async () => {
  const res = await productAPI.getWatches({ limit: 4 });
  return res.success ? res.data.products : [];
};

const fetchAccessories = async () => {
  try {
    const [lenses, acc] = await Promise.all([
      productAPI.getLenses({ limit: 2 }),
      productAPI.getAccessories({ limit: 2, subCategory: 'earrings' })
    ]);
    let combined = [];
    if (lenses.success) combined = [...combined, ...lenses.data.products];
    if (acc.success) combined = [...combined, ...acc.data.products];
    return combined.slice(0, 4);
  } catch (error) {
    console.error("Error fetching accessories:", error);
    return [];
  }
};

const fetchSkincare = async () => {
  try {
    const res = await productAPI.getSkincareProducts({ limit: 16 });
    return res.success ? res.data.products : [];
  } catch (error) {
    console.error("Error fetching skincare:", error);
    return [];
  }
};  

const LuxeSection = () => {
  const scrollRef = useRef(null);

  // Sample data to match the image aesthetics
  const luxeProducts = [
    {
      id: 1,
      brand: "CLINIQUE",
      image: "https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?q=80&w=800&auto=format&fit=crop",
      link: "/luxe/clinique"
    },
    {
      id: 2,
      brand: "RABANNE",
      image: "https://images.unsplash.com/photo-1594035910387-fea4779426e9?q=80&w=800&auto=format&fit=crop",
      link: "/luxe/rabanne"
    },
    {
      id: 3,
      brand: "ISSEY MIYAKE",
      image: "https://images.unsplash.com/photo-1585232561025-aa543d3122c4?q=80&w=800&auto=format&fit=crop",
      link: "/luxe/issey"
    },
    {
      id: 4,
      brand: "VERSACE",
      image: "https://images.unsplash.com/photo-1587017539504-67cfbddac569?q=80&w=800&auto=format&fit=crop",
      link: "/luxe/versace"
    },
  ];
}

const scroll = (direction) => {
  if (scrollRef.current) {
    const { current } = scrollRef;
    const scrollAmount = 300; // Adjust scroll distance
    if (direction === 'left') {
      current.scrollLeft -= scrollAmount;
    } else {
      current.scrollLeft += scrollAmount;
    }
  }
};



const Home = () => {
  // --- UI STATE ---
  const [activeStoryIndex, setActiveStoryIndex] = useState(null);
  const [isStoryViewerOpen, setIsStoryViewerOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);
  const [currentPromoBannerIndex, setCurrentPromoBannerIndex] = useState(0);
  const [currentMobilePromoBannerIndex, setCurrentMobilePromoBannerIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1024);
  const categoryScrollRef = useRef(null);
  const lifestyleScrollRef = useRef(null);
  const bannerCarouselRef = useRef(null);
  const promoBannerCarouselRef = useRef(null);
  const mobilePromoBannerCarouselRef = useRef(null);
  const heroParallaxRef = useRef(null);

  // --- DATA STATE & FETCHING (Unchanged) ---
  const [freshDrops, setFreshDrops] = useState([]);
  const [saleItems, setSaleItems] = useState([]);
  const [womenItems, setWomenItems] = useState([]);
  const [watches, setWatches] = useState([]);
  const [accessories, setAccessories] = useState([]);
  const [skincareProducts, setSkincareProducts] = useState([]);
  
  // Mobile view specific products
  const [tshirts, setTshirts] = useState([]);
  const [watchesMobile, setWatchesMobile] = useState([]);
  const [eyewear, setEyewear] = useState([]);
  const [accessoriesMobile, setAccessoriesMobile] = useState([]);

  // Track window width for responsive product count
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    handleResize(); // Set initial value
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const loadAllData = async () => {
      setIsLoading(true);
      try {
        const [freshDropsData, saleData, womenData, watchesData, accessoriesData, skincareData, tshirtsData, watchesMobileData, eyewearData, accessoriesMobileData] = await Promise.all([
          fetchFreshDrops(), 
          fetchSaleItems(), 
          fetchWomen(), 
          fetchWatches(), 
          fetchAccessories(), 
          fetchSkincare(),
          // Fetch mobile-specific products
          productAPI.getWomenItems({ subCategory: 'tshirt', limit: 5 }).then(res => res.success ? res.data.products : []),
          productAPI.getWatches({ limit: 5 }).then(res => res.success ? res.data.products : []),
          productAPI.getLenses({ limit: 5 }).then(res => res.success ? res.data.products : []),
          productAPI.getAccessories({ limit: 5, subCategory: 'earrings' }).then(res => res.success ? res.data.products : [])
        ]);
        setFreshDrops(freshDropsData);
        setSaleItems(saleData);
        setWomenItems(womenData);
        setWatches(watchesData);
        setAccessories(accessoriesData);
        setSkincareProducts(skincareData);
        setTshirts(tshirtsData);
        setWatchesMobile(watchesMobileData);
        setEyewear(eyewearData);
        setAccessoriesMobile(accessoriesMobileData);
      } catch (error) {
        console.error("Error loading home page data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadAllData();
  }, []);


  const stories = [
    { hashtag: 'Xmas', emoji: '🎄', image: optimizeImageUrl('https://res.cloudinary.com/de1bg8ivx/image/upload/v1764741928/IMG_20251123_161820_skzchs.png', 50) },
    { hashtag: 'Desi', emoji: '😎', image: optimizeImageUrl('https://res.cloudinary.com/de1bg8ivx/image/upload/v1764741995/image-104_iuyyuw.png', 50) },
    { hashtag: 'Street', emoji: '🔥', image: optimizeImageUrl('https://res.cloudinary.com/de1bg8ivx/image/upload/v1764742092/ZfLAMkmNsf2sHkoW_DELHI-FACES-1_fjnvcb.avif', 50) },
    { hashtag: 'FitCheck', emoji: '✨', image: optimizeImageUrl('https://res.cloudinary.com/de1bg8ivx/image/upload/v1764742199/0d37737c8c2c7536422e411fb68eeeb3_ylhf3n.jpg', 50) },
    { hashtag: 'Tees', emoji: '👕', image: optimizeImageUrl('https://res.cloudinary.com/de1bg8ivx/image/upload/v1764742259/0424-TSHIRT-06_1_7c30d8ed-155d-47a6-a52f-52858221a302_fjdfpo.webp', 50), link: '/women/tshirt' },
    { hashtag: 'Denim', emoji: '👖', image: optimizeImageUrl('https://res.cloudinary.com/de1bg8ivx/image/upload/v1764742467/GettyImages-2175843730_q21gse.jpg', 50) },
    { hashtag: 'Scarf', emoji: '🧣', image: optimizeImageUrl('https://res.cloudinary.com/de1bg8ivx/image/upload/v1764742548/NECK_20SCARF_20TREND_20190625_20GettyImages-1490484490_ccdwdy.webp', 50) }
  ];

  // Banner carousel images
  const banners = [
    optimizeImageUrl('https://res.cloudinary.com/de1bg8ivx/image/upload/v1766476937/Brown_Modern_New_Arrival_Leaderboard_Ad_gzs4iv.svg', 50)
  ];

  // Detect mobile viewport
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Auto-rotate mobile banner carousel - Faster interval
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBannerIndex((prev) => (prev + 1) % banners.length);
    }, 3500); // Change banner every 3.5 seconds (faster)

    return () => clearInterval(interval);
  }, [banners.length]);

  // Auto-rotate desktop promo banner carousel - Infinite scroll
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPromoBannerIndex((prev) => {
        const next = prev + 1;
        // Reset to 0 after 4 to maintain indicator sync, but scroll continues infinitely
        return next >= 4 ? 0 : next;
      });
    }, 5000); // Change banner every 5 seconds

    return () => clearInterval(interval);
  }, []);

  // Auto-rotate mobile promo banner carousel (using promoBannerCarouselRef)
  useEffect(() => {
    const carousel = promoBannerCarouselRef.current;
    if (!carousel) return;

    const interval = setInterval(() => {
      // Only auto-rotate on mobile
      if (window.innerWidth < 768) {
        const bannerWidth = carousel.offsetWidth;
        const currentScrollLeft = carousel.scrollLeft;
        const currentIndex = Math.floor((currentScrollLeft + bannerWidth / 2) / bannerWidth) % 4;
        const nextIndex = (currentIndex + 1) % 4;
        const scrollPosition = nextIndex * bannerWidth;

        carousel.scrollTo({
          left: scrollPosition,
          behavior: 'smooth'
        });
      }
    }, 3000); // Change banner every 3 seconds

    return () => clearInterval(interval);
  }, []);

  // Auto-rotate mobile promo banner carousel - Infinite scroll
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMobilePromoBannerIndex((prev) => {
        const next = prev + 1;
        // Reset to 0 after 4 to maintain indicator sync, but scroll continues infinitely
        return next >= 4 ? 0 : next;
      });
    }, 5000); // Change banner every 5 seconds

    return () => clearInterval(interval);
  }, []);

  // Scroll to current mobile banner
  useEffect(() => {
    if (bannerCarouselRef.current) {
      const bannerWidth = bannerCarouselRef.current.offsetWidth;
      bannerCarouselRef.current.scrollTo({
        left: currentBannerIndex * bannerWidth,
        behavior: 'smooth'
      });
    }
  }, [currentBannerIndex]);

  // Infinite scroll for desktop promo banner (desktop only)
  useEffect(() => {
    if (promoBannerCarouselRef.current && window.innerWidth >= 768) {
      const carousel = promoBannerCarouselRef.current;
      const bannerWidth = carousel.offsetWidth;
      const scrollPosition = currentPromoBannerIndex * bannerWidth;
      
      carousel.scrollTo({
        left: scrollPosition,
        behavior: 'smooth'
      });
    }
  }, [currentPromoBannerIndex]);

  // Infinite scroll for mobile promo banner
  useEffect(() => {
    if (mobilePromoBannerCarouselRef.current) {
      const carousel = mobilePromoBannerCarouselRef.current;
      const bannerWidth = carousel.offsetWidth;
      const scrollPosition = currentMobilePromoBannerIndex * bannerWidth;
      
      carousel.scrollTo({
        left: scrollPosition,
        behavior: 'smooth'
      });
    }
  }, [currentMobilePromoBannerIndex]);

  // Handle infinite scroll on scroll event for desktop - seamless loop (desktop only)
  useEffect(() => {
    const carousel = promoBannerCarouselRef.current;
    if (!carousel || window.innerWidth < 768) return;

    const handleScroll = () => {
      const bannerWidth = carousel.offsetWidth;
      const scrollLeft = carousel.scrollLeft;
      const totalBanners = 4;
      const totalWidth = bannerWidth * totalBanners;
      
      // If scrolled past the first set of banners, jump back seamlessly
      if (scrollLeft >= totalWidth) {
        carousel.scrollTo({
          left: scrollLeft - totalWidth,
          behavior: 'auto'
        });
      }
    };

    carousel.addEventListener('scroll', handleScroll);
    return () => carousel.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle infinite scroll on scroll event for mobile - seamless loop
  useEffect(() => {
    const carousel = mobilePromoBannerCarouselRef.current;
    if (!carousel) return;

    const handleScroll = () => {
      const bannerWidth = carousel.offsetWidth;
      const scrollLeft = carousel.scrollLeft;
      const totalBanners = 4;
      const totalWidth = bannerWidth * totalBanners;
      
      // If scrolled past the first set of banners, jump back seamlessly
      if (scrollLeft >= totalWidth) {
        carousel.scrollTo({
          left: scrollLeft - totalWidth,
          behavior: 'auto'
        });
      }
    };

    carousel.addEventListener('scroll', handleScroll);
    return () => carousel.removeEventListener('scroll', handleScroll);
  }, []);

  // Subtle editorial parallax for the hero image area (requested)
  useEffect(() => {
    const el = heroParallaxRef.current;
    if (!el) return;
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let rafId = null;

    const update = () => {
      rafId = null;
      const rect = el.getBoundingClientRect();
      const viewportH = window.innerHeight || 1;
      const centerY = rect.top + rect.height / 2;
      const distance = (centerY - viewportH / 2) / viewportH;
      const y = Math.max(-18, Math.min(18, distance * 28));
      el.style.transform = `translate3d(0, ${-y}px, 0)`;
    };

    const onScroll = () => {
      if (rafId) return;
      rafId = window.requestAnimationFrame(update);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    update();

    return () => {
      if (rafId) window.cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  // Touch swipe handlers for mobile hero banners
  const minSwipeDistance = 50;

  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      setCurrentMobilePromoBannerIndex((prev) => {
        const next = prev + 1;
        return next >= 4 ? 0 : next;
      });
    }
    if (isRightSwipe) {
      setCurrentMobilePromoBannerIndex((prev) => {
        const next = prev - 1;
        return next < 0 ? 3 : next;
      });
    }
  };

  // Track scroll position and handle infinite scroll for mobile banner carousel
  useEffect(() => {
    const carousel = promoBannerCarouselRef.current;
    if (!carousel) return;

    const handleScroll = () => {
      // Only handle on mobile
      if (window.innerWidth < 768) {
        const bannerWidth = carousel.offsetWidth;
        const scrollLeft = carousel.scrollLeft;
        const totalBanners = 4;
        const totalWidth = bannerWidth * totalBanners;
        
        // Update indicator based on scroll position - use Math.floor for better accuracy
        const currentIndex = Math.floor((scrollLeft + bannerWidth / 2) / bannerWidth) % 4;
        setCurrentPromoBannerIndex(currentIndex >= 0 ? currentIndex : 3);
        
        // Handle infinite scroll - jump back seamlessly when reaching the end
        if (scrollLeft >= totalWidth) {
          carousel.scrollTo({
            left: scrollLeft - totalWidth,
            behavior: 'auto'
          });
        }
      }
    };

    carousel.addEventListener('scroll', handleScroll, { passive: true });
    return () => carousel.removeEventListener('scroll', handleScroll);
  }, []);

  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [openDropdown, setOpenDropdown] = useState(null);

  // Categories from Navbar with subcategory paths
  const categories = [
    { id: 'All', label: 'All', path: '/' },
    { 
      id: 'women', 
      label: 'Fashion', 
      path: '/women', 
      subItems: [
        { name: 'Shirts', path: '/women/shirt' },
        { name: 'T-Shirts', path: '/women/tshirt' },
        { name: 'Jeans', path: '/women/jeans' },
        { name: 'Trousers', path: '/women/trousers' },
        { name: 'Saree', path: '/women/saree' }
      ] 
    },
    { 
      id: 'shoes', 
      label: 'Shoes', 
      path: '/shoes', 
      subItems: [
        { name: 'Heels', path: '/shoes?subCategory=Heels' },
        { name: 'Flats', path: '/shoes?subCategory=Flats' },
        { name: 'Boots', path: '/shoes?subCategory=Boots' },
        { name: 'Sandals', path: '/shoes?subCategory=Sandals' }
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
      id: 'skincare', 
      label: 'Skincare', 
      path: '/skincare', 
      subItems: [
        { name: 'Serum', path: '/skincare?category=serum' },
        { name: 'Facewash', path: '/skincare?category=facewash' },
        { name: 'Sunscreen', path: '/skincare?category=sunscreen' },
        { name: 'Moisturizer', path: '/skincare?category=moisturizer' },
        { name: 'Cleanser', path: '/skincare?category=cleanser' }
      ] 
    },
  ];

  const getSubItemImage = (subItem) => {
    const name = (subItem?.name || '').toLowerCase();
    const path = subItem?.path || '';

    // Fashion
    if (name.includes('shirt') || name.includes('t-shirt') || name.includes('tees')) {
      return 'https://res.cloudinary.com/dvkxgrcbv/image/upload/v1767171505/Mobile_Banner_resize_6_ybv1ud.jpg';
    }
    if (name.includes('jeans') || name.includes('trouser') || name.includes('saree')) {
      return 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=500&fit=crop';
    }

    // Shoes
    if (name.includes('heel') || name.includes('flat') || name.includes('boot') || name.includes('sandals')) {
      return 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=500&fit=crop';
    }

    // Watches / Lens / Eyewear
    if (name.includes('eyewear') || name.includes('lenses')) {
      return 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=500&fit=crop';
    }

    // Skincare
    if (name.includes('serum') || name.includes('facewash') || name.includes('sunscreen') || name.includes('moisturizer') || name.includes('cleanser')) {
      return 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=400&h=500&fit=crop';
    }

    // Earrings
    if (path.includes('subCategory=earrings') || name.includes('earring')) {
      return 'https://images.unsplash.com/photo-1594223274512-ad4803739b7c?w=400&h=500&fit=crop';
    }

    // Fallback
    return 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=500&fit=crop';
  };

  const getSubItemSubtitle = (subItem) => {
    const name = (subItem?.name || '').toLowerCase();

    if (!name) return '';

    // Fashion (women's)
    if (name.includes('shirt') || name.includes('t-shirt') || name.includes('tshirt') || name.includes('tee') || name.includes('jean') || name.includes('trouser') || name.includes('saree')) {
      return "Women's";
    }

    // Shoes
    if (name.includes('heel') || name.includes('flat') || name.includes('boot') || name.includes('sandals')) {
      return 'Shoes';
    }

    // Skincare
    if (name.includes('serum') || name.includes('facewash') || name.includes('sunscreen') || name.includes('moisturizer') || name.includes('cleanser')) {
      return 'Skincare';
    }

    // Eyewear / lenses
    if (name.includes('eyewear') || name.includes('lens')) {
      return 'Lenses';
    }

    return '';
  };

  const getActiveCategoryTitle = () => {
    switch (openDropdown) {
      case 'women':
        return "Women's Fashion";
      case 'shoes':
        return 'Shoes';
      case 'watches':
        return 'Watches';
      case 'lenses':
        return 'Eyewear';
      case 'skincare':
        return 'Skincare';
      case 'accessories':
        return 'Earrings';
      default:
        return 'New Arrivals';
    }
  };

  // Helper function to filter products by search query
  const filterProductsBySearch = (products) => {
    if (!searchQuery.trim()) return products;
    return products.filter(product => {
      const name = (product.name || product.productName || '').toLowerCase();
      const query = searchQuery.toLowerCase();
      return name.includes(query);
    });
  };

  const handleAddToCart = async (product) => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    try {
      await addToCart(product, 1, product.sizes?.[0] || 'M', '');
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  return (
    <div className="min-h-screen font-sans text-gray-800">
      {/* MOBILE HOME PAGE - New Design */}
        <div className="md:hidden bg-white min-h-screen">
        {/* Mobile hero banner (above search) */}
        <div className="relative w-full bg-white px-4 pt-4 pb-4">
          <div className="relative w-full flex items-center justify-center mx-auto">
            <div className="relative overflow-hidden w-full rounded-3xl">
              <div
                ref={promoBannerCarouselRef}
                className="flex overflow-x-auto scroll-smooth scrollbar-hide"
                style={{
                  scrollSnapType: 'x mandatory',
                  scrollBehavior: 'smooth',
                  WebkitOverflowScrolling: 'touch'
                }}
              >
                <div
                  className="flex-shrink-0 w-full"
                  style={{
                    scrollSnapAlign: 'start',
                    scrollSnapStop: 'always'
                  }}
                >
                  <img
                    src="https://res.cloudinary.com/dzd47mpdo/image/upload/v1774009783/sale_products_1080_x_1080_px_qgovod.png"
                    alt="Sale Products Banner"
                    width={1080}
                    height={1080}
                    className="w-full h-auto object-contain"
                    loading="eager"
                    draggable="false"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="px-4 mb-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-4 pr-14 py-3 bg-[#F5F0E8] rounded-full text-[#1A2F2A] placeholder-[#8B9A95] focus:outline-none focus:ring-2 focus:ring-[#2B6B5A]"
            />
            <button className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center bg-[#2B6B5A] rounded-full">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>
        </div>

        {/* Categories Section */}
        <div className="px-4 mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Categories</h3>
          <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  // "All" on mobile should go to New Arrivals
                  if (cat.id === 'All') {
                    setOpenDropdown(null);
                    navigate('/new-arrival');
                    return;
                  }

                  // If the category doesn't have subitems (e.g. Earrings), navigate directly
                  if (!cat.subItems?.length) {
                    setOpenDropdown(null);
                    navigate(cat.path);
                    return;
                  }

                  // Otherwise toggle the dropdown
                  setOpenDropdown(openDropdown === cat.id ? null : cat.id);
                }}
                className={`flex-shrink-0 px-4 py-2 rounded-lg font-medium text-sm transition-colors whitespace-nowrap flex items-center gap-1.5 ${
                  openDropdown === cat.id
                    ? 'bg-[#1A2F2A] text-white'
                    : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                }`}
              >
                {cat.label}
                {cat.subItems?.length && (
                  <svg 
                    className={`w-3.5 h-3.5 transition-transform ${openDropdown === cat.id ? 'rotate-180' : ''}`}
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                )}
              </button>
            ))}
          </div>
          
          {/* Subcategories Section */}
          {openDropdown && categories.find(cat => cat.id === openDropdown)?.subItems && (
            <div className="mt-3 bg-white border border-[#E0D8CE] rounded-lg shadow-sm p-4">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-sm font-semibold text-gray-800">
                  {categories.find(cat => cat.id === openDropdown)?.label}
                </h4>
                <button
                  onClick={() => setOpenDropdown(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                {categories.find(cat => cat.id === openDropdown)?.subItems.map((subItem, index) => (
                  <Link
                    key={index}
                    to={subItem.path}
                    onClick={() => setOpenDropdown(null)}
                    className="group relative overflow-hidden rounded-xl border border-[#E0D8CE] bg-white/60 hover:border-[#2B6B5A] transition-colors shadow-sm"
                  >
                    <div className="relative w-full aspect-[4/3] bg-[#F5F0E8]">
                      <img
                        src={optimizeImageUrl(getSubItemImage(subItem), 50)}
                        alt={subItem.name}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        loading="lazy"
                        onError={(e) => {
                          e.currentTarget.src = `https://via.placeholder.com/400x300?text=${encodeURIComponent(subItem.name || 'Category')}`;
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-3">
                        <div className="text-[10px] sm:text-[11px] font-bold text-white uppercase tracking-[0.06em] line-clamp-1">
                          {subItem.name}
                        </div>
                        {getSubItemSubtitle(subItem) ? (
                          <div className="text-[10px] text-white/80 mt-0.5 line-clamp-1">
                            {getSubItemSubtitle(subItem)}
                          </div>
                        ) : null}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="px-4 -mb-2 mt-2">
          <h3 className="text-lg font-semibold text-gray-800">
            {getActiveCategoryTitle()}
          </h3>
        </div>

        {/* Products Grid - Mixed T-Shirts, Watches, Eyewear, and Accessories */}
        <div className="px-4 pb-6">
          <div className="grid grid-cols-2 gap-4">
            {filterProductsBySearch([...tshirts, ...watchesMobile, ...eyewear, ...accessoriesMobile]).map((product) => {
              const productId = product._id || product.id;
              const productImage = product.image || product.images?.[0] || product.thumbnail || 'https://via.placeholder.com/200';
              const productName = product.name || product.productName || 'Product';
              const productPrice = product.finalPrice || product.price || 0;
              const originalPrice = product.originalPrice || product.mrp || product.price || 0;
              const hasDiscount = originalPrice > productPrice && productPrice > 0;
              const discountPercent = hasDiscount && originalPrice > 0 
                ? Math.round(((originalPrice - productPrice) / originalPrice) * 100) 
                : 0;
              
              // Determine product category for routing
              const productCategory = product.category?.toLowerCase().includes('watch') ? 'watches' :
                                    product.category?.toLowerCase().includes('lens') ? 'lenses' :
                                    product.category?.toLowerCase().includes('accessor') ? 'accessories' :
                                    product.category?.toLowerCase().includes('tshirt') || product.subCategory === 'tshirt' ? 'women' :
                                    'product';

              return (
                <div key={productId} className="bg-white rounded-xl shadow-sm border border-[#E0D8CE] overflow-hidden relative">
                  {/* Discount Badge */}
                  {hasDiscount && discountPercent > 0 && (
                    <div className="absolute top-2 right-2 z-10 bg-[#D91C1C] text-white px-2.5 py-1 rounded-full flex items-center border border-white/70">
                      <span className="text-xs font-bold">{discountPercent}% OFF</span>
                    </div>
                  )}

                  {/* Product Image */}
                  <Link to={`/product/${productCategory}/${productId}`}>
                    <div className="w-full aspect-square bg-gray-100 overflow-hidden">
                      <img
                        src={optimizeImageUrl(productImage, 50)}
                        alt={productName}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.src = 'https://via.placeholder.com/200';
                        }}
                      />
                    </div>
                  </Link>

                  {/* Product Info */}
                  <div className="p-3 pr-12">
                    <Link to={`/product/${productCategory}/${productId}`}>
                      <h4 className="text-sm font-semibold text-gray-800 mb-1 line-clamp-1">{productName}</h4>
                    </Link>
                    <p className="text-base font-bold text-gray-900 mb-3">{formatPriceWithCurrency(productPrice)}</p>

                    {/* Add to Cart (icon, bottom-right) */}
                    <button
                      onClick={() => handleAddToCart(product)}
                      aria-label={`Add ${productName} to cart`}
                      className="absolute bottom-3 right-3 w-11 h-11 rounded-full bg-[#1A2F2A] text-white flex items-center justify-center hover:bg-[#2B6B5A] hover:text-[#1A2F2A] transition-colors shadow-sm"
                    >
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* --- HERO BANNER --- */}
      <section className="w-full">
        {/* Desktop banner */}
        <img
          src="https://res.cloudinary.com/dzd47mpdo/image/upload/v1774009093/sale_products_1_oaenoj.png"
          alt="Sale Products Banner"
          width={1921}
          height={791}
          className="w-full h-auto hidden md:block"
          loading="eager"
        />
        {/* Mobile banner */}
        
      </section>

      {/* --- DESKTOP: Search + Categories Dropdown + Products (like mobile view) --- */}
      <div className="hidden md:block bg-white">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 py-6 sm:py-10">
          {/* Search Bar */}
          <div className="relative mb-6">
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-4 pr-14 py-3 bg-[#F5F0E8] rounded-full text-[#1A2F2A] placeholder-[#8B9A95] focus:outline-none focus:ring-2 focus:ring-[#2B6B5A]"
            />
            <button className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center bg-[#2B6B5A] rounded-full">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>

          {/* Categories Section */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Categories</h3>
            <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => {
                    if (cat.id === 'All') {
                      setOpenDropdown(null);
                      navigate('/new-arrival');
                      return;
                    }

                    if (!cat.subItems?.length) {
                      setOpenDropdown(null);
                      navigate(cat.path);
                      return;
                    }

                    setOpenDropdown(openDropdown === cat.id ? null : cat.id);
                  }}
                  className={`flex-shrink-0 px-4 py-2 rounded-lg font-medium text-sm transition-colors whitespace-nowrap flex items-center gap-1.5 ${
                    openDropdown === cat.id
                      ? 'bg-[#1A2F2A] text-white'
                      : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  {cat.label}
                  {cat.subItems?.length && (
                    <svg
                      className={`w-3.5 h-3.5 transition-transform ${openDropdown === cat.id ? 'rotate-180' : ''}`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  )}
                </button>
              ))}
            </div>

            {/* Subcategories Section */}
            {openDropdown && categories.find(cat => cat.id === openDropdown)?.subItems && (
              <div className="mt-3 bg-white border border-[#E0D8CE] rounded-lg shadow-sm p-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-sm font-semibold text-gray-800">
                    {categories.find(cat => cat.id === openDropdown)?.label}
                  </h4>
                  <button
                    onClick={() => setOpenDropdown(null)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                  {categories
                    .find(cat => cat.id === openDropdown)
                    ?.subItems.map((subItem, index) => (
                      <Link
                        key={index}
                        to={subItem.path}
                        onClick={() => setOpenDropdown(null)}
                        className="group relative overflow-hidden rounded-xl border border-[#E0D8CE] bg-white/60 hover:border-[#2B6B5A] transition-colors shadow-sm"
                      >
                        <div className="relative w-full aspect-[4/3] bg-[#F5F0E8]">
                          <img
                            src={optimizeImageUrl(getSubItemImage(subItem), 50)}
                            alt={subItem.name}
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                            loading="lazy"
                            onError={(e) => {
                              e.currentTarget.src = `https://via.placeholder.com/400x300?text=${encodeURIComponent(subItem.name || 'Category')}`;
                            }}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                          <div className="absolute bottom-0 left-0 right-0 p-3">
                            <div className="text-[10px] sm:text-[11px] font-bold text-white uppercase tracking-[0.06em] line-clamp-1">
                              {subItem.name}
                            </div>
                            {getSubItemSubtitle(subItem) ? (
                              <div className="text-[10px] text-white/80 mt-0.5 line-clamp-1">
                                {getSubItemSubtitle(subItem)}
                              </div>
                            ) : null}
                          </div>
                        </div>
                      </Link>
                    ))}
                </div>
              </div>
            )}
          </div>

          <div className="px-4 -mb-2 mt-2">
            <h3 className="text-lg font-semibold text-gray-800">
              {getActiveCategoryTitle()}
            </h3>
          </div>

          {/* Products Grid */}
          <div className="pb-6">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {filterProductsBySearch([...tshirts, ...watchesMobile, ...eyewear, ...accessoriesMobile]).map((product) => {
                const productId = product._id || product.id;
                const productImage = product.image || product.images?.[0] || product.thumbnail || 'https://via.placeholder.com/200';
                const productName = product.name || product.productName || 'Product';
                const productPrice = product.finalPrice || product.price || 0;
                const originalPrice = product.originalPrice || product.mrp || product.price || 0;
                const hasDiscount = originalPrice > productPrice && productPrice > 0;
                const discountPercent = hasDiscount && originalPrice > 0
                  ? Math.round(((originalPrice - productPrice) / originalPrice) * 100)
                  : 0;

                // Determine product category for routing
                const productCategory = product.category?.toLowerCase().includes('watch') ? 'watches' :
                  product.category?.toLowerCase().includes('lens') ? 'lenses' :
                    product.category?.toLowerCase().includes('accessor') ? 'accessories' :
                      product.category?.toLowerCase().includes('tshirt') || product.subCategory === 'tshirt' ? 'women' :
                        'product';

                return (
                  <div key={productId} className="bg-white rounded-xl shadow-sm border border-[#E0D8CE] overflow-hidden relative">
                    {hasDiscount && discountPercent > 0 && (
                      <div className="absolute top-2 right-2 z-10 bg-[#D91C1C] text-white px-2.5 py-1 rounded-full flex items-center border border-white/70">
                        <span className="text-xs font-bold">{discountPercent}% OFF</span>
                      </div>
                    )}

                    <Link to={`/product/${productCategory}/${productId}`}>
                      <div className="w-full aspect-square bg-gray-100 overflow-hidden">
                        <img
                          src={optimizeImageUrl(productImage, 50)}
                          alt={productName}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.src = 'https://via.placeholder.com/200';
                          }}
                        />
                      </div>
                    </Link>

                    <div className="p-3 pr-12">
                      <Link to={`/product/${productCategory}/${productId}`}>
                        <h4 className="text-sm font-semibold text-gray-800 mb-1 line-clamp-1">{productName}</h4>
                      </Link>
                      <p className="text-base font-bold text-gray-900 mb-3">{formatPriceWithCurrency(productPrice)}</p>

                      <button
                        onClick={() => handleAddToCart(product)}
                        aria-label={`Add ${productName} to cart`}
                        className="absolute bottom-3 right-3 w-11 h-11 rounded-full bg-[#1A2F2A] text-white flex items-center justify-center hover:bg-[#2B6B5A] hover:text-[#1A2F2A] transition-colors shadow-sm"
                      >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* --- NEW FASHION SALE PROMOTIONAL BANNER --- */}
      

      {/* --- SHOP BY CATEGORY SECTION --- */}
      <div className="py-10 sm:py-14 lg:py-20 bg-white md:hidden">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10">
          {/* Section Header — COLLUSION style */}
          <div className="mb-8 sm:mb-10 flex items-end justify-between">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#8B9A95] mb-2">Browse</p>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#1A2F2A] tracking-tight">
                Catalog
              </h2>
            </div>
            <Link to="/women" className="hidden sm:inline-block text-[10px] font-bold uppercase tracking-[0.12em] text-[#1A2F2A] border-b-2 border-[#1A2F2A] pb-0.5 hover:border-[#C4A265] transition-colors">
              View All
            </Link>
          </div>

          {/* Category Carousel - Horizontal Scroll */}
          <div className="relative">
            <div className="overflow-x-auto scrollbar-hide pb-4">
              <div className="flex gap-3 sm:gap-4 lg:gap-5" style={{ width: 'max-content' }}>
                
                {/* Category 1 - Women's Fashion */}
                <Link 
                  to="/women" 
                  className="group relative flex-shrink-0 w-36 sm:w-44 lg:w-52 overflow-hidden"
                >
                  <div className="relative w-full aspect-[3/4] bg-[#F5F0E8]">
                    <img
                      src={optimizeImageUrl('https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=500&fit=crop', 50)}
                      alt="Fashion"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => { e.target.src = 'https://via.placeholder.com/400x500?text=Fashion'; }}
                    />
                  </div>
                  <div className="mt-3">
                    <h3 className="text-[11px] font-bold text-[#1A2F2A] uppercase tracking-[0.06em]">Fashion</h3>
                  </div>
                </Link>

                {/* Category 2 - Sale */}
                <Link 
                  to="/sale" 
                  className="group relative flex-shrink-0 w-36 sm:w-44 lg:w-52 overflow-hidden"
                >
                  <div className="relative w-full aspect-[3/4] bg-[#F5F0E8]">
                    <img
                      src={optimizeImageUrl('https://images.unsplash.com/photo-1607082349566-187342175e2f?w=400&h=500&fit=crop', 50)}
                      alt="Sale"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => { e.target.src = 'https://via.placeholder.com/400x500?text=Sale'; }}
                    />
                    <span className="absolute top-2 left-2 bg-[#2B6B5A] text-[#1A2F2A] text-[9px] font-bold uppercase tracking-wider px-2 py-1">Sale</span>
                  </div>
                  <div className="mt-3">
                    <h3 className="text-[11px] font-bold text-[#1A2F2A] uppercase tracking-[0.06em]">Sale</h3>
                  </div>
                </Link>

                {/* Category 3 - Shoes */}
                <Link to="/shoes" className="group relative flex-shrink-0 w-36 sm:w-44 lg:w-52 overflow-hidden">
                  <div className="relative w-full aspect-[3/4] bg-[#F5F0E8]">
                    <img src={optimizeImageUrl('https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=500&fit=crop', 50)} alt="Shoes"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => { e.target.src = 'https://via.placeholder.com/400x500?text=Shoes'; }} />
                  </div>
                  <div className="mt-3"><h3 className="text-[11px] font-bold text-[#1A2F2A] uppercase tracking-[0.06em]">Shoes</h3></div>
                </Link>

                {/* Category 4 - Watches */}
                <Link to="/watches" className="group relative flex-shrink-0 w-36 sm:w-44 lg:w-52 overflow-hidden">
                  <div className="relative w-full aspect-[3/4] bg-[#F5F0E8]">
                    <img src={optimizeImageUrl('https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=500&fit=crop', 50)} alt="Watches"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => { e.target.src = 'https://via.placeholder.com/400x500?text=Watches'; }} />
                  </div>
                  <div className="mt-3"><h3 className="text-[11px] font-bold text-[#1A2F2A] uppercase tracking-[0.06em]">Watches</h3></div>
                </Link>

                {/* Category 5 - Eyewear */}
                <Link to="/lenses" className="group relative flex-shrink-0 w-36 sm:w-44 lg:w-52 overflow-hidden">
                  <div className="relative w-full aspect-[3/4] bg-[#F5F0E8]">
                    <img src={optimizeImageUrl('https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=500&fit=crop', 50)} alt="Eyewear"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => { e.target.src = 'https://via.placeholder.com/400x500?text=Eyewear'; }} />
                  </div>
                  <div className="mt-3"><h3 className="text-[11px] font-bold text-[#1A2F2A] uppercase tracking-[0.06em]">Eyewear</h3></div>
                </Link>

                {/* Category 6 - Skincare */}
                <Link to="/skincare" className="group relative flex-shrink-0 w-36 sm:w-44 lg:w-52 overflow-hidden">
                  <div className="relative w-full aspect-[3/4] bg-[#F5F0E8]">
                    <img src={optimizeImageUrl('https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=400&h=500&fit=crop', 50)} alt="Skincare"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => { e.target.src = 'https://via.placeholder.com/400x500?text=Skincare'; }} />
                  </div>
                  <div className="mt-3"><h3 className="text-[11px] font-bold text-[#1A2F2A] uppercase tracking-[0.06em]">Skincare</h3></div>
                </Link>

                {/* Category 7 - Earrings */}
                <Link to="/accessories?subCategory=earrings" className="group relative flex-shrink-0 w-36 sm:w-44 lg:w-52 overflow-hidden">
                  <div className="relative w-full aspect-[3/4] bg-[#F5F0E8]">
                    <img src={optimizeImageUrl('https://images.unsplash.com/photo-1594223274512-ad4803739b7c?w=400&h=500&fit=crop', 50)} alt="Earrings"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => { e.target.src = 'https://via.placeholder.com/400x500?text=Earrings'; }} />
                  </div>
                  <div className="mt-3"><h3 className="text-[11px] font-bold text-[#1A2F2A] uppercase tracking-[0.06em]">Earrings</h3></div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- THREE COLUMN PRODUCT SECTIONS --- */}
      <div className="relative w-full bg-white border-t border-[#E0D8CE]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 lg:py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {/* Column 1: Women's Fashion */}
            <Link to="/women" className="relative group overflow-hidden bg-white border border-[#E0D8CE] luxury-shadow transition-all duration-300">
              {/* Content */}
              <div className="relative z-10 p-4 sm:p-5 lg:p-6">
                {/* Brand/Logo */}
                <div className="mb-4 bg-transparent">
                  <img 
                    src={optimizeImageUrl('https://res.cloudinary.com/dzd47mpdo/image/upload/v1774001804/copy_of_0bfce75b-bbe6-4982-bc33-57feb8587b8c_531e09.png', 50)}
                    alt="Sanskrutee Logo"
                    className="h-8 sm:h-10 w-auto object-contain mb-2"
                    style={{ backgroundColor: 'transparent', background: 'transparent' }}
                  />
                  <h2 className="text-lg sm:text-xl md:text-2xl font-bold" style={{ color: '#1A2F2A' }}>
                    Women's Fashion
                  </h2>
                </div>
                
                {/* Products Display */}
                <div className="space-y-2.5 sm:space-y-3">
                  {womenItems.slice(0, isMobile ? 2 : 4).map((product, idx) => {
                    // Handle images - support array, object, or string formats
                    let imageUrl = null;
                    if (product.images) {
                      if (Array.isArray(product.images) && product.images.length > 0) {
                        imageUrl = product.images[0];
                      } else if (typeof product.images === 'object') {
                        imageUrl = product.images.image1 || product.images.image2 || product.images.image3 || product.images.image4;
                      } else if (typeof product.images === 'string') {
                        imageUrl = product.images;
                      }
                    }
                    if (!imageUrl) {
                      imageUrl = product.image || product.imageUrl || product.thumbnail;
                    }
                    
                    return (
                      <div key={product.id || product._id || idx} className="flex items-center gap-2.5 sm:gap-3 p-2.5 sm:p-3 border border-[#1A2F2A]/20 hover:border-[#1A2F2A]/40 transition-colors" style={{ backgroundColor: '#FAF6F0' }}>
                        {/* Red accent line */}
                        <div className="absolute left-0 w-0.5 h-full" style={{ backgroundColor: '#2B6B5A' }}></div>
                        <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-18 md:h-18 flex-shrink-0 overflow-hidden flex items-center justify-center border border-[#1A2F2A]/20">
                          {imageUrl ? (
                            <img
                              src={optimizeImageUrl(imageUrl, 50)}
                              alt={product.name || product.productName || 'Product'}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                e.target.style.display = 'none';
                                e.target.nextSibling.style.display = 'flex';
                              }}
                            />
                          ) : null}
                          <div className="w-full h-full flex items-center justify-center text-[8px] sm:text-[9px]" style={{ display: imageUrl ? 'none' : 'flex', backgroundColor: '#FAF6F0', color: '#1A2F2A' }}>
                            No Image
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs sm:text-sm font-semibold mb-0.5 line-clamp-1" style={{ color: '#1A2F2A' }}>
                            {product.name || product.productName || 'Product'}
                          </p>
                          <p className="text-sm sm:text-base font-bold" style={{ color: '#2B6B5A' }}>
                            ₹{product.finalPrice || product.price || '0'}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
                
                {/* CTA */}
                <div className="mt-4 pt-3 border-t border-[#1A2F2A]/20">
                  <span className="text-xs sm:text-sm font-semibold uppercase tracking-wide" style={{ color: '#1A2F2A' }}>
                    Shop Now →
                  </span>
                </div>
              </div>
            </Link>

          {/* Column 2: Skincare */}
          <Link to="/skincare" className="relative group overflow-hidden bg-white border border-[#E0D8CE] luxury-shadow transition-all duration-300">
            {/* Content */}
            <div className="relative z-10 p-4 sm:p-5 lg:p-6">
              {/* Brand/Logo */}
              <div className="mb-4 bg-transparent">
                <img 
                  src="https://res.cloudinary.com/dzd47mpdo/image/upload/v1774001804/copy_of_0bfce75b-bbe6-4982-bc33-57feb8587b8c_531e09.png"
                  alt="Sanskrutee Logo"
                  className="h-8 sm:h-10 w-auto object-contain mb-2"
                  style={{ backgroundColor: 'transparent', background: 'transparent' }}
                />
                <h2 className="text-lg sm:text-xl md:text-2xl font-bold" style={{ color: '#1A2F2A' }}>
                  Skincare Essentials
                </h2>
                <p className="text-xs sm:text-sm mt-1" style={{ color: '#1A2F2A', opacity: 0.7 }}>Nourish & Glow</p>
              </div>
              
              {/* Products Display */}
              <div className="space-y-2.5 sm:space-y-3">
                {skincareProducts.slice(0, isMobile ? 2 : 4).map((product, idx) => (
                  <div key={product.id || product._id || idx} className="flex items-center gap-2.5 sm:gap-3 p-2.5 sm:p-3 border border-[#1A2F2A]/20 hover:border-[#1A2F2A]/40 transition-colors" style={{ backgroundColor: '#FAF6F0' }}>
                    {/* Red accent line */}
                    <div className="absolute left-0 w-0.5 h-full" style={{ backgroundColor: '#2B6B5A' }}></div>
                    <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-18 md:h-18 flex-shrink-0 overflow-hidden flex items-center justify-center border border-[#1A2F2A]/20">
                      <img
                        src={product.image || product.imageUrl || 'https://via.placeholder.com/80'}
                        alt={product.name || product.productName || 'Product'}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.nextSibling.style.display = 'flex';
                        }}
                      />
                      <div className="w-full h-full flex items-center justify-center text-[8px] sm:text-[9px]" style={{ display: 'none', backgroundColor: '#FAF6F0', color: '#1A2F2A' }}>
                        No Image
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs sm:text-sm font-semibold mb-0.5 line-clamp-1" style={{ color: '#1A2F2A' }}>
                        {product.name || product.productName || 'Product'}
                      </p>
                      <p className="text-sm sm:text-base font-bold" style={{ color: '#2B6B5A' }}>
                        ₹{product.finalPrice || product.price || '0'}
                      </p>
                    </div>
                  </div>
            ))}
          </div>
              
              {/* CTA */}
              <div className="mt-4 pt-3 border-t border-[#1A2F2A]/20">
                <span className="text-xs sm:text-sm font-semibold uppercase tracking-wide" style={{ color: '#1A2F2A' }}>
                  Explore →
                </span>
        </div>
            </div>
          </Link>

          {/* Column 3: Earrings & Watches */}
          <Link to="/accessories?subCategory=earrings" className="relative group overflow-hidden bg-white border border-[#E0D8CE] luxury-shadow transition-all duration-300">
            {/* Content */}
            <div className="relative z-10 p-4 sm:p-5 lg:p-6">
              {/* Brand/Logo */}
              <div className="mb-4 bg-transparent">
                <img 
                  src="https://res.cloudinary.com/dzd47mpdo/image/upload/v1774001804/copy_of_0bfce75b-bbe6-4982-bc33-57feb8587b8c_531e09.png"
                  alt="Sanskrutee Logo"
                  className="h-8 sm:h-10 w-auto object-contain mb-2"
                  style={{ backgroundColor: 'transparent', background: 'transparent' }}
                />
                <h2 className="text-lg sm:text-xl md:text-2xl font-bold" style={{ color: '#1A2F2A' }}>
                  Earrings
                </h2>
                <p className="text-xs sm:text-sm mt-1" style={{ color: '#1A2F2A', opacity: 0.7 }}>Elegant Earrings</p>
      </div>
              
              {/* Products Display */}
              <div className="space-y-2.5 sm:space-y-3">
                {(isMobile 
                  ? [...watches.slice(0, 1), ...accessories.slice(0, 1)]
                  : [...watches.slice(0, 2), ...accessories.slice(0, 2)]
                ).map((product, idx) => {
                  // Handle images - support array, object, or string formats
                  let imageUrl = null;
                  if (product.images) {
                    if (Array.isArray(product.images) && product.images.length > 0) {
                      imageUrl = product.images[0];
                    } else if (typeof product.images === 'object') {
                      imageUrl = product.images.image1 || product.images.image2 || product.images.image3 || product.images.image4;
                    } else if (typeof product.images === 'string') {
                      imageUrl = product.images;
                    }
                  }
                  if (!imageUrl) {
                    imageUrl = product.image || product.imageUrl || product.thumbnail;
                  }
                  
                  return (
                    <div key={product.id || product._id || idx} className="flex items-center gap-2.5 sm:gap-3 p-2.5 sm:p-3 border border-[#1A2F2A]/20 hover:border-[#1A2F2A]/40 transition-colors" style={{ backgroundColor: '#FAF6F0' }}>
                      {/* Red accent line */}
                      <div className="absolute left-0 w-0.5 h-full" style={{ backgroundColor: '#2B6B5A' }}></div>
                      <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-18 md:h-18 flex-shrink-0 overflow-hidden flex items-center justify-center border border-[#1A2F2A]/20">
                        {imageUrl ? (
                          <img
                            src={imageUrl}
                            alt={product.name || product.productName || 'Product'}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.target.style.display = 'none';
                              e.target.nextSibling.style.display = 'flex';
                            }}
                          />
                        ) : null}
                        <div className="w-full h-full flex items-center justify-center text-[8px] sm:text-[9px]" style={{ display: imageUrl ? 'none' : 'flex', backgroundColor: '#FAF6F0', color: '#1A2F2A' }}>
                          No Image
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs sm:text-sm font-semibold mb-0.5 line-clamp-1" style={{ color: '#1A2F2A' }}>
                          {product.name || product.productName || 'Product'}
                        </p>
                        <p className="text-sm sm:text-base font-bold" style={{ color: '#2B6B5A' }}>
                          ₹{product.finalPrice || product.price || '0'}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
              
              {/* CTA */}
              <div className="mt-4 pt-3 border-t border-[#1A2F2A]/20">
                <span className="text-xs sm:text-sm font-semibold uppercase tracking-wide" style={{ color: '#1A2F2A' }}>
                  Discover →
                </span>
              </div>
            </div>
          </Link>
        </div>
        </div>
      </div>

      {/* --- BANNER IMAGES SECTION --- */}
      <div className="w-full bg-white border-t border-[#E0D8CE]">
        <div className="flex flex-col md:flex-row gap-0">
          {/* First Banner - Sale */}
          <Link 
            to="/sale" 
            className="flex-1 w-full md:w-1/2 overflow-hidden hover:opacity-95 transition-opacity"
          >
            <img
              src={optimizeImageUrl('https://res.cloudinary.com/dvkxgrcbv/image/upload/v1767171485/Mobile_Banner_resize_7_gyz5xo.jpg', 50)}
              alt="Sale Banner"
              className="w-full h-auto object-cover"
            />
          </Link>
          
          {/* Second Banner - Shirts */}
          <Link 
            to="/women/shirt" 
            className="flex-1 w-full md:w-1/2 overflow-hidden hover:opacity-95 transition-opacity"
          >
            <img
              src={optimizeImageUrl('https://res.cloudinary.com/dvkxgrcbv/image/upload/v1767171505/Mobile_Banner_resize_6_ybv1ud.jpg', 50)}
              alt="Shirts Banner"
              className="w-full h-auto object-cover"
            />
          </Link>
        </div>
      </div>

      {/* --- THE BEST OF SKINCARE SECTION (Luxury Style) --- */}
      <div className="bg-white py-8 sm:py-10 lg:py-12 xl:py-14 border-t border-[#E0D8CE]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          {/* Section Header */}
          <div className="text-center mb-6 sm:mb-8 lg:mb-10">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold mb-2" style={{ color: '#1A2F2A' }}>THE BEST OF SKINCARE</h2>
            <p className="text-xs sm:text-sm lg:text-base" style={{ color: '#1A2F2A', opacity: 0.7 }}>Curated premium skincare collection</p>
          </div>

          {/* Skincare Products Grid */}
          {skincareProducts.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 lg:gap-5">
              {skincareProducts.slice(0, windowWidth < 640 ? 14 : 16).map((product, index) => {
                // Group products by brand for better display
                const brandName = product.brand || 'Skincare';
                const discount = product.discountPercent || 0;
                const offerText = discount > 0 
                  ? `Up to ${discount}% Off` 
                  : index % 3 === 0 
                    ? 'New Launch!' 
                    : index % 3 === 1 
                      ? 'Free Gift with Orders' 
                      : 'Limited Edition';
                
                // Luxury background styles
                const bgStyles = [
                  'bg-gradient-to-br from-[#FAF6F0] via-[#F5F0E8] to-[#FAF6F0]',
                  'bg-gradient-to-br from-[#F5F0E8] via-[#FAF6F0] to-[#E0D8CE]',
                  'bg-gradient-to-br from-[#FAF6F0] via-[#E0D8CE] to-[#F5F0E8]',
                  'bg-gradient-to-br from-[#E0D8CE] via-[#FAF6F0] to-[#F5F0E8]',
                  'bg-gradient-to-br from-[#F5F0E8] via-[#E0D8CE] to-[#FAF6F0]',
                ];
                const bgStyle = bgStyles[index % bgStyles.length];

                return (
                  <div
                    key={product.id || product._id || index}
                    className="group relative overflow-hidden rounded border border-[#E0D8CE] luxury-shadow transition-all duration-300 bg-white"
                  >
                    {/* Card Background with Gradient */}
                    <div className={`relative ${bgStyle} p-3 sm:p-4 flex flex-col h-full`}>
                      {/* Brand Badge */}
                      <div className="absolute top-2 left-2 bg-white/95 backdrop-blur-sm px-2 py-0.5 rounded text-[8px] sm:text-[9px] font-bold uppercase tracking-wide z-10 border border-[#1A2F2A]/20" style={{ color: '#1A2F2A' }}>
                        {brandName.length > 12 ? brandName.substring(0, 12) + '...' : brandName}
                      </div>

                      {/* Product Image - Clickable Link */}
                      <Link
                        to={`/skincare/${product.id || product._id}`}
                        className="flex-1 flex items-center justify-center mt-6 sm:mt-8 mb-3"
                      >
                        <img
                          src={optimizeImageUrl(product.image || product.imageUrl || product.images?.[0], 50)}
                          alt={product.name || product.productName}
                          className="max-w-full max-h-24 sm:max-h-28 md:max-h-32 lg:max-h-36 object-contain"
                          onError={(e) => handleImageError(e, 300, 300)}
                        />
                      </Link>

                      {/* Product Info - Clickable Link */}
                      <Link
                        to={`/skincare/${product.id || product._id}`}
                        className="mt-auto space-y-1"
                      >
                        <p className="text-xs sm:text-sm font-semibold line-clamp-2 min-h-[2.5em]" style={{ color: '#1A2F2A' }}>
                          {product.name || product.productName}
                        </p>
                        <p className="text-[8px] sm:text-[9px] font-bold uppercase tracking-wide" style={{ color: '#2B6B5A' }}>
                          {offerText}
                        </p>
                      </Link>

                      {/* Add to Cart Button */}
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          handleAddToCart(product);
                        }}
                        className="mt-2 w-full py-1.5 sm:py-2 px-2 sm:px-3 text-[9px] sm:text-[10px] font-semibold rounded transition-all duration-200 flex items-center justify-center gap-1 sm:gap-1.5"
                        style={{ 
                          backgroundColor: '#2B6B5A', 
                          color: '#FAF6F0' 
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.backgroundColor = '#1A2F2A';
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.backgroundColor = '#2B6B5A';
                        }}
                      >
                        <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        <span>Add to Cart</span>
                      </button>

                      {/* Hover Overlay Effect */}
                    </div>
                  </div>
                );
              })}
        </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-text-muted">Loading skincare products...</p>
      </div>
          )}

          {/* View All Button */}
          {skincareProducts.length > 0 && (
            <div className="text-center mt-6 sm:mt-8 lg:mt-10">
              <Link
                to="/skincare"
                className="inline-flex items-center gap-2 px-6 py-2.5 border border-[#E0D8CE] text-sm font-semibold transition-colors luxury-shadow"
                style={{ backgroundColor: '#2B6B5A', color: '#FAF6F0' }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#1A2F2A';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = '#2B6B5A';
                }}
              >
                View All Skincare
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          )}
        </div>
      </div>

      

      {/* --- PROFESSIONAL SKINCARE SECTIONS (Legends, Hot Sellers, Combos) --- */}
      <section className="relative py-8 sm:py-10 bg-white border-t border-[#1A2F2A]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            
            {/* Left Section: SKINCARE LEGENDS */}
            <div className="relative bg-white border border-[#1A2F2A]/20 rounded-lg p-4 sm:p-5 flex flex-col shadow-sm hover:shadow-md transition-shadow">
              {/* Badge */}
              <div className="mb-3">
                <span className="inline-block px-3 py-1 text-[10px] font-bold uppercase tracking-wide bg-pink-500 text-white rounded-full">
                  ✨ NEW LAUNCH
                </span>
              </div>

              <h2 className="text-lg sm:text-xl font-bold mb-3 text-[#1A2F2A]">
                Introducing the SKINCARE LEGENDS!
              </h2>
              
              {/* Category Buttons - Compact */}
              <div className="grid grid-cols-2 gap-2 mb-4">
                <Link 
                  to="/skincare?category=serum" 
                  className="px-2 py-1.5 text-[10px] sm:text-xs font-semibold border border-[#E0D8CE] bg-white text-[#1A2F2A] hover:bg-[#2B6B5A] hover:text-white transition-colors text-center rounded"
                >
                  Pigmentation Specialist
                </Link>
                <Link 
                  to="/skincare?category=serum" 
                  className="px-2 py-1.5 text-[10px] sm:text-xs font-semibold border border-[#E0D8CE] bg-white text-[#1A2F2A] hover:bg-[#2B6B5A] hover:text-white transition-colors text-center rounded"
                >
                  Acne Fighter
                </Link>
              </div>
              
              {/* Moisturizer Section */}
              <div className="mb-4">
                <Link 
                  to="/skincare?category=moisturizer"
                  className="block w-full px-3 py-2 text-xs sm:text-sm font-semibold border border-[#E0D8CE] bg-white text-[#1A2F2A] hover:bg-[#2B6B5A] hover:text-white transition-colors text-center rounded"
                >
                  Moisturizer - Skincare
                </Link>
              </div>
              
              {/* Skincare Products */}
              <div className="mb-4">
                <p className="text-xs sm:text-sm font-semibold mb-3 text-[#1A2F2A]">
                  Premium Skincare Serums
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {skincareProducts.slice(0, 4).map((product, idx) => {
                    const imageUrl = product.image || product.imageUrl || product.images?.[0];
                    return (
                      <Link
                        key={product._id || product.id || idx}
                        to={`/skincare/${product._id || product.id}`}
                        className="w-full h-16 sm:h-20 bg-white border border-[#1A2F2A]/20 rounded overflow-hidden flex items-center justify-center hover:border-[#2B6B5A] transition-colors"
                      >
                        {imageUrl ? (
                          <img
                            src={optimizeImageUrl(imageUrl, 50)}
                            alt={product.name || product.productName}
                            className="w-full h-full object-contain p-2"
                            onError={(e) => {
                              e.target.style.display = 'none';
                              e.target.nextSibling.style.display = 'flex';
                            }}
                          />
                        ) : null}
                        <div className="w-full h-full flex items-center justify-center text-[9px] text-[#1A2F2A] p-1" style={{ display: imageUrl ? 'none' : 'flex' }}>
                          {product.name || product.productName || 'Product'}
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
              
              {/* CTA Button */}
              <Link
                to="/skincare"
                className="w-full py-2 text-xs sm:text-sm font-semibold text-center border border-[#E0D8CE] bg-white text-[#1A2F2A] hover:bg-[#2B6B5A] hover:text-white transition-colors rounded"
              >
                NEW LAUNCH
              </Link>
            </div>

            {/* Middle Section: HOT SELLERS */}
            <div className="relative bg-white border border-[#1A2F2A]/20 rounded-lg p-4 sm:p-5 flex flex-col shadow-sm hover:shadow-md transition-shadow">
              {/* Badge */}
              <div className="mb-3">
                <span className="inline-block px-3 py-1 text-[10px] font-bold uppercase tracking-wide bg-orange-500 text-white rounded-full">
                  🔥 HOT SELLERS
                </span>
              </div>

              <h2 className="text-lg sm:text-xl font-bold mb-2 text-[#1A2F2A]">
                HOT SELLERS
              </h2>
              <p className="text-xs sm:text-sm mb-4 text-[#1A2F2A]/70">
                High In Demand Secure Yours Now!
              </p>
              
              {/* Hot Sellers Skincare Products */}
              <div className="mb-4">
                <p className="text-xs sm:text-sm font-semibold mb-3 text-[#1A2F2A]">
                  Best Selling Products
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {skincareProducts.slice(4, 10).map((product, idx) => {
                    const imageUrl = product.image || product.imageUrl || product.images?.[0];
                    return (
                      <Link
                        key={product._id || product.id || idx}
                        to={`/skincare/${product._id || product.id}`}
                        className="w-full h-16 sm:h-20 bg-white border border-[#1A2F2A]/20 rounded overflow-hidden flex items-center justify-center hover:border-[#2B6B5A] transition-colors"
                      >
                        {imageUrl ? (
                          <img
                            src={optimizeImageUrl(imageUrl, 50)}
                            alt={product.name || product.productName}
                            className="w-full h-full object-contain p-2"
                            onError={(e) => {
                              e.target.style.display = 'none';
                              e.target.nextSibling.style.display = 'flex';
                            }}
                          />
                        ) : null}
                        <div className="w-full h-full flex items-center justify-center text-[9px] text-[#1A2F2A] p-1" style={{ display: imageUrl ? 'none' : 'flex' }}>
                          {product.name || product.productName || 'Product'}
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
              
              {/* CTA Button */}
              <Link
                to="/sale"
                className="w-full py-2 text-xs sm:text-sm font-semibold text-center border border-[#E0D8CE] bg-white text-[#1A2F2A] hover:bg-[#2B6B5A] hover:text-white transition-colors rounded"
              >
                Hot Sellers
              </Link>
            </div>

            {/* Right Section: Greatest Combos */}
            <div className="relative bg-white border border-[#1A2F2A]/20 rounded-lg p-4 sm:p-5 flex flex-col shadow-sm hover:shadow-md transition-shadow">
              {/* Discount Badge */}
              <div className="relative mb-3">
                <div className="absolute -left-2 -top-2 bg-[#D91C1C] border border-white shadow-lg px-3 py-1.5 transform rotate-[-12deg] z-10 rounded">
                  <span className="text-[10px] sm:text-xs font-bold text-white">UP TO 60% OFF</span>
                </div>
              </div>
              
              <h2 className="text-base sm:text-lg font-bold mb-3 text-[#1A2F2A] mt-4">
                Grab your Biggest Savings with our Greatest Combos!
              </h2>
              
              {/* Combo Skincare Products */}
              <div className="mb-4">
                <p className="text-xs sm:text-sm font-semibold mb-3 text-[#1A2F2A]">
                  Combo Products
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {skincareProducts.slice(0, 8).map((product, idx) => {
                    const imageUrl = product.image || product.imageUrl || product.images?.[0];
                    return (
                      <Link
                        key={product._id || product.id || idx}
                        to={`/skincare/${product._id || product.id}`}
                        className="w-full h-14 sm:h-16 bg-white border border-[#1A2F2A]/20 rounded overflow-hidden flex items-center justify-center hover:border-[#2B6B5A] transition-colors"
                      >
                        {imageUrl ? (
                          <img
                            src={optimizeImageUrl(imageUrl, 50)}
                            alt={product.name || product.productName}
                            className="w-full h-full object-contain p-1.5"
                            onError={(e) => {
                              e.target.style.display = 'none';
                              e.target.nextSibling.style.display = 'flex';
                            }}
                          />
                        ) : null}
                        <div className="w-full h-full flex items-center justify-center text-[8px] text-[#1A2F2A] p-1" style={{ display: imageUrl ? 'none' : 'flex' }}>
                          {product.name || product.productName || 'Product'}
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
              
              {/* CTA Button */}
              <Link
                to="/sale"
                className="w-full py-2 text-xs sm:text-sm font-semibold text-center border border-[#E0D8CE] bg-white text-[#1A2F2A] hover:bg-[#2B6B5A] hover:text-white transition-colors rounded"
              >
                Combos
              </Link>
            </div>
          </div>
        </div>
      </section>
      <div className="w-fit m-0 p-0 leading-none overflow-visible h-auto w-auto hidden lg:block">
        <img
          src="https://res.cloudinary.com/de1bg8ivx/image/upload/v1765186240/d347cf32-1980-4355-9ac5-9168cf727263.png"
          alt="Full size"
          className="block w-auto h-auto m-0 p-0 border-none outline-none"
        />
      </div>



      {/* --- PRODUCT SECTIONS (Improved Headers and Buttons) --- */}

      <ProductSection
        title="Fresh Drops"
        subtitle="Be the first to wear the trend"
        products={freshDrops}
        viewAllLink="/women/shoes"
        isLoading={isLoading}
      />
      

      <div className="w-full overflow-hidden lg:hidden">
        <img
          src="https://res.cloudinary.com/de1bg8ivx/image/upload/v1765137210/Black_Elegant_Watch_Special_Offer_Instagram_Post_y3foz1.svg"
          alt="Full size"
          className="block w-full h-auto m-0 p-0 border-none outline-none"
        />
      </div>



      {/* <ProductSection
        title="Steal Deals"
        subtitle="Premium styles at unbeatable prices"
        products={saleItems}
        viewAllLink="/sale"
        bgColor="bg-gradient-to-br from-gray-50 to-white"
        isLoading={isLoading}
      /> */}

      {/* 3. Women - Enhanced "For Her" Section */}
      <div className="relative w-full bg-gradient-to-br from-[#FAF6F0] via-[#F5F0E8] to-[#FAF6F0] py-12 sm:py-16 lg:py-20 overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-[#2B6B5A]/10 to-[#C4A265]/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-[#C4A265]/10 to-[#2B6B5A]/10 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Section */}
          <div className="text-center mb-8 sm:mb-12">
            <div className="inline-block mb-4">
              <span className="inline-block px-4 py-1.5 text-xs font-bold uppercase tracking-wider bg-[#2B6B5A] text-white rounded-full shadow-lg">
                Exclusive Collection
              </span>
            </div>
            <h2 className="text-2xl sm:text-5xl lg:text-4xl font-serif font-bold mb-4 text-[#1A2F2A]">
              For Her
            </h2>
            <p className="text-base sm:text-lg text-[#8B9A95] max-w-2xl mx-auto leading-relaxed">
              Discover our curated collection of women's fashion, designed to elevate your style and celebrate your unique beauty
            </p>
          </div>

          {/* Products Grid */}
          <div className="relative mb-10 sm:mb-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {isLoading ? (
                [1, 2, 3].map(i => (
                  <div key={i} className="animate-pulse">
                    <SkeletonCard />
                  </div>
                ))
              ) : (
                womenItems.slice(0, 3).map((p, index) => (
                  <div 
                    key={p._id} 
                    className="group relative transform transition-all duration-500 hover:-translate-y-2"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="absolute -inset-1 bg-gradient-to-r from-[#2B6B5A] via-[#C4A265] to-[#2B6B5A] rounded-2xl opacity-0 group-hover:opacity-15 blur-xl transition-opacity duration-500"></div>
                    <div className="relative">
                      <ProductCard product={p} />
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Call to Action Section */}
          <div className="relative text-center">
            <div className="inline-flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
              <Link
                to="/women"
                className="group relative px-8 py-4 text-sm sm:text-base font-bold text-white rounded-full overflow-hidden shadow-2xl transition-all duration-300 hover:shadow-[#2B6B5A]/30 bg-[#2B6B5A] hover:bg-[#1A4D3F]"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <span>Shop Women's Collection</span>
                  <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              </Link>
              
              <Link
                to="/women"
                className="px-6 py-3 text-sm sm:text-base font-semibold text-[#2B6B5A] hover:text-[#1A4D3F] transition-colors border-2 border-[#2B6B5A]/30 hover:border-[#2B6B5A] rounded-full hover:bg-[#2B6B5A]/5"
              >
                View All →
              </Link>
            </div>

            {/* Decorative Elements */}
            <div className="mt-8 flex items-center justify-center gap-2 text-[#C4A265]">
              <div className="w-12 h-px bg-gradient-to-r from-transparent via-[#C4A265] to-transparent"></div>
              <svg className="w-5 h-5 text-[#C4A265]" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <div className="w-12 h-px bg-gradient-to-r from-transparent via-[#C4A265] to-transparent"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 sm:mt-12 mb-6 sm:mb-8">
        <div className="text-center mb-6 sm:mb-8">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900">Featured Collections</h2>
          
        </div>
        <div className="grid grid-cols-1 md:grid-cols-1 gap-6 w-full max-w-2xl mx-auto">
          <Link to="/women/shirt" className="block w-full overflow-hidden rounded-xl duration-300 group">
            <img src="https://res.cloudinary.com/de1bg8ivx/image/upload/v1763492921/Black_and_White_Modern_New_Arrivals_Blog_Banner_4_x9v1lw.png" alt="Women" className="w-full h-auto block" loading="lazy" />
          </Link>
        </div>
      </div>

     

      {/* --- STORY VIEWER MODAL (Unchanged) --- */}
      {isStoryViewerOpen && activeStoryIndex !== null && (
        <div className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center" onClick={() => setIsStoryViewerOpen(false)}>
          <button onClick={(e) => { e.stopPropagation(); setIsStoryViewerOpen(false); }} className="absolute top-6 right-6 z-20 text-white/70 hover:text-white transition bg-white/10 rounded-full p-2"><IconClose /></button>

          {activeStoryIndex > 0 && <button onClick={(e) => { e.stopPropagation(); setActiveStoryIndex(activeStoryIndex - 1); }} className="absolute left-4 top-1/2 -translate-y-1/2 z-20 text-white hover:opacity-70 bg-white/10 rounded-full p-2"><IconChevronLeft /></button>}
          {activeStoryIndex < stories.length - 1 && <button onClick={(e) => { e.stopPropagation(); setActiveStoryIndex(activeStoryIndex + 1); }} className="absolute right-4 top-1/2 -translate-y-1/2 z-20 text-white hover:opacity-70 bg-white/10 rounded-full p-2"><IconChevronRight /></button>}

          <div className="relative w-full h-full max-w-md mx-auto flex flex-col items-center justify-center" onClick={(e) => e.stopPropagation()}>
            <div className="absolute top-4 left-4 right-4 flex gap-1 z-20">
              {stories.map((_, index) => (
                <div key={index} className={`h-1 rounded-full flex-1 transition-all duration-300 ${index <= activeStoryIndex ? 'bg-white' : 'bg-white/30'}`} />
              ))}
            </div>
            <img src={stories[activeStoryIndex].image} alt={stories[activeStoryIndex].hashtag} className="w-full h-full object-contain max-h-[85vh] rounded-lg" />
            <div className="absolute bottom-20 text-center bg-black/50 px-6 py-2 rounded-full backdrop-blur-sm">
              <span className="text-xl font-bold text-white">{stories[activeStoryIndex].hashtag} {stories[activeStoryIndex].emoji}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// --- REUSABLE SUB-COMPONENTS ---

const SkeletonCard = () => <div className="h-64 bg-gray-200 animate-pulse rounded-xl"></div>;

const ProductSection = ({ title, subtitle, products, viewAllLink, bgColor = 'bg-white', isLoading }) => {
  return (
    <section className={`py-8 sm:py-12 md:py-16 ${bgColor}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-6 sm:mb-8 border-b pb-3 sm:pb-4 border-[#E0D8CE]">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900">{title}</h2>
            {subtitle && <p className="text-sm sm:text-base text-gray-500 mt-1">{subtitle}</p>}
          </div>
          {viewAllLink && (
            <Link
              to={viewAllLink}
              className="mt-3 sm:mt-0 inline-block px-4 sm:px-6 py-2 text-sm sm:text-base rounded-full border border-gray-300 font-semibold text-white bg-gray-900 hover:bg-gray-900 hover:text-white hover:border-transparent transform"
            >
              View All
            </Link>
          )}
        </div>

        {isLoading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
            {[1, 2, 3, 4].map(i => <SkeletonCard key={i} />)}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
            {products && products.length > 0 ? (
              products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))
            ) : (
              <p className="col-span-4 text-center text-gray-500 py-10">No products found.</p>
            )}
          </div>
        )}

        {/* Mobile View All Button (Visible only on small screens) */}
        {viewAllLink && (
          <div className="mt-8 text-center sm:hidden">
            <Link to={viewAllLink} className="inline-block px-8 py-3 rounded-full bg-gray-900 text-white font-semibold shadow-lg">View All</Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default Home;