import { useProducts } from '../contexts/ProductContext';
import ProductCard from '../components/ProductCard';

function HistoryPage() {
  const { history } = useProducts();

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-text">Lịch sử xem</h1>
        <p className="text-text-light max-w-2xl mx-auto">
          Các khóa học bạn đã xem gần đây
        </p>
      </div>

      {history.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {history.map(product => (
            <ProductCard key={`${product.id}-history`} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 space-y-4">
          <p className="text-text-light text-lg">
            Bạn chưa xem khóa học nào.
          </p>
          <a href="/" className="inline-block px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors">
            Khám phá khóa học
          </a>
        </div>
      )}
    </div>
  );
}

export default HistoryPage; 