import React from 'react';
import { ActionLink, HeaderActions, HeaderWrapper, LogoSection, StatusText } from '../styles/layout.style';
import { RouteLink, WordKey } from '../utils/constants';
import { deleteAllCookies } from '../utils/cookie';

interface HeaderProp {
  userId?: string;
}

const Header: React.FC<HeaderProp> = ({ userId }) => {
  const logout = () => {
    deleteAllCookies();
    window.location.href = RouteLink.LOGIN;
  };

  return (
    <HeaderWrapper>
      <LogoSection href={RouteLink.MAIN}>{WordKey.PROJECT_NAME}</LogoSection>

      <HeaderActions>
        {userId ? (
          <>
            <StatusText>{userId}님</StatusText>
            <ActionLink onClick={logout}>로그아웃</ActionLink>
          </>
        ) : (
          <ActionLink href={RouteLink.LOGIN}>로그인</ActionLink>
        )}
      </HeaderActions>
    </HeaderWrapper>
  );
};

export default Header;
