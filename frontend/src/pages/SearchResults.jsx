import { useState, useEffect, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import FilterSidebar from '../components/FilterSidebar';
import { searchAPI, productAPI } from '../utils/api';
import { useToast } from '../components/ToastContainer';

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const { error: showError } = useToast();
  
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [filters, setFilters] = useState({
    priceRange: null,
    brands: [],
    sizes: [],
    sortBy: null,
  });
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [page, setPage] = useState(1);
  const [isMobile, setIsMobile] = useState(false);
  
  // Detect mobile viewport
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  const ITEMS_PER_PAGE = isMobile ? 22 : 12;

  useEffect(() => {
    if (query) {
      fetchSearchResults();
    }
  }, [query]);

  useEffect(() => {
    applyFilters();
  }, [products, filters]);

  const fetchSearchResults = async () => {
    setIsLoading(true);
    try {
      const response = await searchAPI.searchProducts(query);
      if (response.success) {
        const apiProducts = response.data.products || [];
        if (apiProducts.length > 0) {
          setProducts(apiProducts);
          return;
        }
      } else {
        showError('Failed to search products');
      }

      // Fallback: local whole-catalog filtering if API search returns empty
      const allProductsResponse = await productAPI.getAllProducts({ limit: 500 });
      const allProducts = Array.isArray(allProductsResponse?.data?.products)
        ? allProductsResponse.data.products
        : [];
      const queryText = String(query || '').trim().toLowerCase();

      const matched = allProducts
        .map((product) => {
          const name = String(product?.name || product?.productName || product?.title || '').toLowerCase();
          const category = String(product?.category || '').toLowerCase();
          const subCategory = String(product?.subCategory || '').toLowerCase();
          const description = String(product?.shortDescription || product?.description || '').toLowerCase();
          const brand = String(product?.brand || '').toLowerCase();
          const haystack = `${name} ${category} ${subCategory} ${description} ${brand}`;
          if (!haystack.includes(queryText)) return null;

          let score = 0;
          if (name.startsWith(queryText)) score += 7;
          if (name.includes(queryText)) score += 4;
          if (category.includes(queryText) || subCategory.includes(queryText)) score += 2;
          if (brand.includes(queryText)) score += 1;
          return { product, score };
        })
        .filter(Boolean)
        .sort((a, b) => b.score - a.score)
        .map((entry) => entry.product);

      setProducts(matched);
    } catch (error) {
      console.error('Search error:', error);
      try {
        // Fallback on API/network failure
        const allProductsResponse = await productAPI.getAllProducts({ limit: 500 });
        const allProducts = Array.isArray(allProductsResponse?.data?.products)
          ? allProductsResponse.data.products
          : [];
        const queryText = String(query || '').trim().toLowerCase();

        const matched = allProducts
          .map((product) => {
            const name = String(product?.name || product?.productName || product?.title || '').toLowerCase();
            const category = String(product?.category || '').toLowerCase();
            const subCategory = String(product?.subCategory || '').toLowerCase();
            const description = String(product?.shortDescription || product?.description || '').toLowerCase();
            const brand = String(product?.brand || '').toLowerCase();
            const haystack = `${name} ${category} ${subCategory} ${description} ${brand}`;
            if (!haystack.includes(queryText)) return null;

            let score = 0;
            if (name.startsWith(queryText)) score += 7;
            if (name.includes(queryText)) score += 4;
            if (category.includes(queryText) || subCategory.includes(queryText)) score += 2;
            if (brand.includes(queryText)) score += 1;
            return { product, score };
          })
          .filter(Boolean)
          .sort((a, b) => b.score - a.score)
          .map((entry) => entry.product);

        setProducts(matched);
      } catch (fallbackError) {
        showError('Error searching products');
        setProducts([]);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...products];

    if (filters.priceRange) {
      filtered = filtered.filter((product) => {
        const price = product.finalPrice || product.price;
        const { min, max } = filters.priceRange;
        return price >= min && (max === Infinity || price <= max);
      });
    }

    if (filters.brands.length > 0) {
      filtered = filtered.filter((product) => filters.brands.includes(product.brand));
    }

    if (filters.sizes.length > 0) {
      filtered = filtered.filter((product) => {
        if (!product.sizes || !Array.isArray(product.sizes)) return false;
        return filters.sizes.some((size) => product.sizes.includes(size));
      });
    }

    if (filters.sortBy && filters.sortBy !== 'default') {
      filtered.sort((a, b) => {
        const priceA = a.finalPrice || a.price;
        const priceB = b.finalPrice || b.price;
        switch (filters.sortBy) {
          case 'price-low-high': return priceA - priceB;
          case 'price-high-low': return priceB - priceA;
          case 'newest': return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
          default: return 0;
        }
      });
    }

    setFilteredProducts(filtered);
    setPage(1);
  };

  const brands = useMemo(() => {
    const brandSet = new Set();
    products.forEach(product => {
      if (product.brand) brandSet.add(product.brand);
    });
    return Array.from(brandSet).sort();
  }, [products]);

  const sizes = useMemo(() => {
    const sizeSet = new Set();
    products.forEach(product => {
      if (product.sizes && Array.isArray(product.sizes)) {
        product.sizes.forEach(size => sizeSet.add(size));
      }
    });
    return Array.from(sizeSet).sort();
  }, [products]);

  const priceRange = useMemo(() => {
    if (products.length === 0) {
      return { min: 0, max: 5000 };
    }
    const prices = products.map(product => product.finalPrice || product.price || 0).filter(p => p > 0);
    if (prices.length === 0) {
      return { min: 0, max: 5000 };
    }
    const min = Math.floor(Math.min(...prices));
    const max = Math.min(Math.ceil(Math.max(...prices)), 5000); // Cap at 5000
    return {
      min: Math.floor(min / 100) * 100,
      max: Math.min(Math.ceil(max / 100) * 100, 5000)
    };
  }, [products]);

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const paginatedProducts = filteredProducts.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  return (
    <div className="min-h-screen bg-[#FFFFFF] py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-[#0F1012] mb-2">
            Search Results {query && `for "${query}"`}
          </h1>
          <p className="text-[#0F1012]">
            {isLoading ? 'Searching...' : `Found ${filteredProducts.length} product${filteredProducts.length !== 1 ? 's' : ''}`}
          </p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="aspect-[4/5] bg-[#FE1157] rounded-lg mb-2"></div>
                <div className="h-4 bg-[#FE1157] rounded mb-2"></div>
                <div className="h-4 bg-[#FE1157] rounded w-2/3"></div>
              </div>
            ))}
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-[#FFFFFF] rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-[#0F1012]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-[#0F1012] mb-2">No products found</h3>
            <p className="text-[#0F1012] mb-4">Try adjusting your search or filters</p>
            <Link to="/" className="inline-block px-4 py-2 bg-[#FE1157] text-white rounded-lg hover:bg-[#0F1012]">
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="flex gap-8">
            {/* Filters Sidebar */}
            <div className="hidden lg:block w-64 flex-shrink-0">
              <FilterSidebar
                filters={filters}
                onFilterChange={setFilters}
                onClearFilters={() => setFilters({ priceRange: null, brands: [], sizes: [], sortBy: null })}
                brands={brands}
                sizes={sizes}
                priceRange={priceRange}
              />
            </div>

            {/* Products Grid */}
            <div className="flex-1">
              {/* Mobile Filter Toggle */}
              <div className="lg:hidden mb-4">
                <button
                  onClick={() => setShowMobileFilters(!showMobileFilters)}
                  className="w-full px-4 py-2 border border-[#FE1157] rounded-lg flex items-center justify-between text-[#0F1012] hover:bg-[#FE1157]/50 transition-colors"
                >
                  <span>Filters</span>
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                  </svg>
                </button>
              </div>

              {/* Mobile Filters */}
              {showMobileFilters && (
                <div className="lg:hidden mb-6">
                  <FilterSidebar
                    filters={filters}
                    onFilterChange={setFilters}
                    onClearFilters={() => setFilters({ priceRange: null, brands: [], sizes: [], sortBy: null })}
                    brands={brands}
                    sizes={sizes}
                    priceRange={priceRange}
                  />
                </div>
              )}

              {/* Subcategories Section - Above Product Cards (for accessories) */}
              {(() => {
                // Check if any products are accessories
                const hasAccessories = paginatedProducts.some(p => 
                  p.category?.toLowerCase().includes('accessor') || 
                  p.subCategory?.toLowerCase().includes('accessor')
                );
                
                if (hasAccessories) {
                  return (
                    <div className="mb-4 sm:mb-6 pb-4 border-b border-[#FE1157]">
                      <p className="text-xs sm:text-sm uppercase tracking-wide text-[#0F1012] font-semibold mb-3">Subcategories</p>
                      <div className="flex flex-wrap gap-2 sm:gap-3">
                        <Link
                          to="/accessories?subCategory=earrings"
                          className="px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold border-2 rounded-lg transition-colors text-[#0F1012] border-[#FE1157] hover:bg-[#FE1157] hover:text-white hover:border-[#FE1157]"
                        >
                          Earrings
                        </Link>
                      </div>
                    </div>
                  );
                }
                return null;
              })()}

              {/* Products */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
                {paginatedProducts.map((product) => (
                  <ProductCard key={product._id || product.id} product={product} />
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center gap-2 flex-wrap">
                  <button
                    onClick={() => setPage(p => Math.max(1, p - 1))}
                    disabled={page === 1}
                    className="px-4 py-2 border border-[#FE1157] rounded-lg text-[#0F1012] bg-[#FFFFFF] hover:bg-[#FE1157]/50 disabled:opacity-50 transition-colors"
                  >
                    Previous
                  </button>
                  {[...Array(totalPages)].map((_, i) => (
                    <button
                      key={i + 1}
                      onClick={() => setPage(i + 1)}
                      className={`px-4 py-2 border rounded-lg transition-colors ${
                        page === i + 1
                          ? 'bg-[#FE1157] text-white border-[#FE1157]'
                          : 'border-[#FE1157] text-[#0F1012] bg-[#FFFFFF] hover:bg-[#FE1157]/50'
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                  <button
                    onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                    disabled={page === totalPages}
                    className="px-4 py-2 border border-[#FE1157] rounded-lg text-[#0F1012] bg-[#FFFFFF] hover:bg-[#FE1157]/50 disabled:opacity-50 transition-colors"
                  >
                    Next
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchResults;

