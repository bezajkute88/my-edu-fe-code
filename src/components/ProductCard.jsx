import { useProducts } from '../contexts/ProductContext';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

function ProductCard({ product }) {
  const { name, price, description, image, instructor, rating, students, duration } = product;
  const { favorites, toggleFavorite, openModal } = useProducts();
  const isFavorite = favorites.includes(product.id);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      className="group bg-white rounded-xl border border-border overflow-hidden
                 hover:shadow-lg hover:border-primary/20 transition-all duration-300"
    >
      <div className="relative aspect-video">
        <img 
          src={image} 
          alt={name} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <button 
          className="absolute top-3 right-3 w-9 h-9 bg-white/90 backdrop-blur-sm rounded-full 
                     flex items-center justify-center shadow-sm hover:scale-110 
                     transition-all duration-200 z-10"
          onClick={() => toggleFavorite(product.id)}
          aria-label={isFavorite ? 'Bỏ yêu thích' : 'Yêu thích'}
        >
          <motion.svg 
            animate={{ scale: isFavorite ? [1, 1.2, 1] : 1 }}
            className={`w-5 h-5 ${isFavorite ? 'text-red-500 fill-current' : 'text-gray-400'}`}
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={isFavorite ? "0" : "2"}
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
            />
          </motion.svg>
        </button>
      </div>

      <div className="p-5 space-y-4">
        <div className="space-y-2">
          <h3 className="font-semibold text-lg text-text line-clamp-2 min-h-[56px]">
            {name}
          </h3>
          <p className="text-text-light text-sm line-clamp-2">
            {description}
          </p>
        </div>

        <div className="flex items-center gap-4 text-sm text-text-light">
          <div className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{duration}</span>
          </div>
          <div className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <span>{students} học viên</span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-border">
          <div className="flex items-center gap-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`w-4 h-4 ${i < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="text-sm text-text-light">({rating})</span>
          </div>
          <span className="font-bold text-lg text-primary">
            {new Intl.NumberFormat('vi-VN', { 
              style: 'currency', 
              currency: 'VND',
              maximumFractionDigits: 0
            }).format(price)}
          </span>
        </div>

        <div className="flex gap-2">
          <Link 
            to={`/product/${product.id}`}
            className="flex-1 py-2.5 bg-primary/10 text-primary rounded-lg font-medium text-center
                     hover:bg-primary hover:text-white transition-colors duration-300
                     active:transform active:scale-95"
          >
            Xem chi tiết
          </Link>
          <button
            onClick={() => openModal(product)}
            className="w-10 h-10 flex items-center justify-center bg-primary/10 text-primary 
                     rounded-lg hover:bg-primary hover:text-white transition-colors duration-300"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default ProductCard; 