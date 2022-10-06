import { Helmet, HelmetProvider } from 'react-helmet-async';
import { RecoilRoot } from 'recoil';
import GlobalStyle from './style/GlobalStyle';
import Router from './Router';
import './style/font.css';

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
