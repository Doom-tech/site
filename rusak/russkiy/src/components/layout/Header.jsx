import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';

// Анимация для логотипа
const logoVariants = {
  hover: {
    scale: 1.05,
    textShadow: "0px 0px 8px rgba(31, 159, 248, 0.7)",
    transition: {
      duration: 0.3,
      yoyo: Infinity,
      ease: "easeInOut"
    }
  }
};

// Анимация для пунктов меню
const menuItemVariants = {
  hover: {
    scale: 1.1,
    color: "#1f9ff8",
    transition: {
      duration: 0.2,
      ease: "easeInOut"
    }
  }
};

function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className="bg-[#242629] py-4 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <motion.div
              variants={logoVariants}
              whileHover="hover"
              className="flex items-center"
            >
              <span className="text-3xl font-['Oswald',sans-serif] font-bold bg-gradient-to-r from-primary-500 to-accent-500 bg-clip-text text-transparent">
                Русак
              </span>
            </motion.div>
          </Link>

          {/* Мобильное меню кнопка */}
          <button 
            className="md:hidden text-[#fffffe] focus:outline-none" 
            onClick={toggleMobileMenu}
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor" 
              className="w-6 h-6"
            >
              {mobileMenuOpen ? (
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M6 18L18 6M6 6l12 12" 
                />
              ) : (
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M4 6h16M4 12h16M4 18h16" 
                />
              )}
            </svg>
          </button>

          {/* Десктопное меню */}
          <nav className="hidden md:flex md:items-center md:space-x-8">
            <NavLinks />
          </nav>
        </div>

        {/* Мобильное меню выпадающее */}
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-4 py-2 md:hidden"
          >
            <NavLinks mobile={true} onClick={() => setMobileMenuOpen(false)} />
          </motion.div>
        )}
      </div>
    </header>
  );
}

function NavLinks({ mobile = false, onClick }) {
  const baseStyles = "transition-all duration-200 font-medium";
  const mobileStyles = mobile 
    ? "block w-full py-2 text-center hover:text-primary-500" 
    : "text-[#fffffe] hover:text-primary-500";
  const activeStyles = "text-primary-500 font-semibold";

  return (
    <>
      <motion.div variants={menuItemVariants} whileHover="hover">
        <NavLink 
          to="/" 
          onClick={onClick}
          className={({ isActive }) => 
            `${baseStyles} ${mobileStyles} ${isActive ? activeStyles : ""}`
          }
        >
          Главная
        </NavLink>
      </motion.div>
      <motion.div variants={menuItemVariants} whileHover="hover">
        <NavLink 
          to="/cipher" 
          onClick={onClick}
          className={({ isActive }) => 
            `${baseStyles} ${mobileStyles} ${isActive ? activeStyles : ""}`
          }
        >
          Шифрование
        </NavLink>
      </motion.div>
      <motion.div variants={menuItemVariants} whileHover="hover">
        <NavLink 
          to="/about" 
          onClick={onClick}
          className={({ isActive }) => 
            `${baseStyles} ${mobileStyles} ${isActive ? activeStyles : ""}`
          }
        >
          О проекте
        </NavLink>
      </motion.div>
    </>
  );
}

export default Header; 