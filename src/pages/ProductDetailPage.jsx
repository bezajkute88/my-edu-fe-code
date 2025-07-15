import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useProducts } from '../contexts/ProductContext';

function ProductDetailPage() {
  const { id } = useParams();
  const { products, addToCart } = useProducts();
  const [product, setProduct] = useState(null);
  const [selectedSection, setSelectedSection] = useState('overview');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Tìm sản phẩm theo id
    const foundProduct = products.find(p => p.id === parseInt(id));
    setProduct(foundProduct);
    setLoading(false);
  }, [id, products]);

  if (loading) {
    return (
      <div className="container mx-auto p-4">
        <div className="animate-pulse">
          <div className="h-64 bg-gray-200 rounded-lg mb-4"></div>
          <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-1/3"></div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto p-4">
        <div className="text-center text-gray-600">
          Không tìm thấy khóa học
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-8">
        <div className="relative h-96">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center">
            <div className="container mx-auto px-4">
              <h1 className="text-4xl font-bold text-white mb-4">{product.name}</h1>
              <p className="text-lg text-white mb-6">{product.description}</p>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => addToCart(product)}
                  className="px-8 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
                >
                  Thêm vào giỏ hàng
                </button>
                <span className="text-2xl font-bold text-white">
                  {new Intl.NumberFormat('vi-VN', {
                    style: 'currency',
                    currency: 'VND'
                  }).format(product.price)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        {/* Navigation */}
        <div className="flex gap-4 mb-6 border-b border-border">
          <button
            className={`pb-4 px-4 font-medium transition-colors relative ${
              selectedSection === 'overview'
                ? 'text-primary border-b-2 border-primary'
                : 'text-text-light hover:text-text'
            }`}
            onClick={() => setSelectedSection('overview')}
          >
            Tổng quan
          </button>
          <button
            className={`pb-4 px-4 font-medium transition-colors relative ${
              selectedSection === 'curriculum'
                ? 'text-primary border-b-2 border-primary'
                : 'text-text-light hover:text-text'
            }`}
            onClick={() => setSelectedSection('curriculum')}
          >
            Nội dung khóa học
          </button>
          <button
            className={`pb-4 px-4 font-medium transition-colors relative ${
              selectedSection === 'instructor'
                ? 'text-primary border-b-2 border-primary'
                : 'text-text-light hover:text-text'
            }`}
            onClick={() => setSelectedSection('instructor')}
          >
            Giảng viên
          </button>
        </div>

        {/* Content sections */}
        <div className="space-y-6">
          {selectedSection === 'overview' && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-background rounded-lg">
                  <p className="text-text-light mb-2">Thời lượng</p>
                  <p className="font-medium">{product.duration}</p>
                </div>
                <div className="p-4 bg-background rounded-lg">
                  <p className="text-text-light mb-2">Trình độ</p>
                  <p className="font-medium">{product.level}</p>
                </div>
                <div className="p-4 bg-background rounded-lg">
                  <p className="text-text-light mb-2">Học viên</p>
                  <p className="font-medium">{product.students.toLocaleString()} học viên</p>
                </div>
                <div className="p-4 bg-background rounded-lg">
                  <p className="text-text-light mb-2">Cập nhật</p>
                  <p className="font-medium">{new Date(product.updatedAt).toLocaleDateString('vi-VN')}</p>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-4">Mô tả khóa học</h3>
                <p className="text-text-light leading-relaxed">{product.description}</p>
              </div>
            </div>
          )}

          {selectedSection === 'curriculum' && (
            <div>
              <h3 className="text-xl font-bold mb-4">Nội dung bài giảng</h3>
              <div className="space-y-2">
                {product.curriculum.map((item, index) => (
                  <div
                    key={index}
                    className="p-4 bg-background rounded-lg flex items-center gap-4"
                  >
                    <span className="w-8 h-8 bg-primary/10 text-primary rounded-full flex items-center justify-center font-medium">
                      {index + 1}
                    </span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {selectedSection === 'instructor' && (
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <img
                  src={product.instructorImage}
                  alt={product.instructor}
                  className="w-20 h-20 rounded-full object-cover"
                />
                <div>
                  <h3 className="text-xl font-bold">{product.instructor}</h3>
                  <p className="text-text-light">Giảng viên {product.category}</p>
                </div>
              </div>
              <div>
                <h4 className="font-medium mb-2">Thống kê</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-background rounded-lg">
                    <p className="text-text-light mb-1">Đánh giá</p>
                    <p className="font-medium">{product.rating}/5 ⭐️</p>
                  </div>
                  <div className="p-4 bg-background rounded-lg">
                    <p className="text-text-light mb-1">Học viên</p>
                    <p className="font-medium">{product.students.toLocaleString()}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductDetailPage; 