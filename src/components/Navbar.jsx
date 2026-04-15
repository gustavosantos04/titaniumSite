import { useEffect, useState } from 'react'
import styled from 'styled-components'
import iconSrc from '../assets/icone-t.png'
import logoSrc from '../assets/logo-titanium.png'
import { siteName } from '../config/site'

const NAV_ITEMS = [
  { id: 'inicio', label: 'Início' },
  { id: 'servicos', label: 'Serviços' },
  { id: 'portfolio', label: 'Portfólio' },
  { id: 'sobre', label: 'Sobre' },
  { id: 'diferenciais', label: 'Diferenciais' },
  { id: 'depoimentos', label: 'Depoimentos' },
  { id: 'contato', label: 'Contato' },
]

const easeOut = 'cubic-bezier(0.22, 1, 0.36, 1)'

const Shell = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 100;
  transform: translateY(${({ $entered }) => ($entered ? '0' : '-100%')});
  opacity: ${({ $entered }) => ($entered ? 1 : 0)};
  transition: transform 700ms ${easeOut} 200ms, opacity 700ms ${easeOut} 200ms;
`

const Bar = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: ${({ $scrolled }) => ($scrolled ? '16px 80px' : '24px 80px')};
  background: ${({ $scrolled }) => ($scrolled ? 'rgba(5, 10, 48, 0.9)' : 'transparent')};
  backdrop-filter: ${({ $scrolled }) => ($scrolled ? 'blur(18px)' : 'none')};
  border-bottom: 1px solid ${({ $scrolled }) => ($scrolled ? 'var(--blue-border)' : 'transparent')};
  transition: padding 0.35s ease, background 0.35s ease, border-color 0.35s ease;

  @media (max-width: 1023px) {
    padding: ${({ $scrolled }) => ($scrolled ? '16px 40px' : '22px 40px')};
  }

  @media (max-width: 767px) {
    padding: ${({ $scrolled }) => ($scrolled ? '14px 20px' : '18px 20px')};
  }
`

const Brand = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 12px;
  position: relative;
  z-index: 210;
`

const BrandIconWrap = styled.span`
  width: 42px;
  height: 42px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  background: linear-gradient(135deg, rgba(61, 106, 193, 0.22), rgba(61, 106, 193, 0.05));
  border: 1px solid rgba(61, 106, 193, 0.18);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.18);
  flex-shrink: 0;

  @media (max-width: 767px) {
    width: 38px;
    height: 38px;
  }
`

const BrandIcon = styled.img`
  width: 28px;
  height: 28px;
  object-fit: contain;
  filter: drop-shadow(0 0 14px rgba(61, 106, 193, 0.5));

  @media (max-width: 767px) {
    width: 24px;
    height: 24px;
  }
`

const BrandLogo = styled.img`
  height: 34px;
  width: auto;

  @media (max-width: 767px) {
    height: 28px;
  }
`

const NavLinks = styled.ul`
  display: flex;
  align-items: center;
  gap: 24px;

  @media (max-width: 767px) {
    display: none;
  }
`

const NavItem = styled.li`
  opacity: ${({ $entered }) => ($entered ? 1 : 0)};
  transform: translateY(${({ $entered }) => ($entered ? '0' : '-12px')});
  transition:
    transform 620ms ${easeOut},
    opacity 620ms ${easeOut};
  transition-delay: ${({ $delay }) => `${$delay}ms`};
`

const NavButton = styled.button`
  position: relative;
  color: ${({ $active }) => ($active ? 'var(--gold)' : 'var(--cream-60)')};
  font-family: var(--font-display);
  font-size: 14px;
  font-weight: 500;
  letter-spacing: 0.02em;
  transition: color 0.25s ease;

  &::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: -8px;
    width: ${({ $active }) => ($active ? '100%' : '0')};
    height: 1px;
    background: var(--gold);
    transition: width 0.25s ease;
  }

  &:hover {
    color: var(--cream);
  }
`

const Hamburger = styled.button`
  position: relative;
  z-index: 210;
  display: none;
  width: 44px;
  height: 44px;

  @media (max-width: 767px) {
    display: inline-flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 5px;
  }

  span {
    width: 22px;
    height: 2px;
    background: var(--cream);
    border-radius: 999px;
    transition: transform 280ms ease, opacity 280ms ease;
  }

  span:nth-child(1) {
    transform: ${({ $open }) => ($open ? 'translateY(7px) rotate(45deg)' : 'none')};
  }

  span:nth-child(2) {
    opacity: ${({ $open }) => ($open ? 0 : 1)};
  }

  span:nth-child(3) {
    transform: ${({ $open }) => ($open ? 'translateY(-7px) rotate(-45deg)' : 'none')};
  }
`

const MobileOverlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 200;
  display: flex;
  align-items: center;
  justify-content: center;
  background:
    radial-gradient(circle at top, rgba(61, 106, 193, 0.18), transparent 34%),
    rgba(5, 10, 48, 0.98);
  transform: translateX(${({ $open }) => ($open ? '0' : '-100%')});
  opacity: ${({ $open }) => ($open ? 1 : 0)};
  pointer-events: ${({ $open }) => ($open ? 'auto' : 'none')};
  transition: transform 380ms ${easeOut}, opacity 380ms ease;

  @media (min-width: 768px) {
    display: none;
  }
`

const MobileList = styled.ul`
  display: grid;
  gap: 20px;
  text-align: center;
`

const MobileLink = styled.button`
  color: ${({ $active }) => ($active ? 'var(--gold)' : 'var(--cream)')};
  font-family: var(--font-display);
  font-size: 28px;
  font-weight: 500;
  letter-spacing: -0.03em;
`

export default function Navbar() {
  const [active, setActive] = useState('inicio')
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [entered, setEntered] = useState(false)

  useEffect(() => {
    const timer = window.setTimeout(() => setEntered(true), 16)
    return () => window.clearTimeout(timer)
  }, [])

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 48)
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  useEffect(() => {
    const sections = NAV_ITEMS.map(({ id }) => document.getElementById(id)).filter(Boolean)

    if (!sections.length) {
      return undefined
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]

        if (visible?.target?.id) {
          setActive(visible.target.id)
        }
      },
      { threshold: 0.45 },
    )

    sections.forEach((section) => observer.observe(section))

    return () => {
      observer.disconnect()
    }
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  const scrollToSection = (id) => {
    const target = document.getElementById(id)

    if (!target) {
      return
    }

    const offset = window.innerWidth < 768 ? 88 : 96
    const top = target.getBoundingClientRect().top + window.scrollY - offset

    window.scrollTo({ top, behavior: 'smooth' })
    setActive(id)
    setMenuOpen(false)
  }

  const handleLinkClick = (id) => {
    scrollToSection(id)
    document.body.style.overflow = ''
  }

  return (
    <Shell $entered={entered}>
      <Bar $scrolled={scrolled}>
        <Brand
          href="#inicio"
          onClick={(event) => {
            event.preventDefault()
            handleLinkClick('inicio')
          }}
          aria-label={siteName}
        >
          <BrandIconWrap aria-hidden="true">
            <BrandIcon src={iconSrc} alt="" />
          </BrandIconWrap>
          <BrandLogo src={logoSrc} alt={siteName} />
        </Brand>

        <NavLinks>
          {NAV_ITEMS.map((item, index) => (
            <NavItem key={item.id} $entered={entered} $delay={320 + index * 45}>
              <NavButton
                type="button"
                $active={active === item.id}
                onClick={() => handleLinkClick(item.id)}
              >
                {item.label}
              </NavButton>
            </NavItem>
          ))}
        </NavLinks>

        <Hamburger
          type="button"
          $open={menuOpen}
          aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((current) => !current)}
        >
          <span />
          <span />
          <span />
        </Hamburger>
      </Bar>

      <MobileOverlay $open={menuOpen}>
        <MobileList>
          {NAV_ITEMS.map((item) => (
            <li key={item.id}>
              <MobileLink
                type="button"
                $active={active === item.id}
                onClick={() => handleLinkClick(item.id)}
              >
                {item.label}
              </MobileLink>
            </li>
          ))}
        </MobileList>
      </MobileOverlay>
    </Shell>
  )
}
