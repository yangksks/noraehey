import { Helmet, HelmetProvider } from 'react-helmet-async';
import GlobalStyle from './style/GlobalStyle';
import './style/font.css';
import Router from './Router';
import { RecoilRoot } from 'recoil';

const App = () => {
  return (
    <HelmetProvider>
      <Helmet>
        <title>노래Hey</title>
      </Helmet>
      <GlobalStyle />
      <RecoilRoot>
        <Router />
      </RecoilRoot>
    </HelmetProvider>
  );
};

export default App;
