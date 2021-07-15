import { createGlobalStyle, ThemeProvider } from 'styled-components';
import {AlurakutStyles} from  '../src/lib/AlurakutCommons';

const GlobalStyle = createGlobalStyle` 
  html,
  body {
    background-color: #D9E6F6;
    font-family: sans-serif;
    padding: 0;
    margin: 0;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  #__next {
    display: flex;
    min-height: 100vh;
    flex-direction: column;
  }
  
  img {
    max-width: 100%;
    height: auto;
    display: block;
  }
  ${AlurakutStyles}
`;

const theme = {
  colors: {
    primary: '#0070f3',
  },
}

export default function App({ Component, pageProps }) {
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  )
}
