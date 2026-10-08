import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAppSelector } from '../../store/hooks';
import { getMainMenus } from '../../utils/menus';

const Nav: React.FC = () => {
  const location = useLocation();
  const { role } = useAppSelector((state) => state.user);

  const menuItems = getMainMenus().filter((menu) => {
    if (menu.authRequired) return false;
    if (menu.roles && menu.roles.length > 0) {
      return menu.roles.indexOf(role || '') !== -1;
    }
    return true;
  });

  const activeMenu = menuItems.find((item) => 
    location.pathname === item.path || (item.path !== '/' && location.pathname.startsWith(item.path))
  );

  return (
    <>
      {/* Main Nav Items */}
      <nav className="flex flex-wrap items-center h-full gap-x-4 gap-y-2 md:gap-6">
        {menuItems.map((item) => {
          const isActive = activeMenu?.path === item.path;
          return (
            <Link 
              key={item.path}
              to={item.path} 
              className={`text-[16px] transition-colors hover:text-[var(--ui-color-primary)] no-underline ${
                isActive ? 'font-bold text-[var(--ui-color-primary)]' : 'font-medium text-[var(--ui-color-text)]'
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
    </>
  );
};

export default Nav;
