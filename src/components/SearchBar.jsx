import { useState } from 'react';

function SearchBar({ onSearch, className = '' }) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <form onSubmit={handleSubmit} className={`relative w-full ${className}`}>
      <input 
        type="text" 
        className="w-full pl-12 pr-4 py-2.5 rounded-full border border-border bg-white/80
                   focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20
                   transition-all duration-300 placeholder-text-light/50"
        placeholder="Tìm kiếm khóa học..." 
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="absolute left-4 top-1/2 -translate-y-1/2">
        <svg 
          className="w-5 h-5 text-text-light"
          xmlns="http://www.w3.org/2000/svg" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
          />
        </svg>
      </div>
      {searchTerm && (
        <button
          type="button"
          onClick={() => {
            setSearchTerm('');
            onSearch('');
          }}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-text-light hover:text-primary
                     transition-colors duration-300"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </form>
  );
}

export default SearchBar; 