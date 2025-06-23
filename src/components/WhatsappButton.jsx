import React from 'react'
import styled from 'styled-components'
import { FaWhatsapp } from 'react-icons/fa'

const Button = styled.a`
  position: fixed;
  bottom: 30px;
  right: 30px;
  background-color: #25d366;
  color: #fff;
  font-size: 1.5rem;
  padding: 1rem;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0px 2px 15px rgba(0,0,0,0.3);
  z-index: 1000;
  transition: transform 0.3s;

  &:hover {
    transform: scale(1.1);
  }
`

function WhatsappButton() {
  return (
    <Button
      href="https://wa.me/SEUNUMEROAQUI"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Fale conosco no WhatsApp"
    >
      <FaWhatsapp />
    </Button>
  )
}

export default WhatsappButton
