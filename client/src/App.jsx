import { Helmet, HelmetProvider } from 'react-helmet-async';
import GlobalStyle from './style/GlobalStyle';
import Router from './Router';

const App = () => {
  return (
    <HelmetProvider>
      <Helmet>
        <title>노래Hey</title>
      </Helmet>
      <GlobalStyle />
      <Router />
    </HelmetProvider>
  );
};

export default App;
