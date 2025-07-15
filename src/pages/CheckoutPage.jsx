import { useState, useEffect } from 'react';
import { useProducts } from '../contexts/ProductContext';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

function CheckoutPage() {
  const navigate = useNavigate();
  const { cart, products, calculateTotal, createOrder } = useProducts();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    paymentMethod: 'banking',
    note: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [step, setStep] = useState(1);

  const cartItems = cart.map(item => ({
    ...item,
    product: products.find(p => p.id === item.productId)
  }));

  // Lấy thông tin từ localStorage nếu có
  useEffect(() => {
    const savedInfo = localStorage.getItem('customerInfo');
    if (savedInfo) {
      setFormData(prev => ({
        ...prev,
        ...JSON.parse(savedInfo)
      }));
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    if (!formData.fullName.trim()) {
      setError('Vui lòng nhập họ tên');
      return false;
    }
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setError('Email không hợp lệ');
      return false;
    }
    if (!formData.phone.trim() || !/^[0-9]{10}$/.test(formData.phone)) {
      setError('Số điện thoại không hợp lệ');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!validateForm()) {
      return;
    }

    try {
      setLoading(true);
      // Lưu thông tin khách hàng
      localStorage.setItem('customerInfo', JSON.stringify({
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone
      }));

      const order = await createOrder({
        customerInfo: formData,
        paymentMethod: formData.paymentMethod
      });

      // Gửi email xác nhận
      await sendConfirmationEmail(formData.email, order);

      navigate('/orders/' + order.id);
    } catch (err) {
      setError('Có lỗi xảy ra, vui lòng thử lại');
    } finally {
      setLoading(false);
    }
  };

  const sendConfirmationEmail = async (email, order) => {
    // Giả lập gửi email
    await new Promise(resolve => setTimeout(resolve, 1000));
  };

  if (cartItems.length === 0) {
    navigate('/cart');
    return null;
  }

  const paymentMethods = [
    {
      id: 'banking',
      name: 'Chuyển khoản ngân hàng',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
            d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
        </svg>
      )
    },
    {
      id: 'momo',
      name: 'Ví MoMo',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      id: 'vnpay',
      name: 'VNPay',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
        </svg>
      )
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto space-y-8"
      >
        <div className="text-center">
          <h1 className="text-4xl font-bold text-text">Thanh toán</h1>
          <p className="text-text-light mt-2">Hoàn tất đơn hàng của bạn</p>
        </div>

        {/* Progress Steps */}
        <div className="flex justify-center items-center gap-4">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center
                        ${step === 1 ? 'bg-primary text-white' : 'bg-gray-100 text-text-light'}`}>
            1
          </div>
          <div className={`h-1 w-16 ${step === 1 ? 'bg-gray-200' : 'bg-primary'}`} />
          <div className={`w-8 h-8 rounded-full flex items-center justify-center
                        ${step === 2 ? 'bg-primary text-white' : 'bg-gray-100 text-text-light'}`}>
            2
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div className="bg-white rounded-xl border border-border p-6 space-y-6">
              <h3 className="font-semibold text-lg">Thông tin thanh toán</h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-text mb-1">
                      Họ và tên
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 rounded-lg border border-border 
                               focus:outline-none focus:ring-2 focus:ring-primary/20
                               transition-all duration-300"
                      placeholder="Nhập họ tên của bạn"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 rounded-lg border border-border 
                               focus:outline-none focus:ring-2 focus:ring-primary/20
                               transition-all duration-300"
                      placeholder="example@email.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text mb-1">
                      Số điện thoại
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 rounded-lg border border-border 
                               focus:outline-none focus:ring-2 focus:ring-primary/20
                               transition-all duration-300"
                      placeholder="0123456789"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text mb-1">
                      Ghi chú
                    </label>
                    <textarea
                      name="note"
                      value={formData.note}
                      onChange={handleInputChange}
                      rows="3"
                      className="w-full px-4 py-2 rounded-lg border border-border 
                               focus:outline-none focus:ring-2 focus:ring-primary/20
                               transition-all duration-300 resize-none"
                      placeholder="Ghi chú thêm về đơn hàng (nếu có)"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium">Phương thức thanh toán</h4>
                  <div className="grid gap-4">
                    {paymentMethods.map(method => (
                      <label
                        key={method.id}
                        className={`flex items-center gap-4 p-4 rounded-lg border cursor-pointer
                                  transition-all duration-300
                                  ${formData.paymentMethod === method.id
                                    ? 'border-primary bg-primary/5'
                                    : 'border-border hover:border-primary/50'}`}
                      >
                        <input
                          type="radio"
                          name="paymentMethod"
                          value={method.id}
                          checked={formData.paymentMethod === method.id}
                          onChange={handleInputChange}
                          className="hidden"
                        />
                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center
                                      ${formData.paymentMethod === method.id
                                        ? 'border-primary'
                                        : 'border-gray-300'}`}
                        >
                          {formData.paymentMethod === method.id && (
                            <div className="w-3 h-3 rounded-full bg-primary" />
                          )}
                        </div>
                        <div className="flex items-center gap-3">
                          {method.icon}
                          <span className="font-medium">{method.name}</span>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                {error && (
                  <p className="text-sm text-error">{error}</p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 bg-primary text-white rounded-lg 
                           hover:bg-primary-dark transition-all duration-300 
                           transform hover:scale-105 disabled:opacity-50
                           disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      Đang xử lý...
                    </>
                  ) : (
                    'Xác nhận đặt hàng'
                  )}
                </button>
              </form>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div className="bg-white rounded-xl border border-border p-6 space-y-6 sticky top-24">
              <h3 className="font-semibold text-lg">Đơn hàng của bạn</h3>
              <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
                {cartItems.map(({ product, quantity }) => (
                  <div 
                    key={product.id} 
                    className="flex gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-24 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium text-text line-clamp-1">{product.name}</h4>
                      <p className="text-sm text-text-light">Số lượng: {quantity}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-primary">
                        {new Intl.NumberFormat('vi-VN', {
                          style: 'currency',
                          currency: 'VND'
                        }).format(product.price * quantity)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t pt-4 space-y-3">
                <div className="flex justify-between items-center text-text-light">
                  <span>Tạm tính</span>
                  <span>
                    {new Intl.NumberFormat('vi-VN', {
                      style: 'currency',
                      currency: 'VND'
                    }).format(calculateTotal())}
                  </span>
                </div>
                <div className="flex justify-between items-center text-text-light">
                  <span>Phí xử lý</span>
                  <span>Miễn phí</span>
                </div>
                <div className="flex justify-between items-center text-lg pt-3 border-t">
                  <span className="font-medium">Tổng cộng</span>
                  <span className="font-bold text-primary">
                    {new Intl.NumberFormat('vi-VN', {
                      style: 'currency',
                      currency: 'VND'
                    }).format(calculateTotal())}
                  </span>
                </div>
              </div>

              <div className="text-sm text-text-light space-y-2">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  <span>Thanh toán an toàn & bảo mật</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                      d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                  <span>Hỗ trợ nhiều phương thức thanh toán</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Truy cập khóa học ngay sau khi thanh toán</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

export default CheckoutPage; 