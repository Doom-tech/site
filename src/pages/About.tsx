import React, { useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const AboutPage = styled.div`
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

const ContentSection = styled(motion.section)`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  margin-bottom: 3rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ProfileImage = styled(motion.div)`
  position: relative;
  width: 100%;
  height: 500px;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(45deg, #ff4500 0%, rgba(0, 0, 0, 0) 70%);
    opacity: 0.7;
    z-index: 1;
  }
  
  &:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #000;
    background-image: url('https://placehold.co/600x800/111/333?text=Михаил+Ильин');
    background-size: cover;
    background-position: center;
    z-index: 0;
  }
`;

const InfoContent = styled(motion.div)`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const InfoTitle = styled.h2`
  font-size: 2rem;
  margin-bottom: 1.5rem;
  color: #fff;
`;

const InfoText = styled.p`
  font-size: 1.1rem;
  line-height: 1.7;
  margin-bottom: 1.5rem;
  color: #cccccc;
`;

const InfoList = styled.ul`
  list-style-type: none;
  margin: 1.5rem 0;
`;

const InfoItem = styled.li`
  display: flex;
  margin-bottom: 1rem;
  font-size: 1.1rem;
  
  &:before {
    content: '⚡';
    margin-right: 10px;
    color: #ff4500;
  }
`;

const Button = styled(Link)`
  display: inline-block;
  padding: 12px 30px;
  background: linear-gradient(90deg, #ff4500, #ff8700);
  color: #fff;
  font-family: 'Orbitron', sans-serif;
  font-size: 1.1rem;
  border-radius: 50px;
  margin-top: 1.5rem;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(255, 69, 0, 0.3);
  }
`;

const ContactInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-top: 1rem;
  margin-bottom: 1rem;
`;

const ContactItem = styled.div`
  display: flex;
  align-items: center;
  font-size: 1rem;
  color: #cccccc;
  
  i {
    margin-right: 10px;
    color: #ff4500;
    width: 20px;
    text-align: center;
  }
`;

const SectionTitle = styled.h2`
  font-size: 2.2rem;
  margin-top: 3rem;
  margin-bottom: 2rem;
  text-transform: uppercase;
`;

const ExperienceSection = styled.section`
  margin-top: 4rem;
`;

const ExperienceItem = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 10px;
  padding: 1.5rem;
  margin-bottom: 2rem;
  border-left: 3px solid #ff4500;
  
  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
`;

const ExperienceHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 0.5rem;
  }
`;

const CompanyName = styled.h3`
  font-size: 1.4rem;
  color: #fff;
`;

const JobTitle = styled.h4`
  font-size: 1.2rem;
  color: #ff4500;
  margin-top: 0.5rem;
`;

const JobPeriod = styled.span`
  font-size: 0.9rem;
  color: #aaa;
  white-space: nowrap;
`;

const JobDescription = styled.div`
  font-size: 1rem;
  color: #cccccc;
  margin-top: 1rem;
  
  p {
    margin-bottom: 1rem;
  }
  
  ul {
    list-style-type: disc;
    margin-left: 1.5rem;
    margin-bottom: 1rem;
  }
  
  li {
    margin-bottom: 0.5rem;
  }
`;

const SkillsSection = styled(motion.section)`
  margin-top: 4rem;
`;

const SkillsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
`;

const SkillCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 10px;
  padding: 1.5rem;
  transition: all 0.3s ease;
  border-left: 3px solid #ff4500;
  
  &:hover {
    transform: translateY(-5px);
    background: rgba(255, 255, 255, 0.1);
  }
`;

const SkillTitle = styled.h3`
  font-size: 1.3rem;
  margin-bottom: 1rem;
  color: #ff4500;
`;

const SkillText = styled.p`
  font-size: 1rem;
  color: #cccccc;
`;

const EducationSection = styled.section`
  margin-top: 4rem;
`;

const EducationItem = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 10px;
  padding: 1.5rem;
  margin-bottom: 2rem;
  border-left: 3px solid #ff4500;
  
  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
`;

const SchoolName = styled.h3`
  font-size: 1.4rem;
  color: #fff;
`;

const EducationPeriod = styled.span`
  font-size: 0.9rem;
  color: #aaa;
`;

const CoursesSection = styled.section`
  margin-top: 4rem;
`;

const CourseItem = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 10px;
  padding: 1.5rem;
  margin-bottom: 1rem;
  border-left: 3px solid #ff4500;
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
  
  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
`;

const CourseName = styled.h3`
  font-size: 1.2rem;
  color: #fff;
`;

const CourseProvider = styled.span`
  font-size: 0.9rem;
  color: #ff4500;
`;

const CourseYear = styled.span`
  font-size: 0.9rem;
  color: #aaa;
  white-space: nowrap;
`;

const LanguagesSection = styled.section`
  margin-top: 4rem;
`;

const LanguageItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem;
  margin-bottom: 1rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 10px;
  border-left: 3px solid #ff4500;
  
  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
`;

const LanguageName = styled.h3`
  font-size: 1.2rem;
  color: #fff;
`;

const LanguageLevel = styled.span`
  font-size: 0.9rem;
  color: #ff4500;
`;

const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 2rem;
`;

const Tag = styled.span`
  padding: 8px 16px;
  background: rgba(255, 69, 0, 0.1);
  border: 1px solid #ff4500;
  border-radius: 20px;
  font-size: 0.9rem;
  color: #cccccc;
`;

const About: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const skills = [
    "Linux", "Ubuntu Server", "Ethical Hacker", "SSH", "Python", "İnfosec", 
    "Pentest", "Docker", "Git", "Bash", "Lua", "Проведение тестирований", 
    "PostgreSQL", "Atlassian Jira", "Тестирование", "Администрирование серверов Linux", 
    "IPTables", "Ubuntu", "Splunk", "SQL", "PHP", "Ручное тестирование", 
    "Information Security", "Bug bounty", "OWASP"
  ];

  return (
    <AboutPage>
      <Container>
        <Header>
          <Logo to="/">Doom Tech</Logo>
          <Navigation>
            <NavLink to="/">Главная</NavLink>
            <NavLink to="/about" $active={true}>Обо мне</NavLink>
            <NavLink to="/experience">Опыт</NavLink>
            <NavLink to="/portfolio">Портфолио</NavLink>
            <NavLink to="/achievements">Достижения</NavLink>
          </Navigation>
        </Header>
        
        <Title
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Обо мне
        </Title>
        
        <ContentSection
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <ProfileImage 
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          />
          
          <InfoContent
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <InfoTitle>Ильин Михаил Сергеевич</InfoTitle>
            <InfoText>
              Специалист в области информационной безопасности с опытом работы в качестве пентестера и Red Team оператора.
              Специализируюсь на тестировании защищённости веб-приложений, проведении аудита безопасности и выявлении уязвимостей.
            </InfoText>
            
            <ContactInfo>
              <ContactItem>
                <i className="fas fa-calendar-alt"></i> 17 лет (родился 4 августа 2007)
              </ContactItem>
              <ContactItem>
                <i className="fas fa-map-marker-alt"></i> Москва, Россия
              </ContactItem>
              <ContactItem>
                <i className="fas fa-phone"></i> +7 (915) 544-39-97
              </ContactItem>
              <ContactItem>
                <i className="fas fa-envelope"></i> doom@fsbtool.ru
              </ContactItem>
              <ContactItem>
                <i className="fab fa-github"></i> <a href="https://github.com/Doom-tech" target="_blank" rel="noopener noreferrer">github.com/Doom-tech</a>
              </ContactItem>
            </ContactInfo>
            
            <InfoList>
              <InfoItem>Член сборной Москвы по информационной безопасности</InfoItem>
              <InfoItem>Член сборной России по спортивному программированию систем информационной безопасности</InfoItem>
              <InfoItem>Абсолютный Победитель Первенства России 2024 по спортивному программированию систем информационной безопасности</InfoItem>
              <InfoItem>Победитель международной олимпиады Innopolis Open 2025 по информационной безопасности</InfoItem>
            </InfoList>
            
            <Button to="/experience">Мой опыт работы</Button>
          </InfoContent>
        </ContentSection>
        
        <ExperienceSection>
          <SectionTitle>Опыт работы</SectionTitle>
          
          <ExperienceItem>
            <ExperienceHeader>
              <div>
                <CompanyName>CyberEd</CompanyName>
                <JobTitle>Автор-Эксперт</JobTitle>
              </div>
              <JobPeriod>Сентябрь 2024 — настоящее время (7 месяцев)</JobPeriod>
            </ExperienceHeader>
            <JobDescription>
              <ul>
                <li>Разрабатываю описания и примеры использования ИТ технологий, инструментов и навыков кибербезопасности (Red Team & Blue Team)</li>
                <li>Разрабатываю практические задания на отработку навыков в рамках описанных тем</li>
                <li>Разрабатываю тестирования по описанным темам</li>
              </ul>
            </JobDescription>
          </ExperienceItem>
          
          <ExperienceItem>
            <ExperienceHeader>
              <div>
                <CompanyName>Ростелеком-Солар</CompanyName>
                <JobTitle>Стажёр</JobTitle>
              </div>
              <JobPeriod>Июль 2024 — Сентябрь 2024 (3 месяца)</JobPeriod>
            </ExperienceHeader>
            <JobDescription>
              <p>
                Прохождение полного цикла проектирования и внедрение СОИБ для системы DVWA. Разработка документации к проекту, моделирование угроз, нарушителя, сценариев атак. Аттестация класса и уровня защищённости системы по рекомендациям ФСТЭК России. Проектирование архитектуры сети с расположением четырёх подсистем. Внедрение подсистем в СОИБ DVWA, проведение испытаний, сдача заказчику.
              </p>
              <p>
                Телефон для получения рекомендации:<br />
                +7 929 604-78-74 - Добровольский Максим Васильевич (Директор департамента проектных решений центра кибербезопасности государственных сервисов)
              </p>
            </JobDescription>
          </ExperienceItem>
          
          <ExperienceItem>
            <ExperienceHeader>
              <div>
                <CompanyName>Индивидуальное предпринимательство / фриланс</CompanyName>
                <JobTitle>Пентестер</JobTitle>
              </div>
              <JobPeriod>Декабрь 2021 — Июнь 2024 (2 года 7 месяцев)</JobPeriod>
            </ExperienceHeader>
            <JobDescription>
              <p>На фрилансе я работал как пентестер в течение трех лет, выполняя разнообразные проекты в области кибербезопасности:</p>
              <ul>
                <li>Тестирование веб-приложений: Проводил аудит веб-приложений для различных клиентов, выявляя уязвимости в их коде, аутентификации, авторизации, ввода данных и других аспектах безопасности. Был интересный кейс с пентестом методов оплаты для Lesta Games</li>
                <li>Проверка безопасности мобильных приложений: Проводил анализ мобильных приложений на наличие уязвимостей, включая перехват сетевого трафика, обработку данных на клиентской стороне и другие потенциально опасные моменты</li>
                <li>Аудит сетевой инфраструктуры: Занимался сканированием сетей, обнаружением открытых портов, слабых конфигураций устройств и других уязвимостей. При обнаружении открытых портов и наличия разрешения заказчика, проводил различные атаки эксплоитами на порты, также стресс-тесты</li>
                <li>Социальная инженерия и фишинговые атаки: В рамках некоторых проектов проводил тестирование на уязвимости через социальную инженерию, пытаясь получить доступ к системам через манипуляции с людьми. Звонки, письма, замена данных</li>
                <li>Подготовка отчетов и консультации: После завершения каждого проекта подготавливал подробные отчеты о найденных уязвимостях и рекомендации по их устранению, предоставлял консультации по вопросам повышения безопасности информационных систем</li>
              </ul>
            </JobDescription>
          </ExperienceItem>
        </ExperienceSection>
        
        <EducationSection>
          <SectionTitle>Образование</SectionTitle>
          
          <EducationItem>
            <ExperienceHeader>
              <SchoolName>СУНЦ МГУ</SchoolName>
              <EducationPeriod>2025</EducationPeriod>
            </ExperienceHeader>
            <InfoText>Физико-математический класс</InfoText>
          </EducationItem>
        </EducationSection>
        
        <CoursesSection>
          <SectionTitle>Курсы и повышение квалификации</SectionTitle>
          
          <CourseItem>
            <div>
              <CourseName>Математика в кибербезопасности</CourseName>
              <CourseProvider>Kaspersky, Информационная безопасность, криптография</CourseProvider>
            </div>
            <CourseYear>2024</CourseYear>
          </CourseItem>
          
          <CourseItem>
            <div>
              <CourseName>Анализ уязвимостей в веб-приложениях</CourseName>
              <CourseProvider>Вконтакте, Пентест</CourseProvider>
            </div>
            <CourseYear>2024</CourseYear>
          </CourseItem>
          
          <CourseItem>
            <div>
              <CourseName>Operator Red Team</CourseName>
              <CourseProvider>TryHackMe, Информационная безопасность, пентест</CourseProvider>
            </div>
            <CourseYear>2024</CourseYear>
          </CourseItem>
          
          <CourseItem>
            <div>
              <CourseName>Код будущего</CourseName>
              <CourseProvider>Министерство цифрового развития РФ, Углубление в базы данных SQL</CourseProvider>
            </div>
            <CourseYear>2023</CourseYear>
          </CourseItem>
          
          <CourseItem>
            <div>
              <CourseName>Разработка мобильных приложений на Java</CourseName>
              <CourseProvider>Samsung, Разработка на Java</CourseProvider>
            </div>
            <CourseYear>2019</CourseYear>
          </CourseItem>
        </CoursesSection>
        
        <LanguagesSection>
          <SectionTitle>Знание языков</SectionTitle>
          
          <LanguageItem>
            <LanguageName>Русский</LanguageName>
            <LanguageLevel>Родной</LanguageLevel>
          </LanguageItem>
          
          <LanguageItem>
            <LanguageName>Английский</LanguageName>
            <LanguageLevel>B2 — Средне-продвинутый</LanguageLevel>
          </LanguageItem>
        </LanguagesSection>
        
        <SkillsSection
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <SectionTitle>Профессиональные навыки</SectionTitle>
          
          <TagsContainer>
            {skills.map((skill, index) => (
              <Tag key={index}>{skill}</Tag>
            ))}
          </TagsContainer>
        </SkillsSection>
      </Container>
    </AboutPage>
  );
};

export default About; 