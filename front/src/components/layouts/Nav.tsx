import React from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import routeConfig from '../../routes/route.config';
import { RouteMenuItem } from '../../types/core.type';
import { StyledNav, StyledNavItem, StyledNavItemIink, StyledNavItemWrap } from './layout.style';

const Nav: React.FC = () => {
  const { isLoggedIn, userRole } = useAuth();

  const menuItems: RouteMenuItem[] = routeConfig.filter((route: RouteMenuItem) => {
    if (!route.showInMenu) return false;

    // 1. 비로그인 상태일 때: 인증이 필요한 메뉴는 숨김
    if (!isLoggedIn && route.authRequired) return false;

    // 2. 로그인 상태일 때: 역할(Role) 제한이 있다면 체크
    if (isLoggedIn && route.roles && route.roles.length > 0) {
      return route.roles.includes(userRole || '');
    }

    return true;
  });

  return (
    <StyledNav>
      <StyledNavItemWrap>
        {menuItems.map((item) => (
          <StyledNavItem key={item.path}>
            <StyledNavItemIink as={Link} to={item.path.replace(':page', '1')}>
              {item.label}
            </StyledNavItemIink>
          </StyledNavItem>
        ))}
      </StyledNavItemWrap>
    </StyledNav>
  );
};

export default Nav;
