import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useProducts } from '../contexts/ProductContext';
import SearchBar from './SearchBar';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { cart, favorites } = useProducts();

  // Đóng menu khi chuyển trang
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  // Xử lý hiệu ứng scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Vô hiệu hóa scroll khi menu mobile mở
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMenuOpen]);

  const handleSearch = (term) => {
    navigate(`/?search=${encodeURIComponent(term)}`);
  };

  return (
    <header 
      className={`bg-white sticky top-0 z-40 transition-all duration-300
                 ${isScrolled ? 'shadow-md' : 'shadow-sm'}`}
    >
      <div className="container mx-auto">
        <div className="flex items-center justify-between h-16 px-4">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            <span className="text-2xl font-bold text-primary">EduAI</span>
          </Link>

          {/* Search Bar - Desktop */}
          <div className="hidden md:block flex-1 max-w-xl mx-8">
            <SearchBar onSearch={handleSearch} />
          </div>

          {/* Navigation Links - Desktop */}
          <div className="hidden md:flex items-center space-x-6">
            <NavLink
              to="/suggestions"
              className={({ isActive }) =>
                `text-sm font-medium transition-colors duration-300
                 ${isActive ? 'text-primary' : 'text-text-light hover:text-primary'}`
              }
            >
              Gợi ý AI
            </NavLink>
            <NavLink
              to="/favorites"
              className={({ isActive }) =>
                `text-sm font-medium transition-colors duration-300 relative
                 ${isActive ? 'text-primary' : 'text-text-light hover:text-primary'}`
              }
            >
              Yêu thích
              {favorites.length > 0 && (
                <span className="absolute -top-1 -right-2 w-4 h-4 bg-primary text-white text-xs 
                               rounded-full flex items-center justify-center">
                  {favorites.length}
                </span>
              )}
            </NavLink>
            <NavLink
              to="/cart"
              className={({ isActive }) =>
                `text-sm font-medium transition-colors duration-300 relative
                 ${isActive ? 'text-primary' : 'text-text-light hover:text-primary'}`
              }
            >
              Giỏ hàng
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-2 w-4 h-4 bg-primary text-white text-xs 
                               rounded-full flex items-center justify-center">
                  {cart.length}
                </span>
              )}
            </NavLink>
            <NavLink
              to="/orders"
              className={({ isActive }) =>
                `text-sm font-medium transition-colors duration-300
                 ${isActive ? 'text-primary' : 'text-text-light hover:text-primary'}`
              }
            >
              Đơn hàng
            </NavLink>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 text-text-light"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg 
              className={`w-6 h-6 transition-transform duration-300 ${isMenuOpen ? 'rotate-90' : ''}`}
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth="2" 
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth="2" 
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Search Bar - Mobile */}
        <div className="md:hidden px-4 pb-4">
          <SearchBar onSearch={handleSearch} />
        </div>

        {/* Mobile Menu */}
        <div 
          className={`fixed inset-0 bg-black bg-opacity-50 md:hidden transition-opacity duration-300
                     ${isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
          onClick={() => setIsMenuOpen(false)}
        >
          <div 
            className={`absolute right-0 top-0 h-screen w-64 bg-white shadow-lg
                       transform transition-transform duration-300 ease-in-out
                       ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
            onClick={e => e.stopPropagation()}
          >
            <div className="p-4 space-y-4">
              <NavLink
                to="/suggestions"
                className={({ isActive }) =>
                  `block px-4 py-2 text-sm font-medium rounded-lg transition-colors
                   ${isActive 
                     ? 'bg-primary text-white' 
                     : 'text-text-light hover:bg-gray-50 hover:text-primary'
                   }`
                }
              >
                Gợi ý AI
              </NavLink>
              <NavLink
                to="/favorites"
                className={({ isActive }) =>
                  `block px-4 py-2 text-sm font-medium rounded-lg transition-colors
                   ${isActive 
                     ? 'bg-primary text-white' 
                     : 'text-text-light hover:bg-gray-50 hover:text-primary'
                   }`
                }
              >
                Yêu thích ({favorites.length})
              </NavLink>
              <NavLink
                to="/cart"
                className={({ isActive }) =>
                  `block px-4 py-2 text-sm font-medium rounded-lg transition-colors
                   ${isActive 
                     ? 'bg-primary text-white' 
                     : 'text-text-light hover:bg-gray-50 hover:text-primary'
                   }`
                }
              >
                Giỏ hàng ({cart.length})
              </NavLink>
              <NavLink
                to="/orders"
                className={({ isActive }) =>
                  `block px-4 py-2 text-sm font-medium rounded-lg transition-colors
                   ${isActive 
                     ? 'bg-primary text-white' 
                     : 'text-text-light hover:bg-gray-50 hover:text-primary'
                   }`
                }
              >
                Đơn hàng
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header; 