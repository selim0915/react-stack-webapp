import React from 'react';

export type ProductType = {
  name: string;
  description: string;
  price: number;
};

export interface RouteItem {
  path: string;
  element: React.ElementType;
  authRequired: boolean;
}

export interface MenuItem {
  label?: string;
  showInMenu: boolean;
  roles?: string[];
}

export type LayoutType = 'header' | 'nav' | 'footer';

export interface RouteMenuItem extends RouteItem, MenuItem {
  layout?: LayoutType[];
}
