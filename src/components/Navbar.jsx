import { Link, NavLink } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="bg-white shadow-card">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-2xl font-bold text-primary">
            EduAI
          </Link>
          <div className="hidden md:flex items-center space-x-8">
            <NavLink 
              to="/" 
              className={({ isActive }) => 
                `text-sm font-medium transition-colors duration-300
                 ${isActive ? 'text-primary' : 'text-text-light hover:text-primary'}`
              }
            >
              Trang chủ
            </NavLink>
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
                `text-sm font-medium transition-colors duration-300
                 ${isActive ? 'text-primary' : 'text-text-light hover:text-primary'}`
              }
            >
              Yêu thích
            </NavLink>
            <NavLink 
              to="/history" 
              className={({ isActive }) => 
                `text-sm font-medium transition-colors duration-300
                 ${isActive ? 'text-primary' : 'text-text-light hover:text-primary'}`
              }
            >
              Lịch sử
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar; 