import React from 'react';
import { RouteObject } from 'react-router-dom';
import ProtectedRoute from '../components/providers/ProtectedRoute';
import { UserRole } from '../utils/constants';
import HeaderFooterLayout from '../layouts/HeaderFooterLayout';
import MainLayout from '../layouts/MainLayout';
import SimpleLayout from '../layouts/SimpleLayout';
import { RouteLink } from './routes';

import ApiManagement from '../pages/admin/apis';
import Dashboard from '../pages/admin/dashboard';
import MemberManagement from '../pages/admin/members';
import PostManagement from '../pages/admin/posts';
import SystemManagement from '../pages/admin/system';
import Board from '../pages/board';
import Chat from '../pages/chat';
import ComingSoon from '../pages/error/ComingSoon';
import Forbidden from '../pages/error/Forbidden';
import NotFound from '../pages/error/NotFound';
import FAQ from '../pages/faq';
import Login from '../pages/login';
import Main from '../pages/main';
import Mypage from '../pages/mypage';
import News from '../pages/news';
import NoticeDetail from '../pages/notice/NoticeDetail';
import NoticeForm from '../pages/notice/NoticeForm';
import NoticeList from '../pages/notice/NoticeList';
import Notifications from '../pages/notifications';
import SocialDetail from '../pages/social/SocialDetail';
import SocialList from '../pages/social/SocialList';
import Terms from '../pages/terms';
import Tools from '../pages/tools';
import Countdown from '../pages/tools/Countdown';

export interface RouteMenuHandle {
  label: string;
  isMainMenu?: boolean;
  isFooterMenu?: boolean;
  authRequired?: boolean;
  roles?: string[];
  linkPath?: string;
  subMenus?: { label: string; path: string; authRequired?: boolean; roles?: string[] }[];
}

export const routeConfig: RouteObject[] = [
  {
    element: <MainLayout />,
    children: [
      { path: RouteLink.MAIN, element: <Main /> },
      { 
        path: RouteLink.NEWS, 
        element: <News />,
        handle: { label: '뉴스', isMainMenu: true, authRequired: false }
      }, 
      { 
        path: RouteLink.POSTS, 
        element: <Board />,
        handle: { label: '게시글', isMainMenu: true, authRequired: false }
      },
      { 
        path: RouteLink.SOCIAL, 
        element: <SocialList />,
        handle: { label: '소셜', isMainMenu: true, authRequired: false, linkPath: RouteLink.SOCIAL.replace(':page', '1') }
      },
      { path: RouteLink.SOCIAL_DETAIL, element: <SocialDetail /> },
      { 
        path: RouteLink.TOOLS, 
        element: <Tools />,
        handle: { 
          label: '미니 도구', 
          isMainMenu: true, 
          authRequired: false,
          subMenus: [
            { label: '룰렛', path: RouteLink.TOOLS_ROULETTE, authRequired: false },
            { label: '정산하기', path: RouteLink.TOOLS_SETTLEMENT, authRequired: false },
            { label: '카운트다운', path: RouteLink.TOOLS_COUNTDOWN, authRequired: false },
            { label: '주변조회(지도)', path: RouteLink.TOOLS_MAP, authRequired: false },
          ]
        }
      },
      { path: RouteLink.TOOLS_COUNTDOWN, element: <Countdown /> },
      { path: RouteLink.TOOLS_ROULETTE, element: <ComingSoon /> },
      { path: RouteLink.TOOLS_SETTLEMENT, element: <ComingSoon /> },
      { path: RouteLink.TOOLS_MAP, element: <ComingSoon /> },
      { 
        path: RouteLink.CHAT, 
        element: <Chat />,
        handle: { label: '채팅', isMainMenu: true, authRequired: false, linkPath: RouteLink.CHAT.replace('/*', '') }
      },

      { path: RouteLink.MYPAGE, element: <ProtectedRoute authRequired roles={[UserRole.USER, UserRole.ADMIN]}><Mypage /></ProtectedRoute> },
      { path: RouteLink.NOTIFICATIONS, element: <ProtectedRoute authRequired roles={[UserRole.USER, UserRole.ADMIN]}><Notifications /></ProtectedRoute> },
      
      {
        path: RouteLink.ADMIN,
        element: <ProtectedRoute authRequired roles={[UserRole.ADMIN]}><Dashboard /></ProtectedRoute>,
        handle: { label: '관리자 홈', isMainMenu: true, authRequired: true, roles: ['ADMIN'] }
      },
      {
        path: RouteLink.ADMIN_DASHBOARD,
        element: <ProtectedRoute authRequired roles={[UserRole.ADMIN]}><Dashboard /></ProtectedRoute>,
      },
      {
        path: RouteLink.ADMIN_MEMBERS,
        element: <ProtectedRoute authRequired roles={[UserRole.ADMIN]}><MemberManagement /></ProtectedRoute>,
        handle: { label: '회원 관리', isMainMenu: true, authRequired: true, roles: ['ADMIN'] }
      },
      {
        path: RouteLink.ADMIN_POSTS,
        element: <ProtectedRoute authRequired roles={[UserRole.ADMIN]}><PostManagement /></ProtectedRoute>,
        handle: { label: '게시글 관리', isMainMenu: true, authRequired: true, roles: ['ADMIN'] }
      },
      {
        path: RouteLink.ADMIN_SYSTEM,
        element: <ProtectedRoute authRequired roles={[UserRole.ADMIN]}><SystemManagement /></ProtectedRoute>,
        handle: { label: '서버 관리', isMainMenu: true, authRequired: true, roles: ['ADMIN'] }
      },
      {
        path: RouteLink.ADMIN_APIS,
        element: <ProtectedRoute authRequired roles={[UserRole.ADMIN]}><ApiManagement /></ProtectedRoute>,
        handle: { label: 'API 관리', isMainMenu: true, authRequired: true, roles: ['ADMIN'] }
      },
    ]
  },
  {
    element: <HeaderFooterLayout />,
    children: [
      { path: RouteLink.FAQ, element: <FAQ />, handle: { label: 'FAQ', isFooterMenu: true, authRequired: false } },
      { path: RouteLink.TERMS, element: <Terms />, handle: { label: '이용약관', isFooterMenu: true, authRequired: false } },
      { path: RouteLink.NOTICE, element: <NoticeList />, handle: { label: '공지사항', isFooterMenu: true, authRequired: false } },
      { path: RouteLink.NOTICE_DETAIL, element: <NoticeDetail /> },
      { path: RouteLink.NOTICE_WRITE, element: <ProtectedRoute authRequired><NoticeForm /></ProtectedRoute> },
      { path: RouteLink.NOTICE_EDIT,  element: <ProtectedRoute authRequired><NoticeForm /></ProtectedRoute> },
    ]
  },
  {
    element: <SimpleLayout />,
    children: [
      { path: RouteLink.LOGIN, element: <Login /> },
      { path: RouteLink.SIGNUP, element: <ComingSoon /> },
      { path: RouteLink.FIND_ID, element: <ComingSoon /> },
      { path: RouteLink.FIND_PW, element: <ComingSoon /> },
      { path: RouteLink.FORBIDDEN, element: <Forbidden /> },
      { path: RouteLink.DEFAULT, element: <NotFound /> },
    ]
  }
];

export default routeConfig;

