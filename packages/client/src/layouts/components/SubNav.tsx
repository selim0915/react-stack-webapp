import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAppSelector } from '../../store/hooks';
import { getMainMenus } from '../../utils/menus';

const SubNav: React.FC = () => {
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

  if (!activeMenu || !activeMenu.subMenus || activeMenu.subMenus.length === 0) {
    return null;
  }

  return (
    <div className="w-full bg-[var(--ui-color-background)] border-b border-[var(--ui-color-border)] min-h-[var(--submenu-height)] py-2 flex items-center z-40">
      <div className="max-w-[var(--content-width)] mx-auto w-full px-4 md:px-8 flex flex-wrap gap-x-4 gap-y-2 md:gap-6">
        {activeMenu.subMenus.map((sub) => {
          const isSubActive = location.pathname === sub.path || (sub.path !== '/' && location.pathname.startsWith(sub.path));
          return (
            <Link 
              key={sub.path}
              to={sub.path} 
              className={`text-[14px] transition-colors hover:text-[var(--ui-color-primary)] no-underline ${
                isSubActive ? 'font-bold text-[var(--ui-color-primary)]' : 'font-medium text-[var(--ui-color-secondary)]'
              }`}
            >
              {sub.label}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default SubNav;
