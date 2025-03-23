import React, { useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const ExperiencePage = styled.div`
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

const Timeline = styled(motion.div)`
  position: relative;
  max-width: 1000px;
  margin: 4rem auto;
  
  &:before {
    content: '';
    position: absolute;
    left: 50%;
    width: 4px;
    height: 100%;
    background: #ff4500;
    transform: translateX(-50%);
    
    @media (max-width: 768px) {
      left: 30px;
    }
  }
`;

const TimelineItem = styled(motion.div)<{ $position: 'left' | 'right' }>`
  position: relative;
  width: 50%;
  padding: 20px 40px;
  margin-bottom: 50px;
  
  ${props => props.$position === 'right' ? 'left: 50%;' : 'left: 0;'}
  
  @media (max-width: 768px) {
    width: calc(100% - 60px);
    left: 60px;
  }
`;

const TimelineContent = styled.div`
  position: relative;
  padding: 30px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 10px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  border-left: 4px solid #ff4500;
  
  &:hover {
    background: rgba(255, 255, 255, 0.08);
  }
`;

const TimelineDot = styled.div`
  position: absolute;
  width: 20px;
  height: 20px;
  background: #ff4500;
  border: 4px solid #000;
  border-radius: 50%;
  top: 30px;
  
  ${props => props.theme.$position === 'right' ? 'left: -10px;' : 'right: -10px;'}
  
  @media (max-width: 768px) {
    left: -45px;
  }
`;

const Date = styled.span`
  display: inline-block;
  padding: 5px 15px;
  background: #ff4500;
  color: #000;
  font-weight: 500;
  border-radius: 20px;
  font-size: 0.9rem;
  margin-bottom: 15px;
`;

const JobTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 10px;
  color: #fff;
`;

const Company = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 20px;
  color: #cccccc;
`;

const Description = styled.p`
  font-size: 1rem;
  line-height: 1.7;
  color: #aaaaaa;
  margin-bottom: 15px;
`;

const TechStack = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 20px;
`;

const TechTag = styled.span`
  padding: 5px 12px;
  background: rgba(255, 69, 0, 0.2);
  border: 1px solid #ff4500;
  border-radius: 20px;
  font-size: 0.85rem;
  color: #ff8700;
`;

const EducationSection = styled.div`
  margin-top: 5rem;
  margin-bottom: 3rem;
`;

const EducationTitle = styled(motion.h2)`
  font-size: 2.5rem;
  margin-bottom: 2rem;
  color: #fff;
`;

const EducationCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 10px;
  padding: 30px;
  margin-bottom: 2rem;
  border-left: 4px solid #ff4500;
  
  &:hover {
    background: rgba(255, 255, 255, 0.08);
  }
`;

const EducationHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }
`;

const University = styled.h3`
  font-size: 1.5rem;
  color: #fff;
`;

const Degree = styled.h4`
  font-size: 1.3rem;
  color: #cccccc;
  margin-top: 10px;
`;

// Импортируем данные о рабочем опыте
const experienceData = [
  {
    id: 1,
    company: "CyberEd",
    position: "Автор-Эксперт",
    period: "Сентябрь 2024 — настоящее время (7 месяцев)",
    description: `
      <ul>
        <li>Разработка описаний и примеров использования ИТ технологий, инструментов и навыков кибербезопасности (Red Team & Blue Team)</li>
        <li>Разработка практических заданий на отработку навыков в рамках описанных тем</li>
        <li>Разработка тестирований по описанным темам</li>
      </ul>
    `,
    technologies: ["Red Team", "Blue Team", "Кибербезопасность", "Разработка контента"]
  },
  {
    id: 2,
    company: "Ростелеком-Солар",
    position: "Стажёр",
    period: "Июль 2024 — Сентябрь 2024 (3 месяца)",
    description: `
      Прохождение полного цикла проектирования и внедрение СОИБ для системы DVWA. Разработка документации к проекту, моделирование угроз, нарушителя, сценариев атак. Аттестация класса и уровня защищённости системы по рекомендациям ФСТЭК России. Проектирование архитектуры сети с расположением четырёх подсистем. Внедрение подсистем в СОИБ DVWA, проведение испытаний, сдача заказчику.<br/><br/>
      Телефон для получения рекомендации:<br/>
      +7 929 604-78-74 - Добровольский Максим Васильевич (Директор департамента проектных решений центра кибербезопасности государственных сервисов)
    `,
    technologies: ["СОИБ", "DVWA", "ФСТЭК", "Проектирование", "Документация"]
  },
  {
    id: 3,
    company: "Фриланс",
    position: "Пентестер",
    period: "Декабрь 2021 — Июнь 2024 (2 года 7 месяцев)",
    description: `
      На фрилансе я работал как пентестер в течение трех лет, выполняя разнообразные проекты в области кибербезопасности:
      <ul>
        <li>Тестирование веб-приложений: аудит веб-приложений для различных клиентов, выявление уязвимостей в их коде, аутентификации, авторизации, ввода данных. Интересный кейс с пентестом методов оплаты для Lesta Games</li>
        <li>Проверка безопасности мобильных приложений: анализ на наличие уязвимостей, включая перехват сетевого трафика, обработку данных на клиентской стороне</li>
        <li>Аудит сетевой инфраструктуры: сканирование сетей, обнаружение открытых портов, слабых конфигураций устройств. При обнаружении открытых портов и наличия разрешения заказчика, проводил различные атаки эксплоитами на порты, стресс-тесты</li>
        <li>Социальная инженерия и фишинговые атаки: тестирование на уязвимости через социальную инженерию, попытки получить доступ к системам через манипуляции с людьми (звонки, письма, замена данных)</li>
        <li>Подготовка отчетов и консультации: детальные отчеты о найденных уязвимостях и рекомендации по их устранению, консультации по вопросам повышения безопасности информационных систем</li>
      </ul>
    `,
    technologies: ["Пентест", "Ethical Hacking", "Red Teaming", "Веб-безопасность", "Социальная инженерия"]
  }
];

// Данные об образовании
const educationData = [
  {
    id: 1,
    university: "СУНЦ МГУ",
    degree: "Среднее образование, Физико-математический класс",
    period: "2025",
    description: "Физико-математический класс с углубленным изучением информационной безопасности."
  }
];

const Experience: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const timelineVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <ExperiencePage>
      <Container>
        <Header>
          <Logo to="/">Doom Tech</Logo>
          <Navigation>
            <NavLink to="/">Главная</NavLink>
            <NavLink to="/about">Обо мне</NavLink>
            <NavLink to="/experience" $active={true}>Опыт</NavLink>
            <NavLink to="/portfolio">Портфолио</NavLink>
            <NavLink to="/achievements">Достижения</NavLink>
          </Navigation>
        </Header>
        
        <Title
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Опыт работы
        </Title>
        
        <Timeline
          variants={timelineVariants}
          initial="hidden"
          animate="visible"
        >
          {experienceData.map((job, index) => (
            <TimelineItem 
              key={job.id}
              $position={index % 2 === 0 ? 'left' : 'right'}
              variants={itemVariants}
            >
              <TimelineDot theme={{ $position: index % 2 === 0 ? 'left' : 'right' }} />
              <TimelineContent>
                <Date>{job.period}</Date>
                <JobTitle>{job.position}</JobTitle>
                <Company>{job.company}</Company>
                <Description dangerouslySetInnerHTML={{ __html: job.description }} />
                <TechStack>
                  {job.technologies.map((tech, i) => (
                    <TechTag key={i}>{tech}</TechTag>
                  ))}
                </TechStack>
              </TimelineContent>
            </TimelineItem>
          ))}
        </Timeline>
        
        <EducationSection>
          <EducationTitle
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            Образование
          </EducationTitle>
          
          {educationData.map(edu => (
            <EducationCard
              key={edu.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <EducationHeader>
                <University>{edu.university}</University>
                <Date>{edu.period}</Date>
              </EducationHeader>
              <Degree>{edu.degree}</Degree>
              <Description>
                {edu.description}
              </Description>
            </EducationCard>
          ))}
        </EducationSection>
      </Container>
    </ExperiencePage>
  );
};

export default Experience; 