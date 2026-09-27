import React from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { MainMenus, MenuType } from '../../constants/menus';

const Nav: React.FC = () => {
  const { isLoggedIn, userRole } = useAuth();

  const menuItems: MenuType[] = MainMenus.filter((menu) => {
    // 1. 비로그인 상태일 때: 인증이 필요한 메뉴는 숨김
    if (!isLoggedIn && menu.authRequired) return false;

    // 2. 로그인 상태일 때: 역할(Role) 제한이 있다면 체크
    if (isLoggedIn && menu.roles && menu.roles.length > 0) {
      return menu.roles.includes(userRole || '');
    }

    return true;
  });

  return (
    <nav className="sticky top-[72px] z-40 w-full h-[50px] bg-[#fafafa] bg-white/95 backdrop-blur-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto w-full px-8 h-full flex items-center justify-center">
        <ul className="m-0 p-0 list-none flex gap-10">
          {menuItems.map((item) => (
            <li key={item.path} className="m-0 p-0 relative group">
              <Link 
                to={item.path} 
                className="block py-4 text-[15px] font-medium text-gray-600 hover:text-black hover:font-semibold no-underline transition-colors"
              >
                {item.label}
              </Link>
              
              {/* 하위 메뉴 (드롭다운) */}
              {item.subMenus && item.subMenus.length > 0 && (
                <div className="absolute left-1/2 -translate-x-1/2 top-full mt-0 bg-white border border-gray-200 shadow-lg rounded-md w-40 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 py-2">
                  <ul className="list-none m-0 p-0 flex flex-col">
                    {item.subMenus.map((subItem) => (
                      <li key={subItem.path} className="w-full">
                        <Link
                          to={subItem.path}
                          className="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-black hover:font-semibold transition-colors text-center"
                        >
                          {subItem.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Nav;
