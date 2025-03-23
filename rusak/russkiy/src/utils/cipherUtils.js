import CryptoJS from 'crypto-js';
import { nanoid } from 'nanoid';

// Основные правила русского языка для лингвистического шифрования
export const russianRules = {
  // Гласные буквы (а, о, у, э, ы, и, е, ё, ю, я)
  vowels: ['а', 'о', 'у', 'э', 'ы', 'и', 'е', 'ё', 'ю', 'я'],
  
  // Парные согласные (б-п, в-ф, г-к, д-т, ж-ш, з-с)
  consonantPairs: {
    'б': 'п', 'п': 'б',
    'в': 'ф', 'ф': 'в',
    'г': 'к', 'к': 'г',
    'д': 'т', 'т': 'д',
    'ж': 'ш', 'ш': 'ж',
    'з': 'с', 'с': 'з'
  },
  
  // Суффиксы существительных
  nounSuffixes: ['ок', 'ик', 'чик', 'щик', 'ник', 'тель', 'ист', 'изм', 'ость', 'есть', 'ств', 'ени', 'ани'],
  
  // Суффиксы прилагательных
  adjectiveSuffixes: ['ов', 'ев', 'н', 'нн', 'ск', 'к', 'ив', 'лив', 'чив', 'ист'],
  
  // Суффиксы глаголов
  verbSuffixes: ['ть', 'ти', 'чь', 'ыва', 'ива', 'ова', 'ева', 'ну'],
  
  // Приставки
  prefixes: ['под', 'над', 'от', 'об', 'без', 'бес', 'раз', 'рас', 'из', 'ис', 'воз', 'вос', 'низ', 'нис', 'пре', 'при', 'пере']
};

// Вспомогательные функции
const isUpperCase = (char) => {
  return char === char.toUpperCase() && char !== char.toLowerCase();
};

const preserveCase = (originalChar, newChar) => {
  return isUpperCase(originalChar) ? newChar.toUpperCase() : newChar.toLowerCase();
};

// Генерация безопасной соли для хеширования
export const generateSalt = () => {
  return nanoid(16);
};

// Безопасное хеширование пароля с солью
export const hashPassword = (password, salt) => {
  const combinedString = password + salt;
  return CryptoJS.SHA256(combinedString).toString(CryptoJS.enc.Hex);
};

// Получение ключа для шифрования на основе пароля и соли
const getDerivedKey = (password, salt) => {
  if (!password || password.trim() === '') return '';
  
  // Используем PBKDF2 для генерации ключа из пароля
  const key = CryptoJS.PBKDF2(password, salt, {
    keySize: 256 / 32,
    iterations: 1000
  });
  
  return key.toString();
};

// Методы шифрования

// 1. AES шифрование
export const aesEncrypt = (text, password, salt) => {
  if (!text) return '';
  
  const key = getDerivedKey(password, salt);
  const encrypted = CryptoJS.AES.encrypt(text, key);
  
  return encrypted.toString();
};

export const aesDecrypt = (ciphertext, password, salt) => {
  if (!ciphertext) return '';
  
  try {
    const key = getDerivedKey(password, salt);
    const decrypted = CryptoJS.AES.decrypt(ciphertext, key);
    
    return decrypted.toString(CryptoJS.enc.Utf8);
  } catch (error) {
    console.error('Ошибка дешифрования:', error);
    return '';
  }
};

// 2. Лингвистическое шифрование - сдвиг гласных
export const vowelShiftEncrypt = (text, password) => {
  if (!text) return '';
  
  const { vowels } = russianRules;
  const hash = hashPassword(password, 'vowelShift');
  const shift = (parseInt(hash.substring(0, 8), 16) % 10) + 1; // Получаем сдвиг 1-10
  
  return text.split('').map(char => {
    const lowerChar = char.toLowerCase();
    // Проверка на гласную букву
    const vowelIndex = vowels.indexOf(lowerChar);
    
    if (vowelIndex !== -1) {
      // Циклически заменяем гласную на следующую по алгоритму с учетом сдвига
      const newVowel = vowels[(vowelIndex + shift) % vowels.length];
      return preserveCase(char, newVowel);
    }
    
    return char;
  }).join('');
};

export const vowelShiftDecrypt = (text, password) => {
  if (!text) return '';
  
  const { vowels } = russianRules;
  const hash = hashPassword(password, 'vowelShift');
  const shift = (parseInt(hash.substring(0, 8), 16) % 10) + 1; // Получаем тот же сдвиг 1-10
  
  return text.split('').map(char => {
    const lowerChar = char.toLowerCase();
    // Проверка на гласную букву
    const vowelIndex = vowels.indexOf(lowerChar);
    
    if (vowelIndex !== -1) {
      // Циклически заменяем гласную на предыдущую с учетом сдвига
      const newIndex = (vowelIndex - shift + vowels.length) % vowels.length;
      const newVowel = vowels[newIndex];
      return preserveCase(char, newVowel);
    }
    
    return char;
  }).join('');
};

// 3. Лингвистическое шифрование - замена парных согласных
export const consonantSwapEncrypt = (text, password) => {
  if (!text) return '';
  
  const { consonantPairs } = russianRules;
  const hash = hashPassword(password, 'consonantSwap');
  
  return text.split('').map((char, index) => {
    const lowerChar = char.toLowerCase();
    
    // Используем хеш пароля и индекс символа для создания условия замены
    const byteValue = parseInt(hash.charAt(index % hash.length), 16);
    const shouldSwap = (byteValue % 2 === 0);
    
    // Проверка на парную согласную
    if (lowerChar in consonantPairs && shouldSwap) {
      return preserveCase(char, consonantPairs[lowerChar]);
    }
    
    return char;
  }).join('');
};

export const consonantSwapDecrypt = (text, password) => {
  // Для этого алгоритма процесс дешифрования идентичен шифрованию, 
  // так как парная согласная заменяется на парную (Б на П и наоборот)
  return consonantSwapEncrypt(text, password);
};

// 4. Комбинированный метод - гибридное шифрование
// Сначала применяем лингвистическое шифрование, затем AES
export const hybridEncrypt = (text, password, salt) => {
  if (!text) return '';
  
  // Шаг 1: Лингвистическое шифрование
  const vowelShifted = vowelShiftEncrypt(text, password);
  const consonantSwapped = consonantSwapEncrypt(vowelShifted, password);
  
  // Шаг 2: AES шифрование
  return aesEncrypt(consonantSwapped, password, salt);
};

export const hybridDecrypt = (ciphertext, password, salt) => {
  if (!ciphertext) return '';
  
  try {
    // Шаг 1: AES дешифрование
    const aesDecrypted = aesDecrypt(ciphertext, password, salt);
    if (!aesDecrypted) return '';
    
    // Шаг 2: Лингвистическое дешифрование (в обратном порядке)
    const consonantSwapDecrypted = consonantSwapDecrypt(aesDecrypted, password);
    return vowelShiftDecrypt(consonantSwapDecrypted, password);
  } catch (error) {
    console.error('Ошибка гибридного дешифрования:', error);
    return '';
  }
}; 