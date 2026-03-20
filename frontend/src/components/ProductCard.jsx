import { useState, memo } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../components/ToastContainer';
import LoginModal from './LoginModal';
import { handleImageError } from '../utils/imageFallback';
import { formatPrice } from '../utils/formatUtils';
import { optimizeImageUrl } from '../utils/imageOptimizer';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();
  const { success, error: showError } = useToast();
  
  const [isHovered, setIsHovered] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [showSizes, setShowSizes] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [hoverImageLoaded, setHoverImageLoaded] = useState(false);

  let productImages = [];
  if (product.images) {
    if (Array.isArray(product.images)) {
      productImages = product.images.filter(img => img && img.trim() !== '');
    } else if (typeof product.images === 'object') {
      productImages = Object.values(product.images).filter(img => img && typeof img === 'string' && img.trim() !== '');
    }
  }
  
  if (productImages.length === 0) {
    const fallbackImage = product.image || product.thumbnail || product.images?.image1;
    if (fallbackImage) {
      productImages = [fallbackImage];
    }
  }
  
  const isWatch = (product.category || '').toLowerCase().includes('watch');
  const isLens = (product.category || '').toLowerCase().includes('lens');
  const isJeans = (product.subCategory || '').toLowerCase().includes('jeans');
  const sizes = isWatch ? [] : (product.sizes || ['S', 'M', 'L', 'XL']); 
  const finalPrice = product.finalPrice || product.price || product.mrp || 0;
  const originalPrice = product.originalPrice || product.mrp || product.price || 0;
  const hasDiscount = originalPrice > finalPrice && finalPrice > 0;
  const discountPercent = hasDiscount && originalPrice > 0 
    ? Math.round(((originalPrice - finalPrice) / originalPrice) * 100) 
    : 0;
  const productId = product._id || product.id;
  
  const getCategoryForUrl = () => {
    const category = (product.category || '').toLowerCase();
    if (category.includes('watch')) return 'watches';
    if (category.includes('lens')) return 'lenses';
    if (category.includes('skincare') || category.includes('skin-care')) return 'skincare';
    if (category.includes('accessor')) return 'accessories';
    if (category.includes('women') || category.includes('saree')) return 'women';
    if (category.includes('shoe')) return 'shoes';
    return 'product';
  };
  const productCategory = getCategoryForUrl();
  
  const isBestseller = product.isBestseller || product.bestseller || false;
  const isSoldOut = product.stock === 0 || product.quantity === 0 || product.inStock === false;

  let defaultImageIndex = 0;
  if (isLens && productImages.length > 1) {
    defaultImageIndex = 1;
  }
  
  let defaultImageSrc = 'https://via.placeholder.com/400x500?text=No+Image';
  let hoverImageSrc = null;
  
  if (productImages.length > 0) {
    defaultImageSrc = productImages[defaultImageIndex];
    const hoverIndex = defaultImageIndex + 1;
    if (productImages.length > hoverIndex) {
      hoverImageSrc = productImages[hoverIndex];
    } else if (productImages.length > 0 && defaultImageIndex > 0) {
      hoverImageSrc = productImages[0];
    }
  }

  const handleAddClick = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    const selectedSize = sizes.length > 0 ? sizes[0] : '';
    
    if (!isAuthenticated) {
      setShowLoginModal(true);
      return;
    }
    
    setIsAdding(true);
    try {
      await addToCart(product, 1, selectedSize, '');
      success('Product added to cart');
      setIsAdding(false);
      setShowSizes(false);
    } catch (err) {
      setIsAdding(false);
      setShowSizes(false);
      const errorMessage = err.message || 'Failed to add product to cart';
      showError(errorMessage);
      if (errorMessage.toLowerCase().includes('login')) {
        setShowLoginModal(true);
      }
    }
  };

  return (
    <>
      <LoginModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />
      
      <div 
        className="group relative w-full select-none" 
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false);
          if (window.matchMedia('(min-width: 768px)').matches) {
            setShowSizes(false);
          }
        }}
      >
        <Link
          to={`/product/${productCategory}/${productId}`}
          className="block bg-white border border-[#E0D8CE] transition-all duration-200 hover:border-[#2B6B5A]"
        >
          
          {/* IMAGE — clean, square, white bg */}
          <div className="relative w-full aspect-[3/4] overflow-hidden bg-[#F5F0E8]">
            
            {/* Sale / Bestseller badge */}
            {isBestseller && (
              <span className="absolute top-2 left-2 z-20 bg-[#2B6B5A] text-white text-[9px] sm:text-[10px] font-bold px-2 py-1 uppercase tracking-wider">
                Bestseller
              </span>
            )}
            {!isBestseller && hasDiscount && (
              <span className="absolute top-2 left-2 z-20 bg-[#D91C1C] text-white text-[9px] sm:text-[10px] font-bold px-2 py-1 uppercase tracking-wider border border-white/70">
                Sale
              </span>
            )}

            {/* Quick-add button — appears on hover, bottom-right of image */}
            <button
              type="button"
              onClick={handleAddClick}
              disabled={isAdding || isSoldOut}
              className={`absolute bottom-2 right-2 z-30 w-10 h-10 rounded-full bg-[#2B6B5A] text-white flex items-center justify-center transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed ${
                isHovered ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
              }`}
              aria-label="Add to cart"
            >
              <span className="sr-only">
                {isAdding ? 'Adding...' : isSoldOut ? 'Sold Out' : 'Quick Add'}
              </span>
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </button>

            {/* Base Image */}
            {defaultImageSrc && (
              <img
                src={defaultImageSrc}
                alt={product.name || product.title || 'Product'}
                onLoad={() => setImageLoaded(true)}
                decoding="async"
                loading="lazy"
                className={`w-full h-full object-cover transition-all duration-500 ease-out ${imageLoaded ? 'opacity-100' : 'opacity-0'} group-hover:scale-105`}
                onError={handleImageError}
              />
            )}

            {/* Hover Image */}
            {hoverImageSrc && (
              <>
                <img src={hoverImageSrc} alt="" className="hidden" onLoad={() => setHoverImageLoaded(true)} decoding="async" />
                <img
                  src={hoverImageSrc}
                  alt={product.name || product.title || 'Product'}
                  className={`absolute inset-0 w-full h-full object-cover transition-all duration-500 ease-out ${
                    isHovered && hoverImageLoaded ? 'opacity-100 z-10' : 'opacity-0 z-0'
                  } group-hover:scale-105`}
                  onError={handleImageError}
                />
              </>
            )}
          </div>

          {/* PRODUCT INFO — minimal: name + price only (COLLUSION style) */}
          <div className="px-3 py-3 sm:px-4 sm:py-4">
            <h3 className="text-[11px] sm:text-xs font-bold text-[#1A2F2A] uppercase tracking-[0.04em] leading-tight line-clamp-1 mb-1.5">
              {(product.name || product.productName || 'Product').toUpperCase()}
            </h3>

            <div className="flex items-baseline gap-2">
              <span className="text-sm sm:text-base font-bold text-[#1A2F2A]">
                Rs. {formatPrice(finalPrice)}
              </span>
              {hasDiscount && originalPrice > 0 && (
                <span className="text-[10px] sm:text-xs text-[#8B9A95] line-through">
                  Rs. {formatPrice(originalPrice)}
                </span>
              )}
            </div>
          </div>
        </Link>
      </div>
    </>
  );
};

export default memo(ProductCard, (prev, next) => {
  return (prev.product._id || prev.product.id) === (next.product._id || next.product.id);
});
