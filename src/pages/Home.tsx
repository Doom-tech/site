import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import MatrixRain from '../components/MatrixRain';

const HomePage = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
`;

const SplitScreen = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
`;

const HalfScreen = styled.div<{ side: 'left' | 'right' }>`
  width: 50%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
`;

const FireBackground = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(45deg, #ff4500, #ff8700, #ff4500);
  background-size: 200% 200%;
  opacity: 0;
  z-index: 0;
`;

const CodeBackground = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #000;
  opacity: 0;
  z-index: 0;
`;

const TitleContainer = styled.div`
  display: flex;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;
`;

const TitleWord = styled(motion.h1)`
  font-size: 5rem;
  font-weight: 900;
  margin: 0;
  white-space: nowrap;
  text-transform: uppercase;
  
  @media (max-width: 768px) {
    font-size: 3rem;
  }
`;

const SocialLinks = styled(motion.div)`
  display: flex;
  gap: 20px;
  position: absolute;
  bottom: 50px;
  z-index: 20;
`;

const SocialLink = styled.a`
  font-size: 1.8rem;
  color: white;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    color: #ff4500;
  }
`;

const SocialIcon = styled.div`
  font-size: 1.8rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const NextButton = styled(motion.button)`
  padding: 12px 25px;
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
  font-size: 1.2rem;
  font-weight: 700;
  border: 2px solid white;
  border-radius: 50px;
  position: absolute;
  bottom: 120px;
  z-index: 20;
  transition: all 0.3s ease;
  
  &:hover {
    background: white;
    color: black;
  }
`;

// Анимирующиеся частицы огня
const FireParticles = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
`;

const Particle = styled(motion.div)<{ size: number; delay: number }>`
  position: absolute;
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 50%;
  filter: blur(5px);
`;

// Анимирующиеся буквы кода
const CodeParticles = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
`;

const CodeChar = styled(motion.div)<{ delay: number }>`
  position: absolute;
  font-family: monospace;
  font-size: ${() => Math.random() * 12 + 8}px;
  color: #00ff00;
  opacity: 0.7;
`;

const Home: React.FC = () => {
  const [showDoom, setShowDoom] = useState(false);
  const [showTech, setShowTech] = useState(false);
  const [showFire, setShowFire] = useState(false);
  const [showCode, setShowCode] = useState(false);
  const [showSocial, setShowSocial] = useState(false);
  const [showNextButton, setShowNextButton] = useState(false);
  
  // Генерация частиц огня
  const fireParticles = Array.from({ length: 50 }).map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 8 + 2,
    delay: Math.random() * 2
  }));

  useEffect(() => {
    // Анимация последовательного появления элементов
    const doomTimer = setTimeout(() => setShowDoom(true), 500);
    const fireTimer = setTimeout(() => setShowFire(true), 1500);
    const techTimer = setTimeout(() => setShowTech(true), 2000);
    const codeTimer = setTimeout(() => setShowCode(true), 3000);
    const socialTimer = setTimeout(() => setShowSocial(true), 4000);
    const btnTimer = setTimeout(() => setShowNextButton(true), 4500);
    
    return () => {
      clearTimeout(doomTimer);
      clearTimeout(fireTimer);
      clearTimeout(techTimer);
      clearTimeout(codeTimer);
      clearTimeout(socialTimer);
      clearTimeout(btnTimer);
    };
  }, []);

  return (
    <HomePage>
      <SplitScreen>
        <HalfScreen side="left">
          <FireBackground 
            animate={{ 
              opacity: showFire ? 0.8 : 0,
              backgroundPosition: showFire ? '100% 100%' : '0% 0%'
            }}
            transition={{ 
              duration: 10, 
              repeat: Infinity, 
              repeatType: 'reverse'
            }}
          />
          
          {showFire && (
            <FireParticles>
              {fireParticles.map(particle => (
                <Particle
                  key={particle.id}
                  size={particle.size}
                  delay={particle.delay}
                  initial={{ 
                    x: `${particle.x}%`, 
                    y: '100%', 
                    opacity: 0 
                  }}
                  animate={{ 
                    y: '0%', 
                    opacity: [0, 0.8, 0],
                    x: `calc(${particle.x}% + ${Math.sin(particle.id) * 30}px)`
                  }}
                  transition={{ 
                    duration: 2 + particle.delay, 
                    repeat: Infinity,
                    repeatType: 'loop',
                    ease: 'easeOut',
                    delay: particle.delay
                  }}
                />
              ))}
            </FireParticles>
          )}
        </HalfScreen>
        
        <HalfScreen side="right">
          <CodeBackground 
            animate={{ 
              opacity: showCode ? 1 : 0 
            }}
            transition={{ duration: 1 }}
          />
          
          {showCode && <MatrixRain opacity={0.7} />}
        </HalfScreen>
      </SplitScreen>
      
      <TitleContainer>
        <TitleWord
          initial={{ opacity: 0, y: 20 }}
          animate={{ 
            opacity: showDoom ? 1 : 0, 
            y: showDoom ? 0 : 20,
            textShadow: showFire ? '0 0 20px #ff4500, 0 0 40px #ff4500' : 'none'
          }}
          transition={{ duration: 0.7 }}
        >
          Doom
        </TitleWord>
        <TitleWord
          initial={{ opacity: 0, y: 20 }}
          animate={{ 
            opacity: showTech ? 1 : 0, 
            y: showTech ? 0 : 20,
            textShadow: showCode ? '0 0 20px #00ff00, 0 0 40px #00ff00' : 'none'
          }}
          transition={{ duration: 0.7 }}
        >
          Tech
        </TitleWord>
      </TitleContainer>
      
      <SocialLinks
        initial={{ opacity: 0, y: 20 }}
        animate={{ 
          opacity: showSocial ? 1 : 0, 
          y: showSocial ? 0 : 20 
        }}
        transition={{ duration: 0.5 }}
      >
        <SocialLink href="https://github.com/" target="_blank">
          <SocialIcon>
            <i className="fab fa-github"></i>
          </SocialIcon>
        </SocialLink>
        <SocialLink href="https://t.me/" target="_blank">
          <SocialIcon>
            <i className="fab fa-telegram"></i>
          </SocialIcon>
        </SocialLink>
        <SocialLink href="https://vk.com/" target="_blank">
          <SocialIcon>
            <i className="fab fa-vk"></i>
          </SocialIcon>
        </SocialLink>
        <SocialLink href="mailto:example@example.com">
          <SocialIcon>
            <i className="fas fa-envelope"></i>
          </SocialIcon>
        </SocialLink>
      </SocialLinks>
      
      <NextButton
        initial={{ opacity: 0, y: 20 }}
        animate={{ 
          opacity: showNextButton ? 1 : 0, 
          y: showNextButton ? 0 : 20 
        }}
        transition={{ duration: 0.5 }}
        as={Link}
        to="/about"
      >
        Обо мне
      </NextButton>
    </HomePage>
  );
};

export default Home; 