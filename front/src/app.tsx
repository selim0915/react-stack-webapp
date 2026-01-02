import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Content from './layouts/Content';
import Footer from './layouts/Footer';
import Header from './layouts/Header';
import Nav from './layouts/Nav';
import { StyledArticle, StyledMain } from './styles/layout.style';
import { CookieKey } from './utils/constants';
import { getCookie } from './utils/cookie';

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(!!getCookie(CookieKey.ACCESS_TOKEN));

  useEffect(() => {
    const token = getCookie(CookieKey.ACCESS_TOKEN);
    setIsLoggedIn(!!token);
  }, []);

  return (
    <StyledMain>
      <Router
        future={{
          v7_relativeSplatPath: true,
          v7_startTransition: true,
        }}
      >
        <Header isLoggedIn={isLoggedIn} />
        {isLoggedIn && <Nav isLoggedIn={isLoggedIn} />}
        <StyledArticle>
          <Content isLoggedIn={isLoggedIn} />
          <Footer />
        </StyledArticle>
      </Router>
    </StyledMain>
  );
};

export default App;
