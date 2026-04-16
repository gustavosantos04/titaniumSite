import styled from 'styled-components'
import BlurText from './BlurText'
import useScrollAnimation from '../hooks/useScrollAnimation'

const PILLARS = [
  {
    title: 'Escopo claro desde o início',
    text: 'Antes de layout ou código, alinhamos objetivo, prioridade e o que realmente precisa entrar no projeto agora.',
  },
  {
    title: 'Comunicação próxima durante a execução',
    text: 'Você acompanha decisões importantes, recebe checkpoints objetivos e entende o que está sendo construído.',
  },
  {
    title: 'Entrega útil, não só bonita',
    text: 'Cada página, automação ou sistema é pensado para melhorar percepção de marca, operação ou geração de oportunidades.',
  },
  {
    title: 'Base para continuar evoluindo',
    text: 'A entrega final já considera próximos passos, manutenção e margem para crescimento sem precisar refazer tudo.',
  },
]

const Section = styled.section.attrs({
  className: 'section-padding',
  'aria-label': 'Metodologia',
})`
  background: var(--bg);
  border-top: 1px solid var(--blue-border);
`

const Inner = styled.div`
  max-width: 1280px;
  margin: 0 auto;
`

const Header = styled.div`
  max-width: 760px;
  margin-bottom: 48px;
`

const Label = styled.p`
  margin-bottom: 12px;
  font-family: var(--font-body);
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--gold);
`

const Title = styled(BlurText).attrs({ as: 'h2' })`
  margin-bottom: 16px;
  font-family: var(--font-display);
  font-size: clamp(28px, 4vw, 42px);
  font-weight: 700;
  letter-spacing: -0.03em;
  color: var(--cream);
`

const Intro = styled(BlurText)`
  font-family: var(--font-body);
  font-size: 15px;
  line-height: 1.8;
  color: var(--cream-60);
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 24px;

  @media (max-width: 767px) {
    grid-template-columns: 1fr;
  }
`

const Card = styled.article`
  padding: 28px;
  border-radius: 20px;
  border: 1px solid var(--blue-border);
  background:
    radial-gradient(circle at top right, rgba(224, 175, 70, 0.06), transparent 28%),
    linear-gradient(180deg, rgba(255, 255, 255, 0.03), rgba(255, 255, 255, 0.01)),
    var(--bg2);
`

const CardIndex = styled.span`
  display: inline-flex;
  margin-bottom: 18px;
  padding: 0.35rem 0.65rem;
  border-radius: 999px;
  border: 1px solid rgba(224, 175, 70, 0.22);
  background: rgba(224, 175, 70, 0.08);
  font-family: var(--font-body);
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--gold);
`

const CardTitle = styled.h3`
  margin-bottom: 12px;
  font-family: var(--font-display);
  font-size: clamp(1.15rem, 2vw, 1.45rem);
  font-weight: 600;
  color: var(--cream);
`

const CardText = styled.p`
  font-family: var(--font-body);
  font-size: 14px;
  line-height: 1.75;
  color: var(--cream-60);
`

export default function StatsSection() {
  const sectionRef = useScrollAnimation()

  return (
    <Section id="stats" ref={sectionRef}>
      <Inner>
        <Header>
          <Label className="section-eyebrow anim-hidden">Como conduzimos os projetos</Label>
          <div className="section-divider anim-hidden anim-delay-1" />
          <Title
            text="Método antes dos números."
            className="anim-hidden anim-delay-2"
          />
          <Intro
            text="A Titanium é uma agência jovem. Por isso, nossa melhor prova hoje está no processo, na proximidade com cada cliente e na consistência de cada entrega."
            className="anim-hidden anim-delay-3"
          />
        </Header>

        <Grid>
          {PILLARS.map((pillar, index) => (
            <Card key={pillar.title} className={`anim-hidden anim-delay-${(index % 4) + 1}`}>
              <CardIndex>Base {String(index + 1).padStart(2, '0')}</CardIndex>
              <CardTitle>{pillar.title}</CardTitle>
              <CardText>{pillar.text}</CardText>
            </Card>
          ))}
        </Grid>
      </Inner>
    </Section>
  )
}
