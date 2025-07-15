import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

function PriceFilter({ priceFilter, onPriceChange }) {
  const [priceRange, setPriceRange] = useState({
    min: 0,
    max: 2000000
  });

  const predefinedRanges = [
    { label: 'Tất cả', value: 'all' },
    { label: 'Dưới 500K', value: 'lt500' },
    { label: '500K - 1M', value: '500-1000' },
    { label: 'Trên 1M', value: 'gt1000' }
  ];

  const handleRangeClick = (value) => {
    onPriceChange(value);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      maximumFractionDigits: 0
    }).format(price);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col gap-4"
    >
      <div className="flex flex-wrap gap-2">
        {predefinedRanges.map(range => (
          <motion.button
            key={range.value}
            onClick={() => handleRangeClick(range.value)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300
                      ${priceFilter === range.value 
                        ? 'bg-primary text-white shadow-lg' 
                        : 'bg-white text-text-light border border-border hover:border-primary hover:text-primary'}`}
          >
            {range.label}
          </motion.button>
        ))}
      </div>

      <div className="relative pt-6">
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <motion.div 
            className="absolute h-2 bg-primary rounded-full"
            initial={{ width: '0%' }}
            animate={{ 
              width: priceFilter === 'lt500' ? '25%' :
                     priceFilter === '500-1000' ? '50%' :
                     priceFilter === 'gt1000' ? '100%' : '0%'
            }}
            transition={{ duration: 0.3 }}
          />
        </div>
        <div className="flex justify-between mt-2">
          <span className="text-sm text-text-light">{formatPrice(0)}</span>
          <span className="text-sm text-text-light">{formatPrice(2000000)}</span>
        </div>
      </div>

      <div className="text-xs text-text-light text-center mt-2">
        * Kéo thanh trượt hoặc chọn mức giá phù hợp
      </div>
    </motion.div>
  );
}

export default PriceFilter; 