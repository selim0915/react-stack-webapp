import React from 'react';
import { RouteObject } from 'react-router-dom';
import ProtectedRoute from '../components/providers/ProtectedRoute';
import { UserRole } from '../constants/app.config';
import HeaderFooterLayout from '../layouts/HeaderFooterLayout';
import MainLayout from '../layouts/MainLayout';
import SimpleLayout from '../layouts/SimpleLayout';
import { RouteLink } from './routes';

// 페이지 컴포넌트 임포트
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

/**
 * Route Object Configuration (React Router v6 style)
 */
export const routeConfig: RouteObject[] = [
  {
    element: <MainLayout />,
    children: [
      { path: RouteLink.MAIN, element: <Main /> },
      { path: RouteLink.NEWS, element: <News /> }, 
      { path: RouteLink.POSTS, element: <Board /> },
      { path: RouteLink.SOCIAL, element: <SocialList /> },
      { path: RouteLink.SOCIAL_DETAIL, element: <SocialDetail /> },
      { path: RouteLink.TOOLS, element: <Tools /> },
      { path: RouteLink.TOOLS_COUNTDOWN, element: <Countdown /> },
      { path: RouteLink.TOOLS_ROULETTE, element: <ComingSoon /> },
      { path: RouteLink.TOOLS_SETTLEMENT, element: <ComingSoon /> },
      { path: RouteLink.TOOLS_MAP, element: <ComingSoon /> },
      { path: RouteLink.CHAT, element: <Chat /> },

      // 마이페이지
      { path: RouteLink.MYPAGE, element: <ProtectedRoute authRequired roles={[UserRole.USER, UserRole.ADMIN]}><Mypage /></ProtectedRoute> },
      { path: RouteLink.NOTIFICATIONS, element: <ProtectedRoute authRequired roles={[UserRole.USER, UserRole.ADMIN]}><Notifications /></ProtectedRoute> },
      
      // 관리자페이지
      {
        path: RouteLink.ADMIN,
        element: <ProtectedRoute authRequired roles={[UserRole.ADMIN]}><Dashboard /></ProtectedRoute>,
      },
      {
        path: RouteLink.ADMIN_DASHBOARD,
        element: <ProtectedRoute authRequired roles={[UserRole.ADMIN]}><Dashboard /></ProtectedRoute>,
      },
      {
        path: RouteLink.ADMIN_MEMBERS,
        element: <ProtectedRoute authRequired roles={[UserRole.ADMIN]}><MemberManagement /></ProtectedRoute>,
      },
      {
        path: RouteLink.ADMIN_POSTS,
        element: <ProtectedRoute authRequired roles={[UserRole.ADMIN]}><PostManagement /></ProtectedRoute>,
      },
      {
        path: RouteLink.ADMIN_SYSTEM,
        element: <ProtectedRoute authRequired roles={[UserRole.ADMIN]}><SystemManagement /></ProtectedRoute>,
      },
      {
        path: RouteLink.ADMIN_APIS,
        element: <ProtectedRoute authRequired roles={[UserRole.ADMIN]}><ApiManagement /></ProtectedRoute>,
      },
    ]
  },
  {
    element: <HeaderFooterLayout />,
    children: [
      { path: RouteLink.FAQ, element: <FAQ /> },
      { path: RouteLink.TERMS, element: <Terms /> },
      { path: RouteLink.NOTICE, element: <NoticeList /> },
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
