import { Provider } from 'react-redux';
import { createGlobalStyle } from 'styled-components';
import { getStore } from './app/store';
import { Themable } from './containers/Themable';
import { Routes } from './routes';

const GlobalStyle = createGlobalStyle`
  html, body {
    margin: 0;
    padding: 0;
    height: 100%;
    width: 100%;
  }

  html {
    font-size: 62.5%;
  }

  * {
    box-sizing: border-box;
  }

  body {
    background-color: ${(props) => props.theme.colors.background};
    color: ${(props) => props.theme.colors.secondary};
    font-size: 1.6rem;
    overflow: hidden;
    overflow-y: scroll;
    font-family: ${(props) => props.theme.globalFont};
  }

  #root {
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
  }

  a {
    text-decoration: none;
    &:visited {
      color: inherit;
    }
  }
  
  p {
    letter-spacing: .015rem;
    margin: 0;
  }
  
  p + p {
    margin-top: 1rem;
  }

  [disabled],
  .disabled {
    opacity: 0.7;
    cursor: default;
    pointer-events: none;
  }
`;

const store = getStore();

const App: React.VFC = () => {
  return (
    <Provider store={store}>
      <Themable>
        <GlobalStyle />
        <Routes />
      </Themable>
    </Provider>
  );
};

export default App;
