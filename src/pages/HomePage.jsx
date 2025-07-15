import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { products as allProducts } from '../data/products.js';
import ProductCard from '../components/ProductCard.jsx';
import PriceFilter from '../components/PriceFilter.jsx';
import bannerImage from '../assets/banner/banner.jpg';

function HomePage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [filteredProducts, setFilteredProducts] = useState(allProducts);
  const [priceFilter, setPriceFilter] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { label: 'Tất cả', value: 'all' },
    { label: 'Lập trình', value: 'Lập trình' },
    { label: 'Ngoại ngữ', value: 'Tiếng Anh' },
    { label: 'Thiết kế', value: 'Thiết kế' },
    { label: 'Quản lý', value: 'Quản lý' }
  ];

  useEffect(() => {
    let products = allProducts;
    const searchTerm = searchParams.get('search');

    if (searchTerm) {
      products = products.filter(p => 
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory !== 'all') {
      products = products.filter(p => p.category === selectedCategory);
    }

    if (priceFilter !== 'all') {
      products = products.filter(p => {
        if (priceFilter === 'lt500') return p.price < 500000;
        if (priceFilter === '500-1000') return p.price >= 500000 && p.price <= 1000000;
        if (priceFilter === 'gt1000') return p.price > 1000000;
        return true;
      });
    }

    setFilteredProducts(products);
  }, [searchParams, priceFilter, selectedCategory]);

  return (
    <div className="min-h-screen">
      {/* Hero Banner - Full width */}
      <div className="relative w-full h-[500px] overflow-hidden">
        <img 
          src={bannerImage} 
          alt="Education Banner"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary-dark/90" />
        <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white max-w-2xl mb-6 animate-fade-in">
            Học tập thông minh cùng EduAI
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-xl mb-8 animate-fade-in-delay">
            Khám phá hàng ngàn khóa học chất lượng từ các chuyên gia hàng đầu. 
            Nâng cao kiến thức và kỹ năng của bạn ngay hôm nay.
          </p>
          <div className="flex flex-wrap gap-4 animate-fade-in-delay-2">
            <button 
              onClick={() => navigate('/suggestions')}
              className="px-8 py-3 bg-white text-primary rounded-lg font-medium
                        hover:bg-white/90 transition-all duration-300 transform hover:scale-105
                        shadow-lg hover:shadow-xl"
            >
              Nhận gợi ý từ AI
            </button>
            <button 
              onClick={() => {
                const element = document.getElementById('courses');
                element?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-8 py-3 bg-transparent border-2 border-white text-white rounded-lg font-medium
                        hover:bg-white/10 transition-all duration-300 transform hover:scale-105"
            >
              Xem khóa học
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div id="courses" className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Category Filters */}
          <div className="flex flex-wrap gap-4 mb-8">
            {categories.map(category => (
              <button
                key={category.value}
                onClick={() => setSelectedCategory(category.value)}
                className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300
                          ${selectedCategory === category.value 
                            ? 'bg-primary text-white shadow-lg' 
                            : 'bg-white text-text-light border border-border hover:border-primary hover:text-primary'}`}
              >
                {category.label}
              </button>
            ))}
          </div>

          {/* Products Grid with Sidebar */}
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar */}
            <div className="lg:w-64 flex-shrink-0">
              <div className="sticky top-24 bg-white rounded-xl border border-border p-6 shadow-sm">
                <h3 className="font-medium mb-4">Lọc theo giá</h3>
                <PriceFilter priceFilter={priceFilter} onPriceChange={setPriceFilter} />
              </div>
            </div>

            {/* Products Grid */}
            <div className="flex-1">
              {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredProducts.map(product => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-white rounded-xl border border-border shadow-sm">
                  <svg className="w-16 h-16 text-text-light mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                      d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-text-light text-lg mb-4">
                    Không tìm thấy khóa học nào phù hợp với tiêu chí tìm kiếm.
                  </p>
                  <button 
                    onClick={() => {
                      setPriceFilter('all');
                      setSelectedCategory('all');
                    }}
                    className="text-primary hover:text-primary-dark transition-colors"
                  >
                    Xóa bộ lọc
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage; 