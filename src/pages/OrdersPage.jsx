import { useState, useEffect } from 'react';
import { useProducts } from '../contexts/ProductContext';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

function OrdersPage() {
  const { orders, products, cancelOrder } = useProducts();
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [loading, setLoading] = useState(false);

  // Lọc đơn hàng theo trạng thái và tìm kiếm
  const filteredOrders = orders.filter(order => {
    const matchStatus = selectedStatus === 'all' || order.status === selectedStatus;
    const matchSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       order.customerInfo.fullName.toLowerCase().includes(searchTerm.toLowerCase());
    return matchStatus && matchSearch;
  });

  // Xử lý hủy đơn hàng
  const handleCancelOrder = async (orderId) => {
    try {
      setLoading(true);
      await cancelOrder(orderId);
      setShowConfirmation(false);
    } catch (error) {
      console.error('Lỗi khi hủy đơn hàng:', error);
    } finally {
      setLoading(false);
    }
  };

  // Hiển thị xác nhận hủy đơn hàng
  const showCancelConfirmation = (order) => {
    setSelectedOrder(order);
    setShowConfirmation(true);
  };

  if (orders.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-6"
        >
          <svg className="w-24 h-24 text-gray-300 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
          <h2 className="text-3xl font-semibold text-text">Chưa có đơn hàng</h2>
          <p className="text-text-light max-w-md mx-auto">
            Bạn chưa có đơn hàng nào. Khám phá các khóa học chất lượng của chúng tôi ngay!
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
    <div className="container mx-auto px-4 py-8">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-8"
      >
        <div className="text-center">
          <h1 className="text-4xl font-bold text-text">Đơn hàng của tôi</h1>
          <p className="text-text-light mt-2">Quản lý các đơn hàng của bạn</p>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="flex gap-2">
            {['all', 'pending', 'completed', 'cancelled'].map(status => (
              <button
                key={status}
                onClick={() => setSelectedStatus(status)}
                className={`px-4 py-2 rounded-lg transition-all duration-300
                          ${selectedStatus === status
                            ? 'bg-primary text-white'
                            : 'bg-gray-100 text-text-light hover:bg-gray-200'}`}
              >
                {status === 'all' ? 'Tất cả' :
                 status === 'pending' ? 'Đang xử lý' :
                 status === 'completed' ? 'Hoàn thành' : 'Đã hủy'}
              </button>
            ))}
          </div>
          <div className="relative">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Tìm kiếm đơn hàng..."
              className="pl-10 pr-4 py-2 rounded-lg border border-border
                       focus:outline-none focus:ring-2 focus:ring-primary/20
                       transition-all duration-300"
            />
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        {/* Orders List */}
        <div className="space-y-6">
          <AnimatePresence>
            {filteredOrders.map(order => {
              const orderItems = order.items.map(item => ({
                ...item,
                product: products.find(p => p.id === item.productId)
              }));

              return (
                <motion.div
                  key={order.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="bg-white rounded-xl border border-border overflow-hidden
                           hover:shadow-md transition-shadow duration-300"
                >
                  <div className="p-6 border-b border-border">
                    <div className="flex flex-wrap gap-4 justify-between items-start">
                      <div>
                        <p className="text-sm text-text-light">Mã đơn hàng: #{order.id}</p>
                        <p className="text-sm text-text-light">
                          Ngày đặt: {new Date(order.createdAt).toLocaleDateString('vi-VN')}
                        </p>
                        <p className="text-sm text-text-light">
                          Khách hàng: {order.customerInfo.fullName}
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className={`inline-block px-3 py-1 rounded-full text-sm
                          ${order.status === 'completed' ? 'bg-success/10 text-success' :
                            order.status === 'pending' ? 'bg-primary/10 text-primary' :
                              'bg-error/10 text-error'}`}>
                          {order.status === 'completed' ? 'Hoàn thành' :
                            order.status === 'pending' ? 'Đang xử lý' : 'Đã hủy'}
                        </span>
                        {order.status === 'pending' && (
                          <button
                            onClick={() => showCancelConfirmation(order)}
                            className="text-error hover:text-error/80 transition-colors"
                          >
                            Hủy đơn
                          </button>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="p-6 space-y-6">
                    <div className="space-y-4">
                      {orderItems.map(({ product, quantity }) => (
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
                            <h4 className="font-medium text-text">{product.name}</h4>
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

                    <div className="border-t pt-4">
                      <div className="flex flex-wrap gap-4 justify-between items-end">
                        <div className="space-y-1">
                          <p className="text-sm text-text-light">
                            Phương thức thanh toán: {
                              order.paymentMethod === 'banking' ? 'Chuyển khoản' :
                              order.paymentMethod === 'momo' ? 'Ví MoMo' : 'VNPay'
                            }
                          </p>
                          {order.note && (
                            <p className="text-sm text-text-light">
                              Ghi chú: {order.note}
                            </p>
                          )}
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-text-light">Tổng cộng</p>
                          <p className="font-bold text-primary text-lg">
                            {new Intl.NumberFormat('vi-VN', {
                              style: 'currency',
                              currency: 'VND'
                            }).format(order.total)}
                          </p>
                        </div>
                      </div>
                    </div>

                    {order.status === 'completed' && (
                      <div className="flex justify-end">
                        <Link
                          to={`/learning/${order.id}`}
                          className="inline-flex items-center px-4 py-2 text-primary hover:text-primary-dark
                                   transition-colors"
                        >
                          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                              d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                          </svg>
                          Vào học
                        </Link>
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Cancel Confirmation Modal */}
      <AnimatePresence>
        {showConfirmation && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            onClick={() => setShowConfirmation(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-xl p-6 max-w-md mx-4 space-y-4"
              onClick={e => e.stopPropagation()}
            >
              <h3 className="text-lg font-semibold text-text">Xác nhận hủy đơn hàng</h3>
              <p className="text-text-light">
                Bạn có chắc chắn muốn hủy đơn hàng #{selectedOrder?.id} không?
                Hành động này không thể hoàn tác.
              </p>
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setShowConfirmation(false)}
                  className="px-4 py-2 text-text-light hover:text-text transition-colors"
                >
                  Đóng
                </button>
                <button
                  onClick={() => handleCancelOrder(selectedOrder.id)}
                  disabled={loading}
                  className="px-4 py-2 bg-error text-white rounded-lg hover:bg-error/90
                           transition-colors disabled:opacity-50 disabled:cursor-not-allowed
                           flex items-center"
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
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
                    'Xác nhận hủy'
                  )}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default OrdersPage; 