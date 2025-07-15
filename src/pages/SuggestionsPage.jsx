import { useState } from 'react';
import { useProducts } from '../contexts/ProductContext';
import ProductCard from '../components/ProductCard';
import SkeletonLoader from '../components/SkeletonLoader';

function SuggestionsPage() {
  const { products, favorites, history } = useProducts();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [suggestions, setSuggestions] = useState([]);

  const getSuggestions = () => {
    setLoading(true);
    setError(null);
    setSuggestions([]);

    setTimeout(() => {
      // Giả lập 50% khả năng lỗi
      if (Math.random() > 0.5) {
        setError('Lỗi! AI không thể kết nối. Vui lòng thử lại sau.');
        setLoading(false);
        return;
      }
      
      const viewedAndFavoritedIds = new Set([...favorites, ...history.map(p => p.id)]);
      const interestedCategories = new Set();

      history.forEach(p => interestedCategories.add(p.category));
      products.forEach(p => {
        if (favorites.includes(p.id)) {
          interestedCategories.add(p.category)
        }
      })

      if (interestedCategories.size === 0) {
        const randomSuggestions = products
          .filter(p => !viewedAndFavoritedIds.has(p.id))
          .sort(() => 0.5 - Math.random())
          .slice(0, 3);
        setSuggestions(randomSuggestions);
      } else {
        const categorySuggestions = products.filter(p => 
          !viewedAndFavoritedIds.has(p.id) && interestedCategories.has(p.category)
        );
        setSuggestions(categorySuggestions.slice(0, 3));
      }

      setLoading(false);
    }, 2000);
  };

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-text">Gợi ý thông minh từ AI</h1>
        <p className="text-text-light max-w-2xl mx-auto">
          Nhận gợi ý các khóa học phù hợp dựa trên sở thích và lịch sử xem của bạn
        </p>
        <button 
          onClick={getSuggestions} 
          disabled={loading}
          className="px-8 py-3 bg-primary text-white rounded-lg font-medium
                     hover:bg-primary-dark transition-all duration-300
                     disabled:opacity-50 disabled:cursor-not-allowed
                     active:transform active:scale-95"
        >
          {loading ? 'AI đang phân tích...' : 'Lấy gợi ý cho tôi'}
        </button>
      </div>

      {loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <SkeletonLoader />
          <SkeletonLoader />
          <SkeletonLoader />
        </div>
      )}

      {error && (
        <div className="text-center py-8">
          <p className="text-error text-lg">{error}</p>
          <button 
            onClick={getSuggestions}
            className="mt-4 px-6 py-2 text-primary border border-primary rounded-lg
                       hover:bg-primary hover:text-white transition-colors"
          >
            Thử lại
          </button>
        </div>
      )}

      {suggestions.length > 0 && !loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {suggestions.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}

export default SuggestionsPage; 