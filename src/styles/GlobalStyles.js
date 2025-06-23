// src/styles/GlobalStyles.js
import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    background-color: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.text};
    font-family: 'Montserrat', sans-serif;
  }

  a {
    text-decoration: none;
    color: inherit;
  }
`

export default GlobalStyle
