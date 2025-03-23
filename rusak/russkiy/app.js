// Компоненты React для шифровальщика на основе правил русского языка

// Основные правила суффиксов и других элементов русского языка для шифрования
const russianRules = {
  // Правило гласных букв (а, о, у, э, ы, и, е, ё, ю, я)
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
function isUpperCase(char) {
  return char === char.toUpperCase() && char !== char.toLowerCase();
}

function preserveCase(originalChar, newChar) {
  return isUpperCase(originalChar) ? newChar.toUpperCase() : newChar.toLowerCase();
}

// Хеширование ключа для создания числового значения смещения
function hashKey(key) {
  let hash = 0;
  
  for (let i = 0; i < key.length; i++) {
    const char = key.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  
  return Math.abs(hash);
}

// Получение смещения для шифрования на основе ключа
function getShiftFromKey(key, baseShift = 3) {
  if (!key || key.trim() === '') return baseShift;
  
  const hash = hashKey(key);
  // Возвращает число от 1 до 15 для смещения
  return (hash % 15) + 1;
}

// Функции шифрования на основе правил русского языка
const cipherFunctions = {
  // 1. Шифрование на основе замены гласных следующими по кругу
  suffixVowelShift: (text, key) => {
    const { vowels } = russianRules;
    const shift = getShiftFromKey(key);
    
    return text.split('').map(char => {
      const lowerChar = char.toLowerCase();
      // Проверка на гласную букву
      const vowelIndex = vowels.indexOf(lowerChar);
      
      if (vowelIndex !== -1) {
        // Циклически заменяем гласную на следующую
        const newVowel = vowels[(vowelIndex + shift) % vowels.length];
        return preserveCase(char, newVowel);
      }
      
      return char;
    }).join('');
  },
  
  // 2. Шифрование по правилу парных согласных (замена на парную)
  consonantPairSwap: (text, key = '') => {
    const { consonantPairs } = russianRules;
    // Используем ключ для определения условия замены
    const keyHash = hashKey(key);
    
    return text.split('').map((char, index) => {
      const lowerChar = char.toLowerCase();
      
      // Используем индекс символа и хеш ключа для создания условия замены
      const shouldSwap = ((index + keyHash) % 3) !== 0;
      
      // Проверка на парную согласную
      if (lowerChar in consonantPairs && shouldSwap) {
        return preserveCase(char, consonantPairs[lowerChar]);
      }
      
      return char;
    }).join('');
  },
  
  // 3. Шифрование с учетом суффиксов существительных
  // Если находим суффикс, сдвигаем текст после суффикса
  nounSuffixCipher: (text, key = '') => {
    const { nounSuffixes } = russianRules;
    let result = text.toLowerCase();
    const shift = getShiftFromKey(key, 1);
    
    nounSuffixes.forEach(suffix => {
      const regex = new RegExp(`(\\S+)(${suffix})(\\S*)`, 'gi');
      result = result.replace(regex, (match, before, suff, after) => {
        // Шифруем текст после суффикса: смещаем каждую букву на shift позиций по алфавиту
        const shiftedAfter = after.split('').map(char => {
          if (/[а-яё]/i.test(char)) {
            const code = char.charCodeAt(0);
            let newCode;
            
            // Для букв русского алфавита
            if (code >= 1072 && code <= 1103) { // а-я (строчные)
              newCode = ((code - 1072 + shift) % 32) + 1072;
            } else if (code === 1105) { // ё (строчная)
              newCode = ((1105 + shift - 1) % 32) + 1072;
            } else {
              return char;
            }
            
            return String.fromCharCode(newCode);
          }
          return char;
        }).join('');
        
        return before + suff + shiftedAfter;
      });
    });
    
    return result;
  },
  
  // 4. Шифрование с учетом приставок - переворачиваем текст между приставкой и окончанием
  prefixReversal: (text, key = '') => {
    const { prefixes } = russianRules;
    let result = text;
    const useKey = key && key.trim() !== '';
    
    prefixes.forEach(prefix => {
      const regex = new RegExp(`\\b(${prefix})(\\S+)`, 'gi');
      result = result.replace(regex, (match, pref, rest) => {
        // Если есть ключ, делаем дополнительное преобразование
        if (useKey) {
          // XOR каждого символа с первым символом ключа (простая операция для демонстрации)
          const keyChar = key.charCodeAt(0);
          const transformed = rest.split('').map(char => {
            if (/[а-яё]/i.test(char)) {
              // Простое преобразование чтобы оставаться в пределах кириллицы
              const code = char.toLowerCase().charCodeAt(0);
              const delta = (code ^ keyChar) % 8; // Небольшое смещение на основе XOR
              let newCode;
              
              // Ограничиваем смещение чтобы остаться в пределах русского алфавита
              if (code >= 1072 && code <= 1103) { // а-я (строчные)
                newCode = ((code - 1072 + delta) % 32) + 1072;
              } else if (code === 1105) { // ё (строчная)
                newCode = delta % 2 === 0 ? 1105 : 1077; // ё или е
              } else {
                return char;
              }
              
              return isUpperCase(char) 
                ? String.fromCharCode(newCode).toUpperCase() 
                : String.fromCharCode(newCode);
            }
            return char;
          }).join('');
          
          // Переворачиваем преобразованный текст
          const reversed = transformed.split('').reverse().join('');
          return pref + reversed;
        }
        
        // Если ключа нет, просто переворачиваем
        const reversed = rest.split('').reverse().join('');
        return pref + reversed;
      });
    });
    
    return result;
  },
  
  // 5. Комбинированный метод (наиболее сложный)
  combinedRules: (text, key) => {
    // Применим последовательно несколько правил
    let result = text;
    
    // 1. Замена гласных
    result = cipherFunctions.suffixVowelShift(result, key);
    
    // 2. Обработка суффиксов
    result = cipherFunctions.nounSuffixCipher(result, key);
    
    // 3. Применим парную замену согласных
    result = cipherFunctions.consonantPairSwap(result, key);
    
    return result;
  }
};

// Функции дешифрования
const decipherFunctions = {
  // 1. Дешифрование с заменой гласных
  suffixVowelShift: (text, key = '') => {
    const { vowels } = russianRules;
    // Определяем сдвиг на основе ключа
    const shift = getShiftFromKey(key);
    
    return text.split('').map(char => {
      const lowerChar = char.toLowerCase();
      const vowelIndex = vowels.indexOf(lowerChar);
      
      if (vowelIndex !== -1) {
        // Обратное смещение для дешифрования (вычитаем shift)
        const newVowel = vowels[(vowelIndex - shift + vowels.length) % vowels.length];
        return preserveCase(char, newVowel);
      }
      
      return char;
    }).join('');
  },
  
  // 2. Дешифрование по правилу парных согласных
  consonantPairSwap: (text, key = '') => {
    const { consonantPairs } = russianRules;
    // Создаем обратное соответствие для дешифрования
    const reverseConsonantPairs = {};
    for (const [key, value] of Object.entries(consonantPairs)) {
      reverseConsonantPairs[value] = key;
    }
    
    // Используем ключ для определения условия замены
    const keyHash = hashKey(key);
    
    return text.split('').map((char, index) => {
      const lowerChar = char.toLowerCase();
      
      // Должно совпадать с условием в функции шифрования
      const shouldSwap = ((index + keyHash) % 3) !== 0;
      
      // Проверка для обратной замены
      if (lowerChar in reverseConsonantPairs && shouldSwap) {
        return preserveCase(char, reverseConsonantPairs[lowerChar]);
      } else if (lowerChar in consonantPairs && shouldSwap) {
        return preserveCase(char, consonantPairs[lowerChar]);
      }
      
      return char;
    }).join('');
  },
  
  // 3. Дешифрование с учетом суффиксов существительных
  nounSuffixCipher: (text, key = '') => {
    const { nounSuffixes } = russianRules;
    let result = text.toLowerCase();
    const shift = getShiftFromKey(key, 1);
    
    nounSuffixes.forEach(suffix => {
      const regex = new RegExp(`(\\S+)(${suffix})(\\S*)`, 'gi');
      result = result.replace(regex, (match, before, suff, after) => {
        // Обратное смещение для дешифрования
        const deshiftedAfter = after.split('').map(char => {
          if (/[а-яё]/i.test(char)) {
            const code = char.charCodeAt(0);
            let newCode;
            
            // Для букв русского алфавита (обратный сдвиг)
            if (code >= 1072 && code <= 1103) { // а-я (строчные)
              newCode = ((code - 1072 - shift + 32) % 32) + 1072;
            } else if (code === 1105) { // ё (строчная)
              newCode = ((32 + 1105 - shift - 1) % 32) + 1072;
            } else {
              return char;
            }
            
            return String.fromCharCode(newCode);
          }
          return char;
        }).join('');
        
        return before + suff + deshiftedAfter;
      });
    });
    
    return result;
  },
  
  // 4. Дешифрование с учетом приставок
  prefixReversal: (text, key = '') => {
    const { prefixes } = russianRules;
    let result = text;
    const useKey = key && key.trim() !== '';
    
    prefixes.forEach(prefix => {
      const regex = new RegExp(`\\b(${prefix})(\\S+)`, 'gi');
      result = result.replace(regex, (match, pref, rest) => {
        // Сначала переворачиваем текст обратно
        const reversed = rest.split('').reverse().join('');
        
        // Если использовался ключ, выполняем обратное преобразование
        if (useKey) {
          const keyChar = key.charCodeAt(0);
          return pref + reversed.split('').map(char => {
            if (/[а-яё]/i.test(char)) {
              const code = char.toLowerCase().charCodeAt(0);
              const delta = (code ^ keyChar) % 8; // То же смещение, что и при шифровании
              let newCode;
              
              // Обратное преобразование
              if (code >= 1072 && code <= 1103) { // а-я (строчные)
                newCode = ((code - 1072 - delta + 32) % 32) + 1072;
              } else if (code === 1105 || code === 1077) { // ё или е
                newCode = delta % 2 === 0 ? 1105 : 1077;
              } else {
                return char;
              }
              
              return isUpperCase(char) 
                ? String.fromCharCode(newCode).toUpperCase() 
                : String.fromCharCode(newCode);
            }
            return char;
          }).join('');
        }
        
        // Если ключа не было, просто возвращаем перевернутый текст
        return pref + reversed;
      });
    });
    
    return result;
  },
  
  // 5. Комбинированное дешифрование (в обратном порядке от шифрования)
  combinedRules: (text, key = '') => {
    let result = text;
    
    // 1. Сначала отменяем парную замену согласных
    result = decipherFunctions.consonantPairSwap(result, key);
    
    // 2. Обработка суффиксов
    result = decipherFunctions.nounSuffixCipher(result, key);
    
    // 3. В конце дешифруем гласные
    result = decipherFunctions.suffixVowelShift(result, key);
    
    return result;
  }
};

// Компонент ключа шифрования
const KeyInput = ({ keyValue, onChange, isRequired = false }) => {
  return (
    <div className="form-group">
      <label htmlFor="key-input">
        {isRequired ? 'Ключ шифрования (обязательно):' : 'Ключ шифрования (опционально):'}
      </label>
      <div className="key-input-container">
        <input 
          type="text" 
          id="key-input" 
          className="input-text" 
          value={keyValue}
          onChange={onChange}
          placeholder="Введите ключ для усиления шифрования..."
        />
      </div>
      <small className="input-hint">
        Ключ повышает стойкость шифрования. Тот же ключ потребуется для дешифрования.
      </small>
    </div>
  );
};

// Главный компонент приложения
const App = () => {
  const [activeTab, setActiveTab] = React.useState('encrypt');
  const [inputText, setInputText] = React.useState('');
  const [resultText, setResultText] = React.useState('');
  const [method, setMethod] = React.useState('suffixVowelShift');
  const [keyValue, setKeyValue] = React.useState('');
  
  // Обработка шифрования
  const handleEncrypt = () => {
    const encryptFunction = cipherFunctions[method];
    if (encryptFunction) {
      setResultText(encryptFunction(inputText, keyValue));
    }
  };
  
  // Обработка дешифрования
  const handleDecrypt = () => {
    const decryptFunction = decipherFunctions[method];
    if (decryptFunction) {
      setResultText(decryptFunction(inputText, keyValue));
    }
  };
  
  // Копирование текста в буфер обмена
  const copyToClipboard = () => {
    navigator.clipboard.writeText(resultText)
      .then(() => {
        // Визуальная обратная связь
        const copyBtn = document.querySelector(`.tab-content.active .secondary-btn`);
        copyBtn.textContent = "Скопировано!";
        copyBtn.classList.add("glow-effect");
        
        setTimeout(() => {
          copyBtn.textContent = "Копировать в буфер обмена";
          copyBtn.classList.remove("glow-effect");
        }, 2000);
      })
      .catch(err => {
        console.error('Ошибка при копировании: ', err);
      });
  };
  
  return (
    <div className="container">
      <header>
        <h1 data-text="Шифровщик Русак">Шифровщик Русак</h1>
        <p className="subtitle">Шифрование текста с использованием правил русского языка</p>
      </header>
      
      <main>
        <div className="tabs">
          <button 
            className={`tab-btn ${activeTab === 'encrypt' ? 'active' : ''}`} 
            onClick={() => setActiveTab('encrypt')}
          >
            Шифрование
          </button>
          <button 
            className={`tab-btn ${activeTab === 'decrypt' ? 'active' : ''}`} 
            onClick={() => setActiveTab('decrypt')}
          >
            Дешифрование
          </button>
          <button 
            className={`tab-btn ${activeTab === 'about' ? 'active' : ''}`} 
            onClick={() => setActiveTab('about')}
          >
            О проекте
          </button>
        </div>
        
        {activeTab === 'encrypt' && (
          <div className="card">
            <h2>Шифрование текста</h2>
            <div className="form-group">
              <label htmlFor="encryption-method">Выберите метод шифрования:</label>
              <select 
                id="encryption-method" 
                className="select-method"
                value={method}
                onChange={(e) => setMethod(e.target.value)}
              >
                <option value="suffixVowelShift">Замена гласных по правилам</option>
                <option value="consonantPairSwap">Правило парных согласных</option>
                <option value="nounSuffixCipher">Шифрование суффиксов существительных</option>
                <option value="prefixReversal">Шифрование приставок</option>
                <option value="combinedRules">Комбинированный метод</option>
              </select>
            </div>
            
            <KeyInput 
              keyValue={keyValue}
              onChange={(e) => setKeyValue(e.target.value)}
            />
            
            <div className="form-group">
              <label htmlFor="input-text">Введите текст для шифрования:</label>
              <textarea 
                id="input-text" 
                placeholder="Введите ваш текст на русском языке..." 
                rows="6"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
              ></textarea>
            </div>
            
            <button 
              className="action-btn"
              onClick={handleEncrypt}
            >
              Зашифровать
            </button>
            
            <div className="form-group">
              <label htmlFor="result-text">Результат шифрования:</label>
              <textarea 
                id="result-text" 
                readOnly 
                rows="6"
                value={resultText}
              ></textarea>
              <button 
                className="secondary-btn"
                onClick={copyToClipboard}
              >
                Копировать в буфер обмена
              </button>
            </div>
          </div>
        )}
        
        {activeTab === 'decrypt' && (
          <div className="card">
            <h2>Дешифрование текста</h2>
            <div className="form-group">
              <label htmlFor="decryption-method">Выберите метод дешифрования:</label>
              <select 
                id="decryption-method" 
                className="select-method"
                value={method}
                onChange={(e) => setMethod(e.target.value)}
              >
                <option value="suffixVowelShift">Замена гласных по правилам</option>
                <option value="consonantPairSwap">Правило парных согласных</option>
                <option value="nounSuffixCipher">Шифрование суффиксов существительных</option>
                <option value="prefixReversal">Шифрование приставок</option>
                <option value="combinedRules">Комбинированный метод</option>
              </select>
            </div>
            
            <KeyInput 
              keyValue={keyValue}
              onChange={(e) => setKeyValue(e.target.value)}
              isRequired={true}
            />
            
            <div className="form-group">
              <label htmlFor="input-decrypt-text">Введите текст для дешифрования:</label>
              <textarea 
                id="input-decrypt-text" 
                placeholder="Введите зашифрованный текст..." 
                rows="6"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
              ></textarea>
            </div>
            
            <button 
              className="action-btn"
              onClick={handleDecrypt}
            >
              Дешифровать
            </button>
            
            <div className="form-group">
              <label htmlFor="result-decrypt-text">Результат дешифрования:</label>
              <textarea 
                id="result-decrypt-text" 
                readOnly 
                rows="6"
                value={resultText}
              ></textarea>
              <button 
                className="secondary-btn"
                onClick={copyToClipboard}
              >
                Копировать в буфер обмена
              </button>
            </div>
          </div>
        )}
        
        {activeTab === 'about' && (
          <div className="card">
            <h2>О проекте</h2>
            <p>Проект "Шифровщик Русак" представляет собой веб-инструмент для шифрования и дешифрования текста с использованием правил русского языка, в частности работы с суффиксами, приставками и другими лингвистическими особенностями.</p>
            
            <h3>Доступные методы шифрования:</h3>
            <ul>
              <li>
                <strong>Замена гласных по правилам</strong> - гласные буквы заменяются циклическим сдвигом в соответствии с их порядком в русском языке.
              </li>
              <li>
                <strong>Правило парных согласных</strong> - согласные буквы, образующие пары по звонкости/глухости (б-п, в-ф и т.д.), заменяются друг на друга.
              </li>
              <li>
                <strong>Шифрование суффиксов существительных</strong> - при обнаружении суффикса существительного, текст после суффикса шифруется смещением букв.
              </li>
              <li>
                <strong>Шифрование приставок</strong> - при обнаружении приставки, текст между приставкой и окончанием переворачивается.
              </li>
              <li>
                <strong>Комбинированный метод</strong> - комбинация всех вышеперечисленных методов для создания более сложного шифра.
              </li>
            </ul>
            
            <h3>Использование ключа:</h3>
            <p>Для повышения надежности шифрования вы можете использовать ключ. Один и тот же ключ должен быть использован как при шифровании, так и при дешифровании текста. Ключ влияет на алгоритм шифрования, добавляя дополнительные уровни преобразования текста.</p>
            
            <p>Данный инструмент предназначен для образовательных и развлекательных целей и не предоставляет криптографической стойкости, достаточной для защиты конфиденциальной информации.</p>
          </div>
        )}
      </main>
      
      <footer>
        <p>&copy; 2025 Шифровщик Русак | Создано с ♥ к русскому языку</p>
      </footer>
    </div>
  );
};

// Рендеринг React-приложения
ReactDOM.render(<App />, document.getElementById('root'));
