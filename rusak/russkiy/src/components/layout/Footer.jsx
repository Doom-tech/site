import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-[#242629] py-8 mt-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-1">
            <Link to="/" className="block mb-4">
              <span className="text-2xl font-['Oswald',sans-serif] font-bold bg-gradient-to-r from-primary-500 to-accent-500 bg-clip-text text-transparent">
                Русак
              </span>
            </Link>
            <p className="text-[#94a1b2] mb-4">
              Современный шифровальщик на основе правил русского языка. Безопасно шифруйте и дешифруйте тексты с учетом лингвистических особенностей.
            </p>
          </div>
          
          <div className="md:col-span-1">
            <h3 className="text-xl font-['Oswald',sans-serif] mb-4 text-[#fffffe]">Навигация</h3>
            <ul className="space-y-2">
              <FooterLink to="/">Главная</FooterLink>
              <FooterLink to="/cipher">Шифрование</FooterLink>
              <FooterLink to="/about">О проекте</FooterLink>
            </ul>
          </div>
          
          <div className="md:col-span-1">
            <h3 className="text-xl font-['Oswald',sans-serif] mb-4 text-[#fffffe]">Информация</h3>
            <ul className="space-y-2">
              <FooterLink to="/about#privacy">Конфиденциальность</FooterLink>
              <FooterLink to="/about#security">Безопасность</FooterLink>
              <FooterLink to="/about#contact">Контакты</FooterLink>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-[#2e2f35] mt-8 pt-8 text-center text-[#94a1b2] text-sm">
          <p>© {currentYear} Русак. Все права защищены.</p>
        </div>
      </div>
    </footer>
  );
}

function FooterLink({ to, children }) {
  return (
    <li>
      <motion.div
        whileHover={{ x: 5 }}
        transition={{ duration: 0.2 }}
      >
        <Link 
          to={to} 
          className="text-[#94a1b2] hover:text-primary-500 transition-colors duration-200"
        >
          {children}
        </Link>
      </motion.div>
    </li>
  );
}

export default Footer; 