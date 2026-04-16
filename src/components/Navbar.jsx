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
  gap: 16px;
  position: relative;
  z-index: 210;
`

const BrandIconWrap = styled.span`
  width: 52px;
  height: 52px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 14px;
  background: linear-gradient(135deg, rgba(61, 106, 193, 0.22), rgba(61, 106, 193, 0.05));
  border: 1px solid rgba(61, 106, 193, 0.18);
  box-shadow: 0 16px 30px rgba(0, 0, 0, 0.2);
  flex-shrink: 0;

  @media (max-width: 767px) {
    width: 44px;
    height: 44px;
  }
`

const BrandIcon = styled.img`
  width: 32px;
  height: 32px;
  object-fit: contain;
  filter: drop-shadow(0 0 14px rgba(61, 106, 193, 0.5));

  @media (max-width: 767px) {
    width: 26px;
    height: 26px;
  }
`

const BrandLogo = styled.img`
  height: 42px;
  width: auto;

  @media (max-width: 767px) {
    height: 32px;
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
  width: 46px;
  height: 46px;
  border-radius: 14px;
  border: 1px solid rgba(152, 203, 255, 0.12);
  background: rgba(8, 18, 40, 0.44);
  backdrop-filter: blur(16px);
  transition: background 0.25s ease, border-color 0.25s ease, transform 0.25s ease;

  @media (max-width: 767px) {
    display: inline-flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 5px;
  }

  &:hover {
    transform: translateY(-1px);
    background: rgba(8, 18, 40, 0.68);
    border-color: rgba(224, 175, 70, 0.16);
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
  padding: 84px 20px 24px;
  background:
    radial-gradient(circle at top, rgba(61, 106, 193, 0.2), transparent 34%),
    rgba(5, 10, 48, 0.88);
  backdrop-filter: blur(22px);
  transform: translateY(${({ $open }) => ($open ? '0' : '-12px')});
  opacity: ${({ $open }) => ($open ? 1 : 0)};
  pointer-events: ${({ $open }) => ($open ? 'auto' : 'none')};
  transition: transform 320ms ${easeOut}, opacity 320ms ease;

  @media (min-width: 768px) {
    display: none;
  }
`

const MobilePanel = styled.div`
  width: min(100%, 420px);
  padding: 1rem;
  border-radius: 28px;
  border: 1px solid rgba(255, 255, 255, 0.06);
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.015)),
    rgba(4, 10, 28, 0.94);
  box-shadow: 0 28px 80px rgba(0, 0, 0, 0.34);
  transform: ${({ $open }) => ($open ? 'scale(1)' : 'scale(0.96)')};
  transition: transform 320ms ${easeOut};
`

const MobileList = styled.ul`
  display: grid;
  gap: 12px;
  text-align: center;
`

const MobileLink = styled.button`
  width: 100%;
  min-height: 64px;
  padding: 16px 18px;
  border-radius: 18px;
  border: 1px solid
    ${({ $active }) => ($active ? 'rgba(224, 175, 70, 0.24)' : 'rgba(255, 255, 255, 0.05)')};
  background: ${({ $active }) =>
    $active ? 'rgba(224, 175, 70, 0.08)' : 'rgba(255, 255, 255, 0.02)'};
  color: ${({ $active }) => ($active ? 'var(--gold)' : 'var(--cream)')};
  font-family: var(--font-display);
  font-size: clamp(1.35rem, 5vw, 1.8rem);
  font-weight: 500;
  letter-spacing: -0.03em;
  transition: transform 0.22s ease, border-color 0.22s ease, background 0.22s ease;

  &:hover {
    transform: translateY(-2px);
    border-color: rgba(224, 175, 70, 0.22);
  }
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

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) {
        setMenuOpen(false)
      }
    }

    window.addEventListener('resize', onResize)

    return () => {
      window.removeEventListener('resize', onResize)
    }
  }, [])

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

      <MobileOverlay $open={menuOpen} onClick={() => setMenuOpen(false)}>
        <MobilePanel $open={menuOpen} onClick={(event) => event.stopPropagation()}>
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
        </MobilePanel>
      </MobileOverlay>
    </Shell>
  )
}
