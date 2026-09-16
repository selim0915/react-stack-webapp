import React from 'react';
import { useNavigate } from 'react-router-dom';
import { WordKey } from '../../constants/messages';
import useAuth from '../../hooks/useAuth';
import { RouteLink } from '../../routes/routes';
import { ActionLink, HeaderActions, HeaderWrapper, LogoSection, StatusText } from './layout.style';

const Header: React.FC = () => {
  const { userId, logout: authLogout } = useAuth();
  const navigate = useNavigate();

  const logout = () => {
    authLogout(() => {
      navigate(RouteLink.MAIN);
    });
  };

  return (
    <HeaderWrapper>
      <LogoSection onClick={() => navigate(RouteLink.MAIN)} style={{ cursor: 'pointer' }}>
        {WordKey.PROJECT_NAME}
      </LogoSection>

      <HeaderActions>
        {userId ? (
          <>
            <StatusText>{userId}님</StatusText>
            <ActionLink onClick={() => navigate(RouteLink.SCHEDULE)}>마이페이지</ActionLink>
            <ActionLink onClick={logout}>로그아웃</ActionLink>
          </>
        ) : (
          <ActionLink onClick={() => navigate(RouteLink.LOGIN)}>로그인</ActionLink>
        )}
      </HeaderActions>
    </HeaderWrapper>
  );
};

export default Header;
