import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

// Анимации
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.4 }
  }
};

function NotFoundPage() {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="flex flex-col items-center justify-center py-20 px-4 text-center"
    >
      <motion.div 
        variants={itemVariants}
        className="text-9xl font-['Oswald',sans-serif] font-bold text-primary-500 mb-6"
      >
        404
      </motion.div>
      
      <motion.h1 
        variants={itemVariants}
        className="text-4xl font-['Oswald',sans-serif] mb-4"
      >
        Страница не найдена
      </motion.h1>
      
      <motion.p 
        variants={itemVariants}
        className="text-xl text-[#94a1b2] mb-12 max-w-md"
      >
        Кажется, вы пытаетесь расшифровать несуществующую страницу. Возможно, она была зашифрована слишком надежно.
      </motion.p>
      
      <motion.div variants={itemVariants}>
        <Link 
          to="/" 
          className="btn-primary text-lg px-8 py-3"
        >
          Вернуться на главную
        </Link>
      </motion.div>
      
      <motion.div 
        variants={itemVariants}
        initial={{ rotate: 0 }}
        animate={{ rotate: [0, 5, -5, 5, -5, 0] }}
        transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
        className="mt-16 text-8xl"
      >
        🔒
      </motion.div>
    </motion.div>
  );
}

export default NotFoundPage; 