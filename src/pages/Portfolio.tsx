import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

const PortfolioPage = styled.div`
  min-height: 100vh;
  background-color: #0a0a0a;
  color: #fff;
  padding: 2rem 0;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 3rem;
`;

const Logo = styled(Link)`
  font-family: 'Orbitron', sans-serif;
  font-size: 1.8rem;
  font-weight: 700;
  color: #ff4500;
  display: flex;
  align-items: center;
  
  &:hover {
    text-shadow: 0 0 10px #ff4500;
  }
`;

const Navigation = styled.nav`
  display: flex;
  gap: 1.5rem;
`;

const NavLink = styled(Link)<{ $active?: boolean }>`
  font-family: 'Orbitron', sans-serif;
  font-size: 1.1rem;
  color: ${props => props.$active ? '#ff4500' : '#fff'};
  position: relative;
  padding: 0.5rem 0;
  
  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: ${props => props.$active ? '100%' : '0'};
    height: 2px;
    background-color: #ff4500;
    transition: width 0.3s ease;
  }
  
  &:hover:after {
    width: 100%;
  }
`;

const Title = styled(motion.h1)`
  font-size: 3.5rem;
  font-weight: 700;
  margin-bottom: 2rem;
  text-transform: uppercase;
  background: linear-gradient(90deg, #ff4500, #ff8700);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const FilterContainer = styled(motion.div)`
  display: flex;
  gap: 1rem;
  margin-bottom: 3rem;
  flex-wrap: wrap;
`;

const FilterButton = styled.button<{ $active: boolean }>`
  padding: 8px 20px;
  background: ${props => props.$active ? '#ff4500' : 'rgba(255, 255, 255, 0.1)'};
  color: ${props => props.$active ? '#000' : '#fff'};
  border-radius: 30px;
  font-size: 1rem;
  font-weight: 500;
  transition: all 0.3s ease;
  font-family: 'Orbitron', sans-serif;
  
  &:hover {
    background: ${props => props.$active ? '#ff6a00' : 'rgba(255, 255, 255, 0.2)'};
    transform: translateY(-3px);
  }
`;

const ProjectsGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ProjectCard = styled(motion.div)`
  position: relative;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
  height: 400px;
  background: #111;
  
  &:hover {
    box-shadow: 0 15px 40px rgba(255, 69, 0, 0.2);
  }
`;

const ProjectImage = styled.div<{ $image: string }>`
  width: 100%;
  height: 60%;
  background-image: url(${props => props.$image});
  background-size: cover;
  background-position: center;
  position: relative;
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.7) 100%);
  }
`;

const ProjectCategory = styled.span`
  position: absolute;
  top: 20px;
  right: 20px;
  padding: 5px 15px;
  background: #ff4500;
  color: #000;
  font-size: 0.8rem;
  font-weight: 600;
  border-radius: 20px;
  z-index: 1;
`;

const ProjectContent = styled.div`
  padding: 1.5rem;
  height: 40%;
  display: flex;
  flex-direction: column;
`;

const ProjectTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 10px;
  color: #fff;
`;

const ProjectDescription = styled.p`
  font-size: 1rem;
  color: #aaa;
  flex-grow: 1;
`;

const ProjectLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 15px;
`;

const ProjectLink = styled.a`
  display: inline-block;
  padding: 8px 15px;
  background: rgba(255, 69, 0, 0.2);
  color: #ff4500;
  border: 1px solid #ff4500;
  border-radius: 5px;
  font-size: 0.9rem;
  transition: all 0.3s ease;
  
  &:hover {
    background: #ff4500;
    color: #000;
  }
`;

// Данные проектов
const projects = [
  {
    id: 1,
    title: 'Пентест платформы онлайн-оплат',
    description: 'Проведение тестирования на проникновение для платежной системы Lesta Games. Выявление и устранение критических уязвимостей в процессе обработки платежей.',
    image: 'https://placehold.co/600x400/111/333?text=Пентест+платформы',
    category: 'пентест',
    link: '#',
    github: '#'
  },
  {
    id: 2,
    title: 'Red Teaming для финансовой организации',
    description: 'Комплексная симуляция целевой атаки на инфраструктуру банка, включая техническое проникновение и методы социальной инженерии.',
    image: 'https://placehold.co/600x400/111/333?text=Red+Teaming',
    category: 'red team',
    link: '#',
    github: '#'
  },
  {
    id: 3,
    title: 'Анализатор уязвимостей PHP-приложений',
    description: 'Разработка инструмента для автоматического сканирования PHP-кода на наличие распространенных уязвимостей, включая SQL-инъекции и XSS.',
    image: 'https://placehold.co/600x400/111/333?text=Анализатор+уязвимостей',
    category: 'разработка',
    link: '#',
    github: 'https://github.com/Doom-tech/php-vuln-scanner'
  },
  {
    id: 4,
    title: 'Система обнаружения вторжений',
    description: 'Разработка и настройка системы обнаружения вторжений на базе открытых технологий для защиты корпоративной сети.',
    image: 'https://placehold.co/600x400/111/333?text=IDS',
    category: 'blue team',
    link: '#',
    github: 'https://github.com/Doom-tech/ids-system'
  },
  {
    id: 5,
    title: 'Обучающая платформа по CTF',
    description: 'Разработка платформы для подготовки к соревнованиям CTF с интерактивными заданиями и обучающими материалами.',
    image: 'https://placehold.co/600x400/111/333?text=CTF+Платформа',
    category: 'разработка',
    link: '#',
    github: 'https://github.com/Doom-tech/ctf-platform'
  },
  {
    id: 6,
    title: 'Модуль шифрования данных',
    description: 'Реализация алгоритма шифрования с использованием альфа-каналов для защиты конфиденциальных данных.',
    image: 'https://placehold.co/600x400/111/333?text=Шифрование',
    category: 'криптография',
    link: '#',
    github: 'https://github.com/Doom-tech/alpha-crypto'
  }
];

const Portfolio: React.FC = () => {
  const [filter, setFilter] = useState('все');
  const [filteredProjects, setFilteredProjects] = useState(projects);
  
  useEffect(() => {
    window.scrollTo(0, 0);
    
    if (filter === 'все') {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(projects.filter(project => project.category === filter));
    }
  }, [filter]);

  const categories = ['все', 'пентест', 'red team', 'blue team', 'разработка', 'криптография'];

  return (
    <PortfolioPage>
      <Container>
        <Header>
          <Logo to="/">Doom Tech</Logo>
          <Navigation>
            <NavLink to="/">Главная</NavLink>
            <NavLink to="/about">Обо мне</NavLink>
            <NavLink to="/experience">Опыт</NavLink>
            <NavLink to="/portfolio" $active={true}>Портфолио</NavLink>
            <NavLink to="/achievements">Достижения</NavLink>
          </Navigation>
        </Header>
        
        <Title
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Портфолио
        </Title>
        
        <FilterContainer
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {categories.map(category => (
            <FilterButton 
              key={category}
              $active={filter === category}
              onClick={() => setFilter(category)}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </FilterButton>
          ))}
        </FilterContainer>
        
        <AnimatePresence mode="wait">
          <ProjectsGrid
            key={filter}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {filteredProjects.map((project, index) => (
              <ProjectCard
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ 
                  opacity: 1, 
                  y: 0,
                  transition: { 
                    duration: 0.5,
                    delay: index * 0.1
                  }
                }}
                whileHover={{ y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <ProjectImage $image={project.image}>
                  <ProjectCategory>{project.category}</ProjectCategory>
                </ProjectImage>
                <ProjectContent>
                  <ProjectTitle>{project.title}</ProjectTitle>
                  <ProjectDescription>{project.description}</ProjectDescription>
                  <ProjectLinks>
                    <ProjectLink href={project.link} target="_blank">Демо</ProjectLink>
                    <ProjectLink href={project.github} target="_blank">GitHub</ProjectLink>
                  </ProjectLinks>
                </ProjectContent>
              </ProjectCard>
            ))}
          </ProjectsGrid>
        </AnimatePresence>
      </Container>
    </PortfolioPage>
  );
};

export default Portfolio; 