import styled from 'styled-components'
import BlurText from './BlurText'
import useScrollAnimation from '../hooks/useScrollAnimation'
import useMagneticEffect from '../hooks/useMagneticEffect'

const cards = [
  {
    number: '01',
    title: 'Direção estratégica',
    accent: 'var(--blue)',
    border: 'var(--blue-border)',
    numberColor: 'rgba(61, 106, 193, 0.12)',
    text: 'Cada projeto começa entendendo o contexto da marca, o momento do negócio e o que realmente faz sentido construir agora.',
    icon: (
      <svg viewBox="0 0 48 48" aria-hidden="true">
        <path d="M18 30h12M20 35h8M24 8c-6.6 0-12 5-12 11.4 0 4.3 2.3 7.4 5.2 9.8 1.8 1.4 2.8 3 2.8 4.8h8c0-1.8 1.1-3.4 2.8-4.8 2.9-2.4 5.2-5.5 5.2-9.8C36 13 30.6 8 24 8Z" />
      </svg>
    ),
  },
  {
    number: '02',
    title: 'Execução consistente',
    accent: 'var(--blue)',
    border: 'var(--blue-border)',
    numberColor: 'rgba(61, 106, 193, 0.12)',
    text: 'Estrutura, conteúdo e tecnologia caminham juntos para que a entrega continue útil depois do lançamento.',
    icon: (
      <svg viewBox="0 0 48 48" aria-hidden="true">
        <path d="M10 34h28M14 30l8-8 6 6 10-12" />
        <path d="M32 16h6v6" />
      </svg>
    ),
  },
  {
    number: '03',
    title: 'Parceria próxima',
    accent: 'var(--gold)',
    border: 'var(--gold-border)',
    numberColor: 'rgba(224, 175, 70, 0.12)',
    text: 'Preferimos relações de longo prazo, com comunicação direta, ajustes honestos e visão de melhoria contínua.',
    icon: (
      <svg viewBox="0 0 48 48" aria-hidden="true">
        <path d="M15 24 8 17l5-5 8 8M33 24l7-7-5-5-8 8" />
        <path d="m20 27 4 4 10-10" />
      </svg>
    ),
  },
]

const Section = styled.section.attrs({
  className: 'section-padding',
  'aria-label': 'Diferenciais',
})`
  background: var(--bg);
`

const Inner = styled.div`
  max-width: 1280px;
  margin: 0 auto;
`

const Label = styled.p`
  margin-bottom: 20px;
  font-family: var(--font-body);
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--gold);
`

const Title = styled(BlurText).attrs({ as: 'h2' })`
  margin-bottom: 18px;
  font-family: var(--font-display);
  font-size: clamp(36px, 5vw, 64px);
  font-weight: 700;
  line-height: 1.02;
  letter-spacing: -0.045em;
  color: var(--cream);
`

const Intro = styled(BlurText)`
  max-width: 620px;
  margin-bottom: 60px;
  font-family: var(--font-body);
  font-size: 15px;
  line-height: 1.8;
  color: var(--cream-60);
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 24px;

  @media (max-width: 767px) {
    grid-template-columns: 1fr;
  }
`

const Card = styled.article`
  position: relative;
  padding: 48px 36px;
  border-radius: 16px;
  background: var(--bg2);
  border: 1px solid ${({ $border }) => $border};
  transition: border-color 300ms ease, transform 300ms ease;

  &:hover {
    border-color: ${({ $accent }) => $accent};
    transform: translateY(-4px);
  }

  svg {
    width: 40px;
    height: 40px;
    fill: none;
    stroke: ${({ $accent }) => $accent};
    stroke-width: 1.8;
    stroke-linecap: round;
    stroke-linejoin: round;
  }
`

const Number = styled.span`
  position: absolute;
  top: 16px;
  right: 24px;
  font-family: var(--font-display);
  font-size: 64px;
  font-weight: 800;
  line-height: 1;
  letter-spacing: -0.05em;
  color: ${({ $color }) => $color};
`

const CardTitle = styled.h3`
  margin: 20px 0 12px;
  font-family: var(--font-display);
  font-size: 20px;
  font-weight: 700;
  color: ${({ $accent }) => $accent};
`

const CardText = styled.p`
  font-family: var(--font-body);
  font-size: 14px;
  line-height: 1.7;
  color: var(--cream-60);
`

const Quote = styled.div`
  max-width: 700px;
  margin: 80px auto 0;
  text-align: center;
  font-family: var(--font-body);
  font-size: 18px;
  line-height: 1.7;
  font-style: italic;
  color: var(--cream-60);

  strong {
    display: block;
    margin-bottom: 10px;
    color: var(--gold);
    font-style: normal;
  }
`

const CtaWrap = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 48px;
`

const Cta = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 16px 40px;
  border-radius: 8px;
  background: var(--gold);
  color: var(--bg);
  font-family: var(--font-display);
  font-size: 15px;
  font-weight: 500;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  transition: background 200ms ease;

  &:hover {
    background: #c99a38;
  }
`

export default function DiferenciaisSection() {
  const sectionRef = useScrollAnimation()
  const ctaRef = useMagneticEffect(0.35)

  return (
    <Section ref={sectionRef}>
      <Inner>
        <Label className="section-eyebrow anim-hidden anim-delay-1">POR QUE A TITANIUM</Label>
        <div className="section-divider anim-hidden anim-delay-2" />
        <Title
          text="Estratégia. Execução. Parceria."
          className="anim-hidden anim-delay-2"
        />
        <Intro
          text="A Titanium trabalha com proximidade, clareza e senso de prioridade para construir presença digital com mais consistência."
          className="anim-hidden anim-delay-3"
        />

        <Grid>
          {cards.map((card, index) => (
            <Card
              key={card.title}
              $accent={card.accent}
              $border={card.border}
              className={`anim-hidden anim-delay-${index + 1}`}
            >
              <Number $color={card.numberColor}>{card.number}</Number>
              {card.icon}
              <CardTitle $accent={card.accent}>{card.title}</CardTitle>
              <CardText>{card.text}</CardText>
            </Card>
          ))}
        </Grid>

        <Quote className="anim-hidden anim-delay-4">
          <strong>Construímos estrutura digital para marcas que querem crescer com consistência.</strong>
          Porque, no final das contas, nosso trabalho não é empilhar entregas soltas.
        </Quote>

        <CtaWrap>
          <Cta ref={ctaRef} className="anim-hidden anim-delay-5" href="#contato">
            Vamos construir seu legado?
          </Cta>
        </CtaWrap>
      </Inner>
    </Section>
  )
}
