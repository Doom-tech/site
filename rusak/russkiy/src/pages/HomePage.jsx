import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

// Анимации
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.3
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5 }
  }
};

function HomePage() {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="py-12"
    >
      {/* Герой-секция */}
      <section className="text-center mb-20">
        <motion.div variants={itemVariants} className="mb-6">
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-6 font-['Oswald',sans-serif]">
            <span className="bg-gradient-to-r from-primary-500 via-secondary-500 to-accent-500 bg-clip-text text-transparent">
              РусШифр
            </span>
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto text-[#94a1b2]">
            Современный шифровальщик с использованием особенностей русского языка и продвинутой криптографии
          </p>
        </motion.div>
        
        <motion.div variants={itemVariants}>
          <Link 
            to="/cipher" 
            className="btn-primary text-lg px-8 py-3"
          >
            Начать шифрование
          </Link>
        </motion.div>
      </section>
      
      {/* Особенности */}
      <section className="my-20">
        <motion.h2 
          variants={itemVariants}
          className="text-3xl md:text-4xl font-['Oswald',sans-serif] text-center mb-16"
        >
          Уникальные особенности
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard 
            title="Лингвистическое шифрование" 
            icon="🔤"
            description="Используйте уникальные правила русского языка для создания сложных шифров, недоступных стандартным алгоритмам дешифровки."
          />
          
          <FeatureCard 
            title="AES-256 шифрование" 
            icon="🔒"
            description="Современные алгоритмы криптографии с 256-битным ключом обеспечивают высочайший уровень безопасности ваших данных."
          />
          
          <FeatureCard 
            title="Гибридное шифрование" 
            icon="🧠"
            description="Комбинируйте лингвистические и криптографические методы для создания уникальных многоуровневых шифров."
          />
        </div>
      </section>
      
      {/* Как это работает */}
      <section className="my-20 bg-[#242629] p-8 rounded-xl">
        <motion.h2 
          variants={itemVariants}
          className="text-3xl md:text-4xl font-['Oswald',sans-serif] text-center mb-12"
        >
          Как это работает
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div 
            variants={itemVariants}
            className="order-2 md:order-1"
          >
            <ol className="space-y-8">
              <StepItem 
                number="01" 
                title="Выберите метод шифрования"
                description="Выберите один из лингвистических или криптографических методов шифрования, или их комбинацию."
              />
              <StepItem 
                number="02" 
                title="Введите текст и ключ"
                description="Введите текст, который нужно зашифровать, и надежный ключ (пароль) для шифрования."
              />
              <StepItem 
                number="03" 
                title="Получите результат"
                description="Мгновенно получите зашифрованный текст, готовый для безопасной передачи."
              />
            </ol>
          </motion.div>
          
          <motion.div 
            variants={itemVariants}
            className="order-1 md:order-2 flex justify-center"
          >
            <div className="relative w-64 h-64 md:w-80 md:h-80">
              <div className="absolute inset-0 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full opacity-20 animate-pulse-gentle"></div>
              <div className="absolute inset-4 bg-[#16161a] rounded-full flex items-center justify-center">
                <span className="text-6xl">🔐</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Призыв к действию */}
      <section className="my-20 text-center">
        <motion.div variants={itemVariants}>
          <h2 className="text-3xl md:text-4xl font-['Oswald',sans-serif] mb-6">
            Готовы защитить свои литературные произведения?
          </h2>
          <p className="text-xl text-[#94a1b2] mb-8 max-w-2xl mx-auto">
            Начните использовать Русак прямо сейчас — это быстро, безопасно и не требует регистрации!
          </p>
          <Link 
            to="/cipher" 
            className="btn-accent text-lg px-8 py-3"
          >
            Начать шифрование
          </Link>
        </motion.div>
      </section>
    </motion.div>
  );
}

function FeatureCard({ title, icon, description }) {
  return (
    <motion.div 
      variants={itemVariants}
      className="card hover:shadow-glow hover:-translate-y-2"
    >
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-xl font-['Oswald',sans-serif] mb-3">{title}</h3>
      <p className="text-[#94a1b2]">{description}</p>
    </motion.div>
  );
}

function StepItem({ number, title, description }) {
  return (
    <li className="flex">
      <div className="flex-shrink-0 w-12 h-12 bg-primary-800 rounded-full flex items-center justify-center mr-4 font-['Oswald',sans-serif] text-lg">
        {number}
      </div>
      <div>
        <h4 className="text-lg font-['Oswald',sans-serif] mb-1">{title}</h4>
        <p className="text-[#94a1b2]">{description}</p>
      </div>
    </li>
  );
}

export default HomePage; 