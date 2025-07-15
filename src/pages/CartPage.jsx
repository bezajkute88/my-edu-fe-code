import { useState, useEffect } from 'react';
import { useProducts } from '../contexts/ProductContext';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

function CartPage() {
  const { cart, products, updateCartQuantity, removeFromCart, calculateTotal } = useProducts();
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [error, setError] = useState('');
  const [showNotification, setShowNotification] = useState(false);

  // Lưu giỏ hàng vào localStorage
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const cartItems = cart.map(item => ({
    ...item,
    product: products.find(p => p.id === item.productId)
  }));

  // Xử lý mã giảm giá
  const handlePromoCode = () => {
    const promoCodes = {
      'WELCOME': 10,
      'SUMMER': 20,
      'SPECIAL': 15
    };

    if (promoCode.trim() === '') {
      setError('Vui lòng nhập mã giảm giá');
      return;
    }

    const discountPercent = promoCodes[promoCode.toUpperCase()];
    if (discountPercent) {
      setDiscount(discountPercent);
      setError('');
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 3000);
    } else {
      setError('Mã giảm giá không hợp lệ');
      setDiscount(0);
    }
  };

  // Tính tổng tiền sau giảm giá
  const finalTotal = calculateTotal() * (1 - discount / 100);

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-6"
        >
          <svg className="w-24 h-24 text-gray-300 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
              d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
          <h2 className="text-3xl font-semibold text-text">Giỏ hàng trống</h2>
          <p className="text-text-light max-w-md mx-auto">
            Bạn chưa có khóa học nào trong giỏ hàng. Khám phá các khóa học chất lượng của chúng tôi ngay!
          </p>
          <Link to="/"
            className="inline-flex items-center px-8 py-3 bg-primary text-white rounded-lg
                      hover:bg-primary-dark transition-all duration-300 transform hover:scale-105"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            Khám phá khóa học
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h1 className="text-4xl font-bold text-text">Giỏ hàng của bạn</h1>
        <p className="text-text-light mt-2">
          Bạn có {cartItems.length} khóa học trong giỏ hàng
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          <AnimatePresence>
            {cartItems.map(({ product, quantity }) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="bg-white rounded-xl border border-border p-6 flex flex-col sm:flex-row gap-6
                         hover:shadow-md transition-shadow duration-300"
              >
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full sm:w-48 h-32 object-cover rounded-lg"
                />
                <div className="flex-1 space-y-4">
                  <div>
                    <h3 className="font-semibold text-lg text-text">{product.name}</h3>
                    <p className="text-sm text-text-light">{product.instructor}</p>
                  </div>
                  <div className="flex flex-wrap items-center gap-4">
                    <div className="flex items-center border rounded-lg overflow-hidden">
                      <button 
                        onClick={() => updateCartQuantity(product.id, quantity - 1)}
                        className="px-4 py-2 hover:bg-gray-50 text-text-light transition-colors"
                      >
                        -
                      </button>
                      <span className="px-4 py-2 border-x bg-gray-50">{quantity}</span>
                      <button 
                        onClick={() => updateCartQuantity(product.id, quantity + 1)}
                        className="px-4 py-2 hover:bg-gray-50 text-text-light transition-colors"
                      >
                        +
                      </button>
                    </div>
                    <button 
                      onClick={() => removeFromCart(product.id)}
                      className="flex items-center text-error hover:text-error/80 transition-colors"
                    >
                      <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                      Xóa
                    </button>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-lg text-primary">
                    {new Intl.NumberFormat('vi-VN', { 
                      style: 'currency', 
                      currency: 'VND' 
                    }).format(product.price * quantity)}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <div className="lg:col-span-1">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl border border-border p-6 space-y-6 sticky top-24"
          >
            {/* Mã giảm giá */}
            <div className="space-y-2">
              <h3 className="font-semibold">Mã giảm giá</h3>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                  placeholder="Nhập mã giảm giá"
                  className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
                <button
                  onClick={handlePromoCode}
                  className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark
                           transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={!promoCode.trim()}
                >
                  Áp dụng
                </button>
              </div>
              {error && (
                <p className="text-sm text-error">{error}</p>
              )}
            </div>

            {/* Tổng cộng */}
            <div className="space-y-4 pt-4 border-t">
              <div className="flex justify-between items-center">
                <span className="text-text-light">Tạm tính</span>
                <span className="font-medium">
                  {new Intl.NumberFormat('vi-VN', { 
                    style: 'currency', 
                    currency: 'VND' 
                  }).format(calculateTotal())}
                </span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between items-center text-success">
                  <span>Giảm giá ({discount}%)</span>
                  <span>
                    -{new Intl.NumberFormat('vi-VN', { 
                      style: 'currency', 
                      currency: 'VND' 
                    }).format(calculateTotal() * (discount / 100))}
                  </span>
                </div>
              )}
              <div className="flex justify-between items-center text-lg pt-4 border-t">
                <span className="font-medium">Thành tiền</span>
                <span className="font-bold text-primary">
                  {new Intl.NumberFormat('vi-VN', { 
                    style: 'currency', 
                    currency: 'VND' 
                  }).format(finalTotal)}
                </span>
              </div>
            </div>

            <Link 
              to="/checkout"
              className="block w-full py-3 bg-primary text-white text-center rounded-lg
                        hover:bg-primary-dark transition-all duration-300 transform hover:scale-105"
            >
              Thanh toán ngay
            </Link>

            <p className="text-sm text-text-light text-center">
              Thanh toán an toàn & bảo mật
            </p>
          </motion.div>
        </div>
      </div>

      {/* Thông báo áp dụng mã giảm giá thành công */}
      <AnimatePresence>
        {showNotification && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-4 right-4 bg-success text-white px-6 py-3 rounded-lg shadow-lg"
          >
            Áp dụng mã giảm giá thành công!
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default CartPage; 