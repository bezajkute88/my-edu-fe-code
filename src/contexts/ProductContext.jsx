import { createContext, useState, useContext } from 'react';
import { products as allProducts } from '../data/products';
import toast from 'react-hot-toast';

// 1. Tạo Context
const ProductContext = createContext();

// 2. Tạo Provider Component
export function ProductProvider({ children }) {
  const [products] = useState(allProducts);
  const [favorites, setFavorites] = useState([]);
  const [history, setHistory] = useState([]);
  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState([]);
  
  // State cho Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Hàm để thêm/bỏ sản phẩm khỏi danh sách yêu thích
  const toggleFavorite = (productId) => {
    setFavorites(prevFavorites => {
      const product = products.find(p => p.id === productId);
      if (prevFavorites.includes(productId)) {
        toast.success(`Đã xóa "${product.name}" khỏi danh sách yêu thích`);
        return prevFavorites.filter(id => id !== productId);
      } else {
        toast.success(`Đã thêm "${product.name}" vào danh sách yêu thích`);
        return [...prevFavorites, productId];
      }
    });
  };

  // Hàm để thêm sản phẩm vào lịch sử đã xem
  const addToHistory = (product) => {
    setHistory(prevHistory => {
      const newHistory = prevHistory.filter(item => item.id !== product.id);
      return [product, ...newHistory].slice(0, 10);
    });
  };

  // Hàm thêm vào giỏ hàng
  const addToCart = (product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.productId === product.id);
      if (existingItem) {
        toast.success(`Đã cập nhật số lượng "${product.name}" trong giỏ hàng`);
        return prevCart.map(item =>
          item.productId === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      toast.success(`Đã thêm "${product.name}" vào giỏ hàng`);
      return [...prevCart, { productId: product.id, quantity: 1 }];
    });
  };

  // Hàm cập nhật số lượng trong giỏ hàng
  const updateCartQuantity = (productId, quantity) => {
    if (quantity < 1) {
      removeFromCart(productId);
      return;
    }
    setCart(prevCart =>
      prevCart.map(item =>
        item.productId === productId
          ? { ...item, quantity }
          : item
      )
    );
    const product = products.find(p => p.id === productId);
    toast.success(`Đã cập nhật số lượng "${product.name}" thành ${quantity}`);
  };

  // Hàm xóa khỏi giỏ hàng
  const removeFromCart = (productId) => {
    const product = products.find(p => p.id === productId);
    setCart(prevCart => prevCart.filter(item => item.productId !== productId));
    toast.success(`Đã xóa "${product.name}" khỏi giỏ hàng`);
  };

  // Hàm tính tổng giá trị giỏ hàng
  const calculateTotal = () => {
    return cart.reduce((total, item) => {
      const product = products.find(p => p.id === item.productId);
      return total + (product?.price || 0) * item.quantity;
    }, 0);
  };

  // Hàm tạo đơn hàng mới
  const createOrder = (orderDetails) => {
    try {
      const newOrder = {
        id: Date.now(),
        items: cart,
        total: calculateTotal(),
        status: 'pending',
        createdAt: new Date().toISOString(),
        ...orderDetails
      };
      setOrders(prevOrders => [newOrder, ...prevOrders]);
      setCart([]); // Clear cart after order
      toast.success('Đặt hàng thành công!');
      return newOrder;
    } catch (error) {
      toast.error('Có lỗi xảy ra khi đặt hàng. Vui lòng thử lại!');
      throw error;
    }
  };

  // Hàm mở modal
  const openModal = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
    addToHistory(product);
  };

  // Hàm đóng modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  const value = {
    products,
    favorites,
    history,
    cart,
    orders,
    toggleFavorite,
    addToHistory,
    addToCart,
    updateCartQuantity,
    removeFromCart,
    calculateTotal,
    createOrder,
    isModalOpen,
    selectedProduct,
    openModal,
    closeModal,
  };

  return (
    <ProductContext.Provider value={value}>
      {children}
    </ProductContext.Provider>
  );
}

// 3. Tạo Custom Hook để sử dụng Context
export function useProducts() {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
} 