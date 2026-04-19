import { useEffect, useId, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
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
const FOCUSABLE_SELECTOR = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(', ')

const Shell = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1400;
  transform: translateY(${({ $entered }) => ($entered ? '0' : '-100%')});
  opacity: ${({ $entered }) => ($entered ? 1 : 0)};
  transition: transform 700ms ${easeOut} 200ms, opacity 700ms ${easeOut} 200ms;
`

const Bar = styled.nav`
  position: relative;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: ${({ $scrolled, $menuOpen }) =>
    $menuOpen ? '16px 80px' : $scrolled ? '16px 80px' : '24px 80px'};
  background: ${({ $scrolled, $menuOpen }) => {
    if ($menuOpen) {
      return 'rgba(4, 10, 28, 0.96)'
    }

    return $scrolled ? 'rgba(5, 10, 48, 0.9)' : 'transparent'
  }};
  backdrop-filter: ${({ $scrolled, $menuOpen }) =>
    $scrolled || $menuOpen ? 'blur(18px)' : 'none'};
  border-bottom: 1px solid
    ${({ $scrolled, $menuOpen }) =>
      $scrolled || $menuOpen ? 'rgba(152, 203, 255, 0.12)' : 'transparent'};
  box-shadow: ${({ $menuOpen }) =>
    $menuOpen ? '0 18px 44px rgba(0, 0, 0, 0.28)' : 'none'};
  transition:
    padding 0.35s ease,
    background 0.35s ease,
    border-color 0.35s ease,
    box-shadow 0.35s ease;

  @media (max-width: 1023px) {
    padding: ${({ $scrolled, $menuOpen }) =>
      $menuOpen ? '16px 40px' : $scrolled ? '16px 40px' : '22px 40px'};
  }

  @media (max-width: 767px) {
    padding: ${({ $scrolled, $menuOpen }) =>
      $menuOpen ? '14px 20px' : $scrolled ? '14px 20px' : '18px 20px'};
  }
`

const Brand = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 16px;
  position: relative;
  z-index: 3;
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
  z-index: 3;
  display: none;
  width: 46px;
  height: 46px;
  border-radius: 14px;
  border: 1px solid rgba(152, 203, 255, 0.12);
  background: ${({ $open }) => ($open ? 'rgba(8, 18, 40, 0.9)' : 'rgba(8, 18, 40, 0.56)')};
  backdrop-filter: blur(16px);
  transition:
    background 0.25s ease,
    border-color 0.25s ease,
    transform 0.25s ease,
    box-shadow 0.25s ease;

  @media (max-width: 767px) {
    display: inline-flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 5px;
  }

  &:hover {
    transform: translateY(-1px);
    background: rgba(8, 18, 40, 0.88);
    border-color: rgba(224, 175, 70, 0.18);
    box-shadow: 0 14px 32px rgba(0, 0, 0, 0.28);
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
  z-index: 1390;
  display: flex;
  justify-content: flex-end;
  align-items: stretch;
  padding:
    calc(env(safe-area-inset-top, 0px) + 74px)
    20px
    calc(env(safe-area-inset-bottom, 0px) + 18px);
  background:
    linear-gradient(180deg, rgba(2, 6, 18, 0.34) 0%, rgba(2, 6, 18, 0.76) 16%, rgba(2, 6, 18, 0.92) 100%),
    radial-gradient(circle at top right, rgba(61, 106, 193, 0.22), transparent 36%),
    rgba(3, 8, 24, 0.8);
  backdrop-filter: blur(10px);
  opacity: ${({ $open }) => ($open ? 1 : 0)};
  visibility: ${({ $open }) => ($open ? 'visible' : 'hidden')};
  pointer-events: ${({ $open }) => ($open ? 'auto' : 'none')};
  transition:
    opacity 280ms ease,
    visibility 0s linear ${({ $open }) => ($open ? '0s' : '280ms')};

  @media (min-width: 768px) {
    display: none;
  }

  @media (max-width: 420px) {
    padding:
      calc(env(safe-area-inset-top, 0px) + 72px)
      12px
      calc(env(safe-area-inset-bottom, 0px) + 12px);
  }
`

const MobilePanel = styled.div`
  width: min(88vw, 380px);
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 18px;
  border-radius: 28px;
  border: 1px solid rgba(152, 203, 255, 0.12);
  background:
    linear-gradient(180deg, rgba(12, 19, 43, 0.98), rgba(4, 10, 28, 0.98)),
    rgba(4, 10, 28, 0.98);
  box-shadow: 0 28px 80px rgba(0, 0, 0, 0.46);
  overflow: auto;
  -webkit-overflow-scrolling: touch;
  transform: ${({ $open }) => ($open ? 'translateX(0)' : 'translateX(28px)')};
  transition: transform 320ms ${easeOut};

  @media (max-width: 420px) {
    width: 100%;
    padding: 16px;
    border-radius: 24px;
  }
`

const MobileHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
  padding-bottom: 18px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
`

const MobileHeaderText = styled.div`
  display: grid;
  gap: 6px;
`

const MobileEyebrow = styled.span`
  font-family: var(--font-body);
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: rgba(224, 175, 70, 0.88);
`

const MobileTitle = styled.strong`
  font-family: var(--font-display);
  font-size: 1.1rem;
  font-weight: 600;
  line-height: 1.1;
  color: var(--cream);
`

const MobileSubtitle = styled.p`
  max-width: 24ch;
  font-size: 0.92rem;
  line-height: 1.45;
  color: rgba(252, 248, 232, 0.62);
`

const MobileCloseButton = styled.button`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 44px;
  height: 44px;
  border-radius: 14px;
  border: 1px solid rgba(152, 203, 255, 0.14);
  background: rgba(255, 255, 255, 0.03);
  transition:
    background 0.22s ease,
    border-color 0.22s ease,
    transform 0.22s ease;

  &:hover {
    transform: translateY(-1px);
    background: rgba(255, 255, 255, 0.06);
    border-color: rgba(224, 175, 70, 0.2);
  }

  &::before,
  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 18px;
    height: 2px;
    border-radius: 999px;
    background: var(--cream);
  }

  &::before {
    transform: translate(-50%, -50%) rotate(45deg);
  }

  &::after {
    transform: translate(-50%, -50%) rotate(-45deg);
  }
`

const MobileList = styled.ul`
  display: grid;
  gap: 10px;
  margin-top: 18px;
`

const MobileItem = styled.li`
  min-width: 0;
`

const MobileLink = styled.button`
  width: 100%;
  min-height: 62px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
  padding: 18px 20px;
  border-radius: 20px;
  border: 1px solid
    ${({ $active }) => ($active ? 'rgba(224, 175, 70, 0.28)' : 'rgba(255, 255, 255, 0.06)')};
  background: ${({ $active }) =>
    $active ? 'rgba(224, 175, 70, 0.08)' : 'rgba(255, 255, 255, 0.025)'};
  color: ${({ $active }) => ($active ? 'var(--gold)' : 'var(--cream)')};
  font-family: var(--font-display);
  font-size: clamp(1.05rem, 4.6vw, 1.28rem);
  font-weight: 500;
  letter-spacing: -0.02em;
  line-height: 1.15;
  text-align: left;
  transition:
    transform 0.22s ease,
    border-color 0.22s ease,
    background 0.22s ease,
    box-shadow 0.22s ease,
    color 0.22s ease;

  &::after {
    content: '›';
    font-size: 1.35rem;
    line-height: 1;
    color: ${({ $active }) => ($active ? 'rgba(224, 175, 70, 0.92)' : 'rgba(252, 248, 232, 0.4)')};
    transition: transform 0.22s ease, color 0.22s ease;
  }

  &:hover,
  &:focus-visible {
    transform: translateY(-2px);
    border-color: rgba(224, 175, 70, 0.24);
    background: rgba(255, 255, 255, 0.045);
    box-shadow: 0 16px 28px rgba(0, 0, 0, 0.24);
    color: var(--cream);
  }

  &:hover::after,
  &:focus-visible::after {
    transform: translateX(2px);
    color: rgba(224, 175, 70, 0.92);
  }
`

function getFocusableElements(container) {
  if (!container) {
    return []
  }

  return Array.from(container.querySelectorAll(FOCUSABLE_SELECTOR)).filter(
    (element) =>
      !element.hasAttribute('disabled') &&
      element.getAttribute('aria-hidden') !== 'true' &&
      element.tabIndex !== -1,
  )
}

export default function Navbar() {
  const [active, setActive] = useState('inicio')
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [entered, setEntered] = useState(false)
  const menuButtonRef = useRef(null)
  const mobilePanelRef = useRef(null)
  const mobileFirstLinkRef = useRef(null)
  const wasMenuOpenRef = useRef(false)
  const mobileMenuId = useId()

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
    document.documentElement.classList.toggle('menu-open', menuOpen)
    document.body.classList.toggle('menu-open', menuOpen)

    if (wasMenuOpenRef.current && !menuOpen) {
      menuButtonRef.current?.focus()
    }

    wasMenuOpenRef.current = menuOpen

    return () => {
      document.documentElement.classList.remove('menu-open')
      document.body.classList.remove('menu-open')
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

  useEffect(() => {
    if (!menuOpen) {
      return undefined
    }

    const focusTimer = window.setTimeout(() => {
      mobileFirstLinkRef.current?.focus()
    }, 40)

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        setMenuOpen(false)
        return
      }

      if (event.key !== 'Tab') {
        return
      }

      const focusableElements = getFocusableElements(mobilePanelRef.current)

      if (!focusableElements.length) {
        event.preventDefault()
        mobilePanelRef.current?.focus()
        return
      }

      const firstElement = focusableElements[0]
      const lastElement = focusableElements[focusableElements.length - 1]

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault()
        lastElement.focus()
      }

      if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault()
        firstElement.focus()
      }
    }

    window.addEventListener('keydown', onKeyDown)

    return () => {
      window.clearTimeout(focusTimer)
      window.removeEventListener('keydown', onKeyDown)
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
  }

  const mobileMenu = (
    <MobileOverlay
      $open={menuOpen}
      aria-hidden={!menuOpen}
      onClick={() => setMenuOpen(false)}
    >
      <MobilePanel
        id={mobileMenuId}
        ref={mobilePanelRef}
        $open={menuOpen}
        role="dialog"
        aria-modal="true"
        aria-label="Menu mobile"
        tabIndex="-1"
        onClick={(event) => event.stopPropagation()}
      >
        <MobileHeader>
          <MobileHeaderText>
            <MobileEyebrow>Menu principal</MobileEyebrow>
            <MobileTitle>Navegação</MobileTitle>
            <MobileSubtitle>Escolha uma seção e continue a navegação sem distrações.</MobileSubtitle>
          </MobileHeaderText>

          <MobileCloseButton
            type="button"
            aria-label="Fechar menu"
            onClick={() => setMenuOpen(false)}
          />
        </MobileHeader>

        <nav aria-label="Navegação mobile">
          <MobileList>
            {NAV_ITEMS.map((item, index) => (
              <MobileItem key={item.id}>
                <MobileLink
                  ref={index === 0 ? mobileFirstLinkRef : undefined}
                  type="button"
                  $active={active === item.id}
                  onClick={() => handleLinkClick(item.id)}
                  aria-current={active === item.id ? 'location' : undefined}
                >
                  <span>{item.label}</span>
                </MobileLink>
              </MobileItem>
            ))}
          </MobileList>
        </nav>
      </MobilePanel>
    </MobileOverlay>
  )

  return (
    <Shell $entered={entered}>
      <Bar $scrolled={scrolled} $menuOpen={menuOpen} aria-label="Navegação principal">
        <Brand
          href="#inicio"
          onClick={(event) => {
            event.preventDefault()
            handleLinkClick('inicio')
          }}
          aria-label={siteName}
        >
          <BrandIconWrap aria-hidden="true">
            <BrandIcon src={iconSrc} alt="" width="32" height="32" decoding="async" />
          </BrandIconWrap>
          <BrandLogo src={logoSrc} alt={siteName} width="159" height="42" decoding="async" />
        </Brand>

        <NavLinks>
          {NAV_ITEMS.map((item, index) => (
            <NavItem key={item.id} $entered={entered} $delay={320 + index * 45}>
              <NavButton
                type="button"
                $active={active === item.id}
                onClick={() => handleLinkClick(item.id)}
                aria-current={active === item.id ? 'location' : undefined}
              >
                {item.label}
              </NavButton>
            </NavItem>
          ))}
        </NavLinks>

        <Hamburger
          ref={menuButtonRef}
          type="button"
          $open={menuOpen}
          aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={menuOpen}
          aria-controls={mobileMenuId}
          onClick={() => setMenuOpen((current) => !current)}
        >
          <span />
          <span />
          <span />
        </Hamburger>
      </Bar>

      {typeof document !== 'undefined' ? createPortal(mobileMenu, document.body) : null}
    </Shell>
  )
}
