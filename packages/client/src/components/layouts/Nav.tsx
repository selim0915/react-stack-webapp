import React from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import routeConfig from '../../routes/route.config';
import { RouteMenuItem } from '../../types/core.type';

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
    <nav className="w-auto h-[50px] px-6 box-border flex items-center flex-wrap content-center border-b border-gray-200">
      <ul className="m-0 p-0 list-none flex gap-5">
        {menuItems.map((item) => (
          <li key={item.path} className="m-0 p-0 min-w-[50px]">
            <Link 
              to={item.path.replace(':page', '1')} 
              className="text-[14px] text-blue-600 hover:font-bold no-underline"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Nav;
