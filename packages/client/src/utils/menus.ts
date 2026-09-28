import { RouteObject } from 'react-router-dom';
import { routeConfig, RouteMenuHandle } from '../routes/route.config';

export type MenuType = {
  label: string;
  path: string;
  authRequired?: boolean;
  roles?: string[];
  subMenus?: MenuType[];
};

// Helper to extract menus recursively
const extractMenus = (routes: RouteObject[], predicate: (handle: RouteMenuHandle) => boolean): MenuType[] => {
  const menus: MenuType[] = [];
  
  const traverse = (routeList: RouteObject[]) => {
    for (const route of routeList) {
      if (route.handle) {
        const handle = route.handle as RouteMenuHandle;
        if (predicate(handle)) {
          menus.push({
            label: handle.label,
            path: handle.linkPath || route.path || '',
            authRequired: handle.authRequired,
            roles: handle.roles,
            subMenus: handle.subMenus as MenuType[]
          });
        }
      }
      if (route.children) {
        traverse(route.children);
      }
    }
  };
  
  traverse(routes);
  return menus;
};

export const getMainMenus = (): MenuType[] => extractMenus(routeConfig || [], (h) => !!h.isMainMenu);
export const getFooterMenus = (): MenuType[] => extractMenus(routeConfig || [], (h) => !!h.isFooterMenu);
