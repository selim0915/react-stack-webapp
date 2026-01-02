import React from 'react';
import { StyledA, StyledDiv, StyledHeader, StyledHeaderItemWrap, StyledHeaderLogo } from '../styles/layout.style';
import { CookieKey, WordKey } from '../utils/constants';
import { deleteAllCookies, getCookie } from '../utils/cookie';

interface HeaderProp {
  isLoggedIn: boolean;
}

const Header: React.FC<HeaderProp> = ({ isLoggedIn }) => {
  const logout = () => {
    deleteAllCookies();
    window.location.href = '/login';
  };

  return (
    <StyledHeader>
      <StyledHeaderLogo href="/">{WordKey.PROJECT_NAME}</StyledHeaderLogo>
      <StyledHeaderItemWrap>
        {isLoggedIn ? (
          <>
            <StyledDiv>{getCookie(CookieKey.USER_ID)}님</StyledDiv>
            <StyledA onClick={logout}>로그아웃</StyledA>
          </>
        ) : (
          <StyledA href="/login">로그인</StyledA>
        )}
      </StyledHeaderItemWrap>
    </StyledHeader>
  );
};

export default Header;
