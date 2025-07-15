import { useProducts } from '../contexts/ProductContext';
import { motion, AnimatePresence } from 'framer-motion';

function ProductModal({ product, onClose }) {
  const { addToCart } = useProducts();

  if (!product) return null;

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
        onClick={onClose}
      >
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-white rounded-2xl w-full max-w-5xl flex flex-col md:flex-row max-h-[90vh] overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Ảnh sản phẩm */}
          <div className="md:w-[45%] bg-gray-100">
            <div className="relative pt-[66.67%]">
              <img 
                src={product.image} 
                alt={product.name} 
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Thông tin sản phẩm */}
          <div className="md:w-[55%] p-8 overflow-y-auto relative">
            {/* Nút đóng */}
            <button 
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center
                       bg-gray-100 hover:bg-gray-200 text-text-light rounded-full transition-colors"
              onClick={onClose}
              aria-label="Đóng"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="space-y-6">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 text-sm font-medium text-primary bg-primary/10 rounded-full">
                  {product.category}
                </span>
                <span className="px-3 py-1 text-sm font-medium text-text-light bg-gray-100 rounded-full">
                  {product.level}
                </span>
              </div>

              <h2 className="text-2xl font-bold text-text">{product.name}</h2>
              
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="font-medium">{product.rating}</span>
                </div>
                <span className="text-text-light">•</span>
                <span className="text-text-light">{product.students.toLocaleString()} học viên</span>
              </div>

              <div className="flex items-center gap-4">
                <img 
                  src={product.instructorImage} 
                  alt={product.instructor} 
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <p className="font-medium text-text">{product.instructor}</p>
                  <p className="text-sm text-text-light">Giảng viên</p>
                </div>
              </div>

              <p className="text-text-light leading-relaxed">{product.description}</p>

              <div className="space-y-4">
                <h3 className="font-medium text-text">Nội dung khóa học</h3>
                <ul className="space-y-2">
                  {product.curriculum.map((item, index) => (
                    <li key={index} className="flex items-center gap-2 text-text-light">
                      <svg className="w-5 h-5 text-primary flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4 border-t border-border">
                <div className="flex items-center justify-between mb-4">
                  <p className="text-3xl font-bold text-primary">
                    {new Intl.NumberFormat('vi-VN', { 
                      style: 'currency', 
                      currency: 'VND' 
                    }).format(product.price)}
                  </p>
                  <div className="flex items-center gap-2 text-text-light">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{product.duration}</span>
                  </div>
                </div>
                <button 
                  onClick={() => {
                    addToCart(product);
                    onClose();
                  }}
                  className="w-full py-3 bg-primary text-white rounded-lg font-medium
                           hover:bg-primary-dark transition-colors duration-300
                           active:transform active:scale-95"
                >
                  Thêm vào giỏ hàng
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default ProductModal; 