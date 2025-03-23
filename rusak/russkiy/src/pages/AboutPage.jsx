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

function AboutPage() {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="py-6 max-w-4xl mx-auto"
    >
      <motion.h1 
        variants={itemVariants}
        className="text-4xl md:text-5xl font-['Oswald',sans-serif] text-center mb-10"
      >
        <span className="bg-gradient-to-r from-primary-500 to-accent-500 bg-clip-text text-transparent">
          О проекте
        </span>
      </motion.h1>
      
      {/* О проекте */}
      <motion.section variants={itemVariants} className="mb-16">
        <div className="card">
          <h2 className="text-2xl font-['Oswald',sans-serif] mb-6">Русак</h2>
          <p className="text-[#94a1b2] mb-4">
            Русак — это современный инструмент шифрования, использующий как классические криптографические алгоритмы, так и уникальные лингвистические особенности русского языка для создания надежных шифров.
          </p>
          <p className="text-[#94a1b2] mb-4">
            Наш проект сочетает в себе проверенную временем криптографию с инновационными подходами, основанными на лингвистических правилах русского языка, что делает дешифрование без знания ключа практически невозможным.
          </p>
          <p className="text-[#94a1b2]">
            Все алгоритмы шифрования работают полностью в браузере на стороне клиента, обеспечивая максимальную конфиденциальность ваших данных.
          </p>
        </div>
      </motion.section>
      
      {/* Конфиденциальность */}
      <motion.section variants={itemVariants} id="privacy" className="mb-16">
        <div className="card">
          <h2 className="text-2xl font-['Oswald',sans-serif] mb-6">Конфиденциальность данных</h2>
          <p className="text-[#94a1b2] mb-4">
            Мы серьезно относимся к защите ваших данных. Русак разработан с учетом принципа "нулевого знания", что означает:
          </p>
          <ul className="list-disc pl-5 mb-4 text-[#94a1b2] space-y-2">
            <li>Ваши данные никогда не покидают ваш браузер</li>
            <li>Мы не храним ваши тексты или ключи шифрования</li>
            <li>Все операции шифрования и дешифрования выполняются локально</li>
            <li>Сервис не требует регистрации и не отслеживает ваши действия</li>
          </ul>
          <p className="text-[#94a1b2]">
            Исходный код проекта открыт и доступен для проверки, что гарантирует отсутствие скрытых функций или "бэкдоров".
          </p>
        </div>
      </motion.section>
      
      {/* Безопасность */}
      <motion.section variants={itemVariants} id="security" className="mb-16">
        <div className="card">
          <h2 className="text-2xl font-['Oswald',sans-serif] mb-6">Безопасность</h2>
          <p className="text-[#94a1b2] mb-4">
            Русак обеспечивает высокий уровень безопасности благодаря:
          </p>
          <ul className="list-disc pl-5 mb-4 text-[#94a1b2] space-y-2">
            <li>Использованию современных стандартов шифрования (AES-256)</li>
            <li>Комбинированию криптографических и лингвистических методов защиты</li>
            <li>Применению солей и ключей дополнительного шифрования</li>
            <li>Использованию высокопроизводительных алгоритмов с минимальными возможностями перехвата</li>
          </ul>
          <p className="text-[#94a1b2]">
            Все методы шифрования разработаны таким образом, чтобы обеспечить максимальную защиту от современных методов криптоанализа.
          </p>
        </div>
      </motion.section>
      
      {/* Контакты */}
      <motion.section variants={itemVariants} id="contact">
        <div className="card">
          <h2 className="text-2xl font-['Oswald',sans-serif] mb-6">Контакты</h2>
          <p className="text-[#94a1b2] mb-4">
            Если у вас есть вопросы, предложения по улучшению или вы обнаружили проблему, пожалуйста, свяжитесь с нами:
          </p>
          <div className="flex flex-col space-y-3">
            <div className="flex items-center text-[#94a1b2]">
              <svg className="w-5 h-5 mr-3 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span>support@rusak.doomt.ru</span>
            </div>
            <div className="flex items-center text-[#94a1b2]">
              <svg className="w-5 h-5 mr-3 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
              <span>rusak.doomt.ru</span>
            </div>
          </div>
        </div>
      </motion.section>
    </motion.div>
  );
}

export default AboutPage; 