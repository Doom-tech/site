import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { 
  aesEncrypt, 
  aesDecrypt, 
  vowelShiftEncrypt, 
  vowelShiftDecrypt,
  consonantSwapEncrypt,
  consonantSwapDecrypt,
  hybridEncrypt,
  hybridDecrypt,
  generateSalt
} from '../utils/cipherUtils';

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

// Доступные методы шифрования
const encryptionMethods = [
  { id: 'aes', name: 'AES-256', description: 'Стандарт шифрования Advanced Encryption Standard с 256-битным ключом' },
  { id: 'vowelShift', name: 'Сдвиг гласных', description: 'Лингвистический метод замены гласных букв на основе ключа' },
  { id: 'consonantSwap', name: 'Замена согласных', description: 'Замена парных согласных на их фонетические пары' },
  { id: 'hybrid', name: 'Гибридный метод', description: 'Комбинация лингвистического и AES шифрования для максимальной защиты' },
];

function CipherToolPage() {
  const [mode, setMode] = useState('encrypt'); // encrypt или decrypt
  const [method, setMethod] = useState('hybrid');
  const [result, setResult] = useState('');
  const [salt, setSalt] = useState('');
  const [copied, setCopied] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  
  const { register, handleSubmit, formState: { errors }, watch, reset } = useForm({
    defaultValues: {
      text: '',
      password: '',
    }
  });
  
  // Генерируем соль при загрузке компонента
  useEffect(() => {
    setSalt(generateSalt());
  }, []);
  
  // Обработчик смены режима шифрования
  const handleModeChange = (newMode) => {
    if (newMode !== mode) {
      setMode(newMode);
      // Очищаем поля ввода и результат
      reset({
        text: '',
        password: '',
      });
      setResult('');
    }
  };
  
  // Обработчик смены метода шифрования
  const handleMethodChange = (newMethod) => {
    if (newMethod !== method) {
      setMethod(newMethod);
      // Очищаем результат при смене метода
      setResult('');
    }
  };
  
  // Функция обработки текста
  const processText = (data) => {
    const { text, password } = data;
    let processedText = '';
    
    try {
      if (mode === 'encrypt') {
        switch (method) {
          case 'aes':
            processedText = aesEncrypt(text, password, salt);
            break;
          case 'vowelShift':
            processedText = vowelShiftEncrypt(text, password);
            break;
          case 'consonantSwap':
            processedText = consonantSwapEncrypt(text, password);
            break;
          case 'hybrid':
            processedText = hybridEncrypt(text, password, salt);
            break;
          default:
            processedText = '';
        }
      } else {
        switch (method) {
          case 'aes':
            processedText = aesDecrypt(text, password, salt);
            break;
          case 'vowelShift':
            processedText = vowelShiftDecrypt(text, password);
            break;
          case 'consonantSwap':
            processedText = consonantSwapDecrypt(text, password);
            break;
          case 'hybrid':
            processedText = hybridDecrypt(text, password, salt);
            break;
          default:
            processedText = '';
        }
      }
      
      setResult(processedText);
    } catch (error) {
      console.error('Ошибка обработки текста:', error);
      setResult('Произошла ошибка при обработке текста. Проверьте правильность ввода и пароля.');
    }
  };
  
  const copyToClipboard = async () => {
    if (result) {
      try {
        await navigator.clipboard.writeText(result);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error('Не удалось скопировать текст:', err);
      }
    }
  };
  
  const toggleHelp = () => {
    setShowHelp(!showHelp);
  };
  
  const currentTextLength = watch('text')?.length || 0;
  
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="py-6"
    >
      <motion.h1 
        variants={itemVariants}
        className="text-4xl md:text-5xl font-['Oswald',sans-serif] text-center mb-8"
      >
        <span className="bg-gradient-to-r from-primary-500 to-accent-500 bg-clip-text text-transparent">
          Инструмент шифрования
        </span>
      </motion.h1>
      
      <motion.p 
        variants={itemVariants}
        className="text-center text-[#94a1b2] mb-10 max-w-3xl mx-auto"
      >
        Выберите режим, метод шифрования, введите текст и ключ для шифрования или дешифрования.
      </motion.p>
      
      {/* Режим работы */}
      <motion.div 
        variants={itemVariants}
        className="flex justify-center mb-8"
      >
        <div className="bg-[#242629] p-1 rounded-lg flex">
          <button
            className={`px-6 py-2 rounded-lg transition-all ${mode === 'encrypt' ? 'bg-primary-600 text-[#fffffe]' : 'text-[#94a1b2] hover:text-[#fffffe]'}`}
            onClick={() => handleModeChange('encrypt')}
          >
            Шифрование
          </button>
          <button
            className={`px-6 py-2 rounded-lg transition-all ${mode === 'decrypt' ? 'bg-secondary-600 text-[#fffffe]' : 'text-[#94a1b2] hover:text-[#fffffe]'}`}
            onClick={() => handleModeChange('decrypt')}
          >
            Дешифрование
          </button>
        </div>
      </motion.div>
      
      {/* Основной интерфейс */}
      <motion.div variants={itemVariants} className="card max-w-4xl mx-auto">
        {/* Выбор метода шифрования */}
        <div className="mb-6">
          <label className="label flex items-center">
            Метод шифрования
            <button 
              onClick={toggleHelp}
              className="ml-2 text-[#94a1b2] hover:text-primary-500"
              aria-label="Показать справку о методах шифрования"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </button>
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
            {encryptionMethods.map((m) => (
              <button
                key={m.id}
                type="button"
                className={`p-3 rounded-lg text-center transition-all ${
                  method === m.id 
                    ? 'bg-primary-600 text-[#fffffe]' 
                    : 'bg-[#2e2f35] text-[#94a1b2] hover:bg-[#3a3b42]'
                }`}
                onClick={() => handleMethodChange(m.id)}
              >
                {m.name}
              </button>
            ))}
          </div>
          
          {/* Справка по методам */}
          {showHelp && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-4 p-4 bg-[#2e2f35] rounded-lg text-[#94a1b2]"
            >
              <h3 className="text-lg font-['Oswald',sans-serif] text-[#fffffe] mb-3">О методах шифрования:</h3>
              <ul className="space-y-2">
                {encryptionMethods.map((m) => (
                  <li key={m.id} className="flex">
                    <strong className="inline-block min-w-20 text-primary-500">{m.name}:</strong>
                    <span className="ml-2">{m.description}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </div>
        
        <form onSubmit={handleSubmit(processText)}>
          {/* Ввод текста */}
          <div className="input-group">
            <label htmlFor="text" className="label flex items-center justify-between">
              <span>{mode === 'encrypt' ? 'Текст для шифрования' : 'Текст для дешифрования'}</span>
              <span className="text-sm text-light-300">{currentTextLength} символов</span>
            </label>
            <textarea
              id="text"
              className="textarea"
              placeholder={mode === 'encrypt' ? 'Введите текст для шифрования...' : 'Введите зашифрованный текст...'}
              {...register('text', { required: 'Необходимо ввести текст' })}
            />
            {errors.text && <p className="mt-1 text-secondary-500 text-sm">{errors.text.message}</p>}
          </div>
          
          {/* Ввод пароля */}
          <div className="input-group">
            <label htmlFor="password" className="label">
              Ключ (пароль)
            </label>
            <input
              type="password"
              id="password"
              className="input"
              placeholder="Введите надежный пароль..."
              {...register('password', { 
                required: 'Необходим пароль для шифрования/дешифрования',
                minLength: {
                  value: 6,
                  message: 'Пароль должен содержать минимум 6 символов'
                }
              })}
            />
            {errors.password && <p className="mt-1 text-secondary-500 text-sm">{errors.password.message}</p>}
          </div>
          
          {/* Кнопка обработки */}
          <button
            type="submit"
            className={`w-full py-3 rounded-lg font-medium text-lg ${
              mode === 'encrypt' ? 'bg-primary-600 hover:bg-primary-700' : 'bg-secondary-600 hover:bg-secondary-700'
            } text-light-100 transition-all`}
          >
            {mode === 'encrypt' ? 'Зашифровать' : 'Дешифровать'}
          </button>
        </form>
        
        {/* Результат */}
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8"
          >
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-xl font-['Oswald',sans-serif]">Результат:</h3>
              <button
                onClick={copyToClipboard}
                className="text-primary-500 hover:text-primary-400 flex items-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5 mr-1">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                </svg>
                {copied ? 'Скопировано!' : 'Скопировать'}
              </button>
            </div>
            <div className="bg-[#2e2f35] p-4 rounded-lg whitespace-pre-wrap break-words">
              {result}
            </div>
          </motion.div>
        )}
      </motion.div>
      
      {/* Информация о безопасности */}
      <motion.div 
        variants={itemVariants}
        className="mt-12 text-center text-[#94a1b2] text-sm"
      >
        <p>Все операции шифрования и дешифрования выполняются только в вашем браузере.</p>
        <p>Данные не отправляются на сервер и не сохраняются нигде, кроме вашего устройства.</p>
      </motion.div>
    </motion.div>
  );
}

export default CipherToolPage; 