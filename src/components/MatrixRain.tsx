import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';

const MatrixCanvas = styled.canvas`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
`;

// Символы для матричного дождя
const MATRIX_CHARACTERS = [
  'ﾊ', 'ﾐ', 'ﾋ', 'ｰ', 'ｳ', 'ｼ', 'ﾅ', 'ﾓ', 'ﾆ', 'ｻ',
  'ﾜ', 'ﾂ', 'ｵ', 'ﾘ', 'ｱ', 'ﾎ', 'ﾃ', 'ﾏ', 'ｹ', 'ﾒ',
  'ｴ', 'ｶ', 'ｷ', 'ﾑ', 'ﾕ', 'ﾗ', 'ｾ', 'ﾈ', 'ｽ', 'ﾀ',
  'ﾇ', 'ﾍ', 'ｦ', 'ｲ', 'ｸ', 'ｺ', 'ｿ', 'ﾁ', 'ﾄ', 'ﾉ',
  'ﾌ', 'ﾐ', 'ﾖ', 'ﾙ', 'ﾚ', 'ﾛ', '0', '1', '2', '3',
  '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D',
  'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N',
  'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X',
  'Y', 'Z'
];

interface MatrixRainProps {
  opacity?: number;
}

const MatrixRain: React.FC<MatrixRainProps> = ({ opacity = 0.8 }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Получение случайного символа из набора
  const getRandomChar = () => {
    return MATRIX_CHARACTERS[Math.floor(Math.random() * MATRIX_CHARACTERS.length)];
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Устанавливаем размеры canvas равными размерам окна
    const resizeCanvas = () => {
      if (canvas) {
        canvas.width = canvas.clientWidth;
        canvas.height = canvas.clientHeight;
      }
    };

    // Вызываем функцию при монтировании и при изменении размера окна
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    
    // Массив для хранения позиций Y для каждой колонки
    const drops: number[] = [];
    for (let i = 0; i < columns; i++) {
      // Начальная позиция для каждой колонки - случайное положение вне экрана
      drops[i] = Math.floor(Math.random() * -canvas.height / fontSize);
    }

    // Функция отрисовки матричного дождя
    const draw = () => {
      // Прозрачный черный цвет создает эффект затухания
      ctx.fillStyle = `rgba(0, 0, 0, 0.05)`;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Устанавливаем цвет и шрифт для символов
      ctx.fillStyle = '#0F0';
      ctx.font = `${fontSize}px monospace`;
      
      // Отрисовка символов
      for (let i = 0; i < drops.length; i++) {
        // Случайный символ для текущей позиции
        const text = getRandomChar();
        
        // Отрисовка символа
        const x = i * fontSize;
        const y = drops[i] * fontSize;
        
        // Первый символ в колонке делаем светлее для эффекта "головы" дождя
        if (drops[i] >= 0) {
          ctx.fillStyle = '#FFF'; // Белый цвет для "головы"
          ctx.fillText(text, x, y);
          ctx.fillStyle = '#0F0'; // Возвращаем зеленый для остальных символов
        }
        
        // Смещаем символ вниз на следующей итерации
        drops[i]++;
        
        // Если символ вышел за пределы экрана, создаем новую "каплю" с вероятностью
        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = Math.floor(Math.random() * -10); // Начинаем новую "каплю" над экраном
        }
      }
    };

    // Запускаем анимацию
    const intervalId = setInterval(draw, 33); // ~30 fps

    // Очистка при размонтировании компонента
    return () => {
      clearInterval(intervalId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return <MatrixCanvas ref={canvasRef} style={{ opacity }} />;
};

export default MatrixRain; 