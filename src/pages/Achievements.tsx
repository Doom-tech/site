import React, { useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const AchievementsPage = styled.div`
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

const AchievementsList = styled(motion.div)`
  margin-top: 3rem;
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
`;

const AchievementCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 15px;
  padding: 2rem;
  position: relative;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 5px;
    height: 100%;
    background: #ff4500;
  }
  
  &:hover {
    background: rgba(255, 255, 255, 0.08);
  }
`;

const AchievementHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }
`;

const AchievementTitle = styled.h2`
  font-size: 1.8rem;
  color: #fff;
`;

const AchievementDate = styled.span`
  padding: 5px 15px;
  background: rgba(255, 69, 0, 0.2);
  color: #ff4500;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 500;
`;

const AchievementDescription = styled.p`
  font-size: 1.1rem;
  line-height: 1.7;
  color: #cccccc;
  margin-bottom: 1.5rem;
`;

const AchievementTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 1rem;
`;

const AchievementTag = styled.span`
  padding: 5px 12px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  font-size: 0.85rem;
  color: #aaaaaa;
`;

const CertificationsSection = styled(motion.section)`
  margin-top: 5rem;
`;

const CertificationsTitle = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 2rem;
  color: #fff;
`;

const CertificationsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const CertificationCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 15px 40px rgba(255, 69, 0, 0.2);
  }
`;

const CertificationImage = styled.div<{ $image: string }>`
  width: 100%;
  height: 200px;
  background-image: url(${props => props.$image});
  background-size: cover;
  background-position: center;
  border-bottom: 3px solid #ff4500;
`;

const CertificationContent = styled.div`
  padding: 1.5rem;
`;

const CertificationTitle = styled.h3`
  font-size: 1.3rem;
  margin-bottom: 10px;
  color: #fff;
`;

const CertificationIssuer = styled.p`
  font-size: 1rem;
  color: #aaaaaa;
  margin-bottom: 10px;
`;

const CertificationDate = styled.span`
  display: inline-block;
  font-size: 0.9rem;
  color: #ff4500;
`;

const AwardsList = styled(motion.div)`
  margin-top: 4rem;
`;

const AwardsTitle = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 2rem;
  color: #fff;
`;

const AwardItem = styled(motion.div)`
  display: flex;
  margin-bottom: 2rem;
  padding: 1.5rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 15px;
  border-left: 5px solid #ff4500;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.08);
    transform: translateX(10px);
  }
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const AwardIcon = styled.div`
  font-size: 2.5rem;
  margin-right: 1.5rem;
  color: #ff4500;
  
  @media (max-width: 768px) {
    margin-bottom: 1rem;
  }
`;

const AwardContent = styled.div`
  flex: 1;
`;

const AwardName = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 10px;
  color: #fff;
`;

const AwardInfo = styled.p`
  font-size: 1rem;
  color: #cccccc;
`;

// Данные достижений
const achievements = [
  {
    id: 1,
    title: "Победитель международной олимпиады Innopolis Open 2025",
    date: "2025",
    description: "Занял 1-е место в международной олимпиаде Innopolis Open 2025 по направлению информационной безопасности, продемонстрировав высокий уровень знаний и практических навыков.",
    tags: ["Информационная безопасность", "Олимпиада", "Первое место"]
  },
  {
    id: 2,
    title: "Абсолютный Победитель Первенства России 2024",
    date: "2024",
    description: "Стал абсолютным победителем Первенства России 2024 по спортивному программированию систем информационной безопасности.",
    tags: ["Первенство России", "CTF", "Информационная безопасность"]
  },
  {
    id: 3,
    title: "Победитель кубка Воронежской области",
    date: "2024",
    description: "Занял 1-е место в кубке Воронежской области по спортивному программированию систем информационной безопасности.",
    tags: ["Кибербезопасность", "CTF", "Хакатон"]
  },
  {
    id: 4,
    title: "Призовые места на CTF соревнованиях",
    date: "2024",
    description: "2-е место на KubanCTF2024, 3-е место на чемпионате HackOsint, 4-е место в составе гостевой команды на CenterCTF 2024.",
    tags: ["CTF", "Командная работа", "Хакатон"]
  },
  {
    id: 5,
    title: "Победитель НТО по информационной безопасности",
    date: "2023",
    description: "Стал победителем национальной технологической олимпиады по профилю 'Информационная безопасность'.",
    tags: ["НТО", "Информационная безопасность", "Олимпиада"]
  },
  {
    id: 6,
    title: "Лучший доклад на Всероссийской конференции",
    date: "2021",
    description: "Получил диплом за 'Лучший доклад на Всероссийской молодежной научно-технической коференции 'Радиолокация и связь - перспективные технологии'.",
    tags: ["Научная конференция", "Доклад", "Диплом"]
  }
];

// Данные сертификатов
const certifications = [
  {
    id: 1,
    title: "Математика в кибербезопасности",
    issuer: "Kaspersky",
    date: "2024",
    image: "https://placehold.co/600x400/111/333?text=Kaspersky"
  },
  {
    id: 2,
    title: "Анализ уязвимостей в веб-приложениях",
    issuer: "Вконтакте",
    date: "2024",
    image: "https://placehold.co/600x400/111/333?text=VK"
  },
  {
    id: 3,
    title: "Operator Red Team",
    issuer: "TryHackMe",
    date: "2024",
    image: "https://placehold.co/600x400/111/333?text=TryHackMe"
  },
  {
    id: 4,
    title: "Код будущего",
    issuer: "Министерство цифрового развития РФ",
    date: "2023",
    image: "https://placehold.co/600x400/111/333?text=Минцифры"
  },
  {
    id: 5,
    title: "Разработка мобильных приложений на Java",
    issuer: "Samsung",
    date: "2019",
    image: "https://placehold.co/600x400/111/333?text=Samsung"
  }
];

// Данные наград
const awards = [
  {
    id: 1,
    name: "Член сборной России",
    info: "Член сборной России по спортивному программированию систем информационной безопасности.",
    icon: "🏆"
  },
  {
    id: 2,
    name: "Член сборной Москвы",
    info: "Член сборной Москвы по информационной безопасности.",
    icon: "🥇"
  },
  {
    id: 3,
    name: "12 место в рейтинге CTFtime",
    info: "12 место в российском рейтинге CTFtime - одном из самых престижных мировых рейтингов команд по кибербезопасности.",
    icon: "🔐"
  },
  {
    id: 4,
    name: "Научная публикация",
    info: "Автор научной статьи 'Алгоритм шифрования данных с помощью альфа-каналов', 2022 год.",
    icon: "📝"
  },
  {
    id: 5,
    name: "Победитель всероссийского конкурса",
    info: "Победитель всероссийского конкурса 'Сотвори будущее' среди старшеклассников и студентов по направлению: Информационная безопасность и кибернетика, 2021.",
    icon: "🏅"
  }
];

const Achievements: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const containerVariants = {
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
    <AchievementsPage>
      <Container>
        <Header>
          <Logo to="/">Doom Tech</Logo>
          <Navigation>
            <NavLink to="/">Главная</NavLink>
            <NavLink to="/about">Обо мне</NavLink>
            <NavLink to="/experience">Опыт</NavLink>
            <NavLink to="/portfolio">Портфолио</NavLink>
            <NavLink to="/achievements" $active={true}>Достижения</NavLink>
          </Navigation>
        </Header>
        
        <Title
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Достижения
        </Title>
        
        <AchievementsList
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {achievements.map((achievement, index) => (
            <AchievementCard
              key={achievement.id}
              variants={itemVariants}
              whileHover={{ x: 10 }}
              transition={{ duration: 0.3 }}
            >
              <AchievementHeader>
                <AchievementTitle>{achievement.title}</AchievementTitle>
                <AchievementDate>{achievement.date}</AchievementDate>
              </AchievementHeader>
              <AchievementDescription>{achievement.description}</AchievementDescription>
              <AchievementTags>
                {achievement.tags.map((tag, i) => (
                  <AchievementTag key={i}>{tag}</AchievementTag>
                ))}
              </AchievementTags>
            </AchievementCard>
          ))}
        </AchievementsList>
        
        <CertificationsSection
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <CertificationsTitle>Сертификаты</CertificationsTitle>
          <CertificationsGrid>
            {certifications.map((cert, index) => (
              <CertificationCard
                key={cert.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ 
                  opacity: 1, 
                  y: 0,
                  transition: { 
                    duration: 0.5,
                    delay: 0.4 + (index * 0.1)
                  }
                }}
              >
                <CertificationImage $image={cert.image} />
                <CertificationContent>
                  <CertificationTitle>{cert.title}</CertificationTitle>
                  <CertificationIssuer>{cert.issuer}</CertificationIssuer>
                  <CertificationDate>{cert.date}</CertificationDate>
                </CertificationContent>
              </CertificationCard>
            ))}
          </CertificationsGrid>
        </CertificationsSection>
        
        <AwardsList
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <AwardsTitle>Награды</AwardsTitle>
          
          {awards.map((award, index) => (
            <AwardItem
              key={award.id}
              initial={{ opacity: 0, x: -30 }}
              animate={{ 
                opacity: 1, 
                x: 0,
                transition: { 
                  duration: 0.5,
                  delay: 0.7 + (index * 0.1)
                }
              }}
            >
              <AwardIcon>{award.icon}</AwardIcon>
              <AwardContent>
                <AwardName>{award.name}</AwardName>
                <AwardInfo>{award.info}</AwardInfo>
              </AwardContent>
            </AwardItem>
          ))}
        </AwardsList>
      </Container>
    </AchievementsPage>
  );
};

export default Achievements; 