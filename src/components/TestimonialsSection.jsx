import './TestimonialsSection.css'
import ngfLogo from '../assets/testimonials/ngf-racing.webp'
import aaauLogo from '../assets/testimonials/aaau.webp'
import eletroserLogo from '../assets/testimonials/eletroser.webp'

const conversations = [
  {
    name: 'Nelter Santos', company: 'NGF Racing', initials: 'NS', avatar: ngfLogo,
    message: 'Site muito mais intuitivo e com diferencial gigante no meu nicho. O processo foi leve, com comunicação clara e entregas rápidas. Recomendo demais para quem quer crescer online.',
  },
  {
    name: 'Gestão AAAU', company: 'Atlética Universitária', initials: 'AU', avatar: aaauLogo,
    message: 'Em nome da atlética, só temos a agradecer. O site ficou incrível, super fácil de usar e com uma identidade visual que representa muito bem a nossa marca.',
  },
  {
    name: 'Silvio Ricardo', company: 'Eletroser', initials: 'SR', avatar: eletroserLogo,
    message: 'O site da Eletroser ficou muito bom, superou minhas expectativas. O processo foi tranquilo, com comunicação clara e entregas rápidas. Recomendo a Titanium para quem quer um site profissional e eficiente.',
  },
]

export default function TestimonialsSection({ id }) {
  return (
    <section className="testimonials-section section-padding" id={id} aria-labelledby="testimonials-heading">
      <header className="testimonials-header">
        <span className="section-eyebrow">Feedbacks recebidos</span>
        <h2 id="testimonials-heading" className="section-heading">Depois da entrega,<br />ficou essa conversa.</h2>
        <p>Mensagens de quem acompanhou o processo e recebeu um projeto Titanium.</p>
      </header>

      <div className="chat-grid">
        {conversations.map((conversation) => (
          <article className="chat-card" key={conversation.name}>
            <header className="chat-topbar">
              <span className="chat-back" aria-hidden="true">‹</span>
              <span className="chat-avatar">
                <img src={conversation.avatar} alt="" width="38" height="38" loading="lazy" />
              </span>
              <span className="chat-contact"><strong>{conversation.name}</strong><small>{conversation.company}</small></span>
              <span className="chat-menu" aria-hidden="true">⋮</span>
            </header>
            <div className="chat-body">
              <span className="chat-date">Feedback do projeto</span>
              <div className="chat-bubble">
                <p>{conversation.message}</p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
