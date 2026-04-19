import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { portfolioData } from './data/portfolioData'

const theme = {
  bg: '#0e0e0e',
  surface: '#131313',
  surface2: '#1a1a1a',
  surface3: '#2a2a2a',
  primary: '#7c3aed',
  primaryLight: '#d2bbff',
  secondary: '#c6c6cf',
  tertiary: '#ffb784',
  text: '#e5e2e1',
  textMuted: '#958da1',
  border: '#3a3939'
}

const GlassNav = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  background: rgba(19, 19, 19, 0.8);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom: 1px solid ${theme.border};
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const NavBrand = styled.a`
  font-size: 1.25rem;
  font-weight: 700;
  color: ${theme.primaryLight};
  text-decoration: none;
  letter-spacing: -0.02em;
`

const NavLinks = styled.div`
  display: flex;
  gap: 0.5rem;

  @media (max-width: 600px) {
    display: none;
  }
`

const NavLink = styled.a`
  color: ${props => props.active ? theme.primaryLight : theme.textMuted};
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  font-size: 0.9rem;
  transition: all 0.2s;
  cursor: pointer;

  &:hover {
    background: ${theme.surface2};
    color: ${theme.text};
  }
`

const MobileMenu = styled.button`
  display: none;
  background: none;
  border: none;
  color: ${theme.text};
  font-size: 1.5rem;
  cursor: pointer;

  @media (max-width: 600px) {
    display: block;
  }
`

const Main = styled.main`
  padding-top: 80px;
`

const Section = styled.section`
  max-width: 1200px;
  margin: 0 auto;
  padding: 6rem 2rem;
`

const HeroSection = styled.section`
  min-height: 90vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 6rem 2rem;
  background: radial-gradient(ellipse at 50% 0%, rgba(124, 58, 237, 0.15) 0%, transparent 60%);
`

const HeroGradient = styled.h1`
  font-size: clamp(3rem, 10vw, 7rem);
  font-weight: 800;
  letter-spacing: -0.04em;
  line-height: 1;
  margin-bottom: 1.5rem;
  background: linear-gradient(135deg, ${theme.primaryLight} 0%, ${theme.primary} 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`

const HeroSub = styled.p`
  font-size: clamp(1.1rem, 2.5vw, 1.4rem);
  color: ${theme.secondary};
  max-width: 500px;
  margin-bottom: 2.5rem;
  line-height: 1.6;
`

const HeroLinks = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  justify-content: center;
`

const HeroLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border-radius: 50px;
  font-size: 0.95rem;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.2s;
  cursor: pointer;

  ${props => props.primary ? `
    background: ${theme.primary};
    color: white;
    border: 1px solid ${theme.primary};
  ` : `
    background: transparent;
    color: ${theme.text};
    border: 1px solid ${theme.border};
  `}

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(124, 58, 237, 0.3);
  }
`

const Avatar = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  border: 3px solid ${theme.primary};
  margin-bottom: 2rem;
  object-fit: cover;
`

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  letter-spacing: -0.03em;
  margin-bottom: 0.5rem;
  color: ${theme.text};
`

const SectionSub = styled.p`
  color: ${theme.textMuted};
  font-size: 1.1rem;
  margin-bottom: 3rem;
`

const ProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
  gap: 1.5rem;
`

const ProjectCard = styled.div`
  background: ${theme.surface2};
  border: 1px solid ${theme.border};
  border-radius: 12px;
  padding: 1.75rem;
  transition: all 0.25s;
  cursor: pointer;

  &:hover {
    border-color: ${theme.primary};
    transform: translateY(-4px);
    box-shadow: 0 12px 40px rgba(124, 58, 237, 0.15);
  }
`

const ProjectHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
`

const ProjectName = styled.h3`
  font-size: 1.25rem;
  font-weight: 700;
  color: ${theme.text};
  letter-spacing: -0.01em;
`

const ProjectStars = styled.span`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  color: ${theme.tertiary};
  font-size: 0.9rem;
  font-weight: 600;
`

const ProjectDesc = styled.p`
  color: ${theme.textMuted};
  font-size: 0.95rem;
  line-height: 1.6;
  margin-bottom: 1.25rem;
`

const ProjectTopics = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.25rem;
`

const Topic = styled.span`
  background: ${theme.surface3};
  color: ${theme.primaryLight};
  padding: 0.25rem 0.75rem;
  border-radius: 50px;
  font-size: 0.75rem;
  font-weight: 600;
`

const ProjectFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const LanguageBadge = styled.span`
  display: flex;
  align-items: center;
  gap: 0.4rem;
  color: ${theme.textMuted};
  font-size: 0.85rem;

  &::before {
    content: '';
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: ${props => getLangColor(props.lang)};
  }
`

const ViewCode = styled.a`
  color: ${theme.primary};
  text-decoration: none;
  font-size: 0.85rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.3rem;
  transition: all 0.2s;

  &:hover {
    color: ${theme.primaryLight};
  }
`

const SkillsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
`

const SkillCategory = styled.div`
  background: ${theme.surface2};
  border: 1px solid ${theme.border};
  border-radius: 12px;
  padding: 1.75rem;
`

const SkillCategoryTitle = styled.h3`
  font-size: 0.8rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: ${theme.primary};
  margin-bottom: 1.25rem;
`

const SkillList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`

const SkillTag = styled.span`
  background: ${theme.surface3};
  color: ${theme.text};
  padding: 0.5rem 1rem;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 500;
  border: 1px solid ${theme.border};
`

const ContactSection = styled.section`
  text-align: center;
  padding: 8rem 2rem;
  background: radial-gradient(ellipse at 50% 100%, rgba(124, 58, 237, 0.1) 0%, transparent 60%);
`

const ContactTitle = styled.h2`
  font-size: clamp(2.5rem, 6vw, 4rem);
  font-weight: 800;
  letter-spacing: -0.04em;
  margin-bottom: 1rem;
  color: ${theme.text};
`

const ContactSub = styled.p`
  color: ${theme.textMuted};
  font-size: 1.2rem;
  max-width: 450px;
  margin: 0 auto 2.5rem;
  line-height: 1.6;
`

const SocialLinks = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
`

const SocialLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.75rem;
  border-radius: 50px;
  font-size: 0.95rem;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.2s;
  border: 1px solid ${theme.border};
  color: ${theme.text};

  &:hover {
    border-color: ${theme.primary};
    background: rgba(124, 58, 237, 0.1);
    transform: translateY(-2px);
  }
`

const Footer = styled.footer`
  text-align: center;
  padding: 2rem;
  color: ${theme.textMuted};
  font-size: 0.85rem;
  border-top: 1px solid ${theme.border};
`

const MobileNav = styled.div`
  display: none;
  position: fixed;
  top: 70px;
  left: 0;
  right: 0;
  background: ${theme.surface};
  border-bottom: 1px solid ${theme.border};
  padding: 1rem;
  flex-direction: column;
  gap: 0.5rem;
  z-index: 99;

  @media (max-width: 600px) {
    display: ${props => props.open ? 'flex' : 'none'};
  }
`

function getLangColor(lang) {
  const colors = {
    Python: '#3572A5',
    JavaScript: '#f1e05a',
    TypeScript: '#3178c6',
    C: '#555555',
    HTML: '#e34c26',
  }
  return colors[lang] || '#858585'
}

function StarIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
    </svg>
  )
}

function GithubIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
    </svg>
  )
}

function LinkedinIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
    </svg>
  )
}

function ExternalIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
      <polyline points="15 3 21 3 21 9"/>
      <line x1="10" y1="14" x2="21" y2="3"/>
    </svg>
  )
}

function MenuIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="3" y1="12" x2="21" y2="12"/>
      <line x1="3" y1="6" x2="21" y2="6"/>
      <line x1="3" y1="18" x2="21" y2="18"/>
    </svg>
  )
}

function App() {
  const [activeSection, setActiveSection] = useState('home')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'projects', 'skills', 'contact']
      const scrollPos = window.scrollY + 200

      for (const section of sections) {
        const el = document.getElementById(section)
        if (el) {
          const { offsetTop, offsetHeight } = el
          if (scrollPos >= offsetTop && scrollPos < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollTo = (id) => {
    setMobileMenuOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div style={{ background: theme.bg, minHeight: '100vh', color: theme.text, fontFamily: 'Inter, system-ui, sans-serif' }}>
      <GlassNav>
        <NavBrand onClick={() => scrollTo('home')} style={{ cursor: 'pointer' }}>
          prshnnt
        </NavBrand>
        <NavLinks>
          <NavLink active={activeSection === 'home'} onClick={() => scrollTo('home')}>Home</NavLink>
          <NavLink active={activeSection === 'projects'} onClick={() => scrollTo('projects')}>Projects</NavLink>
          <NavLink active={activeSection === 'skills'} onClick={() => scrollTo('skills')}>Skills</NavLink>
          <NavLink active={activeSection === 'contact'} onClick={() => scrollTo('contact')}>Contact</NavLink>
        </NavLinks>
        <MobileMenu onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          <MenuIcon />
        </MobileMenu>
      </GlassNav>

      <MobileNav open={mobileMenuOpen}>
        <NavLink onClick={() => scrollTo('home')}>Home</NavLink>
        <NavLink onClick={() => scrollTo('projects')}>Projects</NavLink>
        <NavLink onClick={() => scrollTo('skills')}>Skills</NavLink>
        <NavLink onClick={() => scrollTo('contact')}>Contact</NavLink>
      </MobileNav>

      <Main>
        {/* Hero */}
        <HeroSection id="home">
          <Avatar src={portfolioData.avatar} alt={portfolioData.name} />
          <HeroGradient>{portfolioData.tagline}</HeroGradient>
          <HeroSub>{portfolioData.bio}</HeroSub>
          <HeroLinks>
            <HeroLink href={portfolioData.social.github} target="_blank" rel="noopener noreferrer">
              <GithubIcon /> GitHub
            </HeroLink>
            <HeroLink href={portfolioData.social.linkedin} target="_blank" rel="noopener noreferrer">
              <LinkedinIcon /> LinkedIn
            </HeroLink>
            <HeroLink primary onClick={() => scrollTo('projects')}>
              View Projects
            </HeroLink>
          </HeroLinks>
        </HeroSection>

        {/* Projects */}
        <Section id="projects">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <SectionTitle>Projects</SectionTitle>
            <SectionSub>Things I've built recently</SectionSub>
          </div>
          <ProjectsGrid>
            {portfolioData.projects.map((project) => (
              <ProjectCard key={project.name}>
                <ProjectHeader>
                  <ProjectName>{project.name}</ProjectName>
                  {project.stars > 0 && (
                    <ProjectStars>
                      <StarIcon /> {project.stars}
                    </ProjectStars>
                  )}
                </ProjectHeader>
                <ProjectDesc>{project.description}</ProjectDesc>
                <ProjectTopics>
                  {project.topics.slice(0, 4).map(topic => (
                    <Topic key={topic}>{topic}</Topic>
                  ))}
                </ProjectTopics>
                <ProjectFooter>
                  <LanguageBadge lang={project.language}>{project.language}</LanguageBadge>
                  <ViewCode href={project.url} target="_blank" rel="noopener noreferrer">
                    View Code <ExternalIcon />
                  </ViewCode>
                </ProjectFooter>
              </ProjectCard>
            ))}
          </ProjectsGrid>
        </Section>

        {/* Skills */}
        <Section id="skills">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <SectionTitle>Skills</SectionTitle>
            <SectionSub>Technologies I work with</SectionSub>
          </div>
          <SkillsGrid>
            {Object.entries(portfolioData.skills).map(([category, items]) => (
              <SkillCategory key={category}>
                <SkillCategoryTitle>{category}</SkillCategoryTitle>
                <SkillList>
                  {items.map(skill => (
                    <SkillTag key={skill}>{skill}</SkillTag>
                  ))}
                </SkillList>
              </SkillCategory>
            ))}
          </SkillsGrid>
        </Section>

        {/* Contact */}
        <ContactSection id="contact">
          <ContactTitle>Let's Connect</ContactTitle>
          <ContactSub>
            Always down to collaborate on interesting projects, especially around games and AI.
          </ContactSub>
          <SocialLinks>
            <SocialLink href={portfolioData.social.github} target="_blank" rel="noopener noreferrer">
              <GithubIcon /> GitHub
            </SocialLink>
            <SocialLink href={portfolioData.social.linkedin} target="_blank" rel="noopener noreferrer">
              <LinkedinIcon /> LinkedIn
            </SocialLink>
          </SocialLinks>
        </ContactSection>
      </Main>

      <Footer>
        Built by {portfolioData.name} · {new Date().getFullYear()} · Powered by React + Vite
      </Footer>
    </div>
  )
}

export default App
