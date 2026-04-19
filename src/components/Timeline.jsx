import { useEffect, useRef } from 'react'
import './Timeline.css'

const etapas = [
  {
    num: '01',
    titulo: 'Descoberta',
    apoio: 'Leitura de contexto',
    desc: 'Entendemos seu negócio, seus objetivos e quem é seu cliente ideal.',
  },
  {
    num: '02',
    titulo: 'Estratégia',
    apoio: 'Direção com prioridade',
    desc: 'Planejamos cada detalhe: arquitetura, design e tecnologia alinhados ao resultado.',
  },
  {
    num: '03',
    titulo: 'Execução',
    apoio: 'Construção com clareza',
    desc: 'Desenvolvemos com agilidade, entregas parciais e comunicação constante.',
  },
  {
    num: '04',
    titulo: 'Lançamento',
    apoio: 'Entrega com acompanhamento',
    desc: 'Entregamos, treinamos e acompanhamos os primeiros resultados com você.',
    fechamento: 'Cada etapa existe por um motivo. O resultado é o único critério.',
  },
]

export default function Timeline() {
  const lineRef = useRef(null)
  const wrapRef = useRef(null)
  const itemRefs = useRef([])

  useEffect(() => {
    const line = lineRef.current
    const wrap = wrapRef.current

    if (!line || !wrap) {
      return undefined
    }

    const total = line.getTotalLength()
    line.style.strokeDasharray = total
    line.style.strokeDashoffset = total

    const drawObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          line.style.transition = 'stroke-dashoffset 0.75s cubic-bezier(0.16, 1, 0.3, 1)'
          line.style.strokeDashoffset = '0'
          drawObserver.disconnect()
        }
      },
      { threshold: 0.2 },
    )
    drawObserver.observe(wrap)

    const itemObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('tl-item--visible')
            itemObserver.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.3 },
    )

    itemRefs.current.forEach((element) => element && itemObserver.observe(element))

    return () => {
      drawObserver.disconnect()
      itemObserver.disconnect()
    }
  }, [])

  return (
    <div ref={wrapRef} className="timeline-wrap">
      <svg className="tl-svg" viewBox="0 0 1000 8" fill="none" aria-hidden="true">
        <path
          ref={lineRef}
          d="M40 4C180 4 180 4 320 4S540 4 680 4S820 4 960 4"
          stroke="#E0AF46"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>

      <div className="tl-items">
        {etapas.map((etapa, index) => (
          <article
            key={etapa.num}
            ref={(element) => {
              itemRefs.current[index] = element
            }}
            className="tl-item"
            data-step={etapa.num}
            style={{ '--delay': `${index * 0.14}s` }}
          >
            <div className="tl-dot">
              <span className="tl-num">{etapa.num}</span>
            </div>

            <div className="tl-copy">
              <span className="tl-titulo">{etapa.titulo}</span>
              <span className="tl-apoio" aria-hidden="true">{etapa.apoio}</span>
              <p className="tl-desc">{etapa.desc}</p>
              {etapa.fechamento ? <p className="tl-fechamento">{etapa.fechamento}</p> : null}
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}
