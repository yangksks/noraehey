import { Helmet, HelmetProvider } from 'react-helmet-async';
import GlobalStyle from './style/GlobalStyle';
import Theme from './style/Theme';
import './style/font.css';
import Router from './Router';

const App = () => {
  return (
    <HelmetProvider>
      <Helmet>
        <title>노래Hey</title>
      </Helmet>
      <GlobalStyle />
      <Theme />
      <Router />
    </HelmetProvider>
  );
};

export default App;
