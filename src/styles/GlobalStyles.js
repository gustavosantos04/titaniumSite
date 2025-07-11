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

  body, html, #root {
  margin: 0;
  padding: 0;
  overflow-x: hidden;
  box-sizing: border-box;
}

  a {
    text-decoration: none;
    color: inherit;
  }
`



export default GlobalStyle
