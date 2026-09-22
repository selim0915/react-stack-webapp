import React from 'react';
import { RouteObject } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import SimpleLayout from '../layouts/SimpleLayout';
import ProtectedRoute from '../components/providers/ProtectedRoute';
import { UserRole } from '../constants/app.config';
import { RouteLink } from './routes';

// 페이지 컴포넌트 임포트
import Main from '../pages/main';
import Login from '../pages/login';
import NoticeList from '../pages/notice/NoticeList';
import NoticeForm from '../pages/notice/NoticeForm';
import NoticeDetail from '../pages/notice/NoticeDetail';
import SocialList from '../pages/social/SocialList';
import SocialDetail from '../pages/social/SocialDetail';
import Chat from '../pages/chat';
import Schedule from '../pages/mypage';
import Dashboard from '../pages/admin/dashboard';
import MemberManagement from '../pages/admin/members';
import PostManagement from '../pages/admin/posts';
import SystemManagement from '../pages/admin/system';
import ApiManagement from '../pages/admin/apis';
import Forbidden from '../pages/error/Forbidden';
import NotFound from '../pages/error/NotFound';
import ComingSoon from '../pages/error/ComingSoon';
import News from '../pages/news';
import Board from '../pages/board';
import Tools from '../pages/tools';

import FAQ from '../pages/faq';
import Terms from '../pages/terms';
import Notifications from '../pages/notifications';

/**
 * Route Object Configuration (React Router v6 style)
 */
export const routeConfig: RouteObject[] = [
  {
    element: <MainLayout />,
    children: [
      { path: RouteLink.MAIN, element: <Main /> },
      
      // 아직 준비 중인 메뉴들 (실제 페이지 컴포넌트 내부에서 ComingSoon 반환)
      { path: RouteLink.NEWS, element: <News /> }, 
      { path: RouteLink.POSTS, element: <Board /> },
      { path: RouteLink.TOOLS, element: <Tools /> },
      { path: '/faq', element: <FAQ /> },
      { path: '/terms', element: <Terms /> },
      { path: '/notifications', element: <Notifications /> },
      
      { path: RouteLink.NOTICE, element: <NoticeList /> },
      { path: RouteLink.NOTICE_DETAIL, element: <NoticeDetail /> },
      
      { 
        path: RouteLink.NOTICE_WRITE, 
        element: <ProtectedRoute authRequired={true}><NoticeForm /></ProtectedRoute> 
      },
      { 
        path: RouteLink.NOTICE_EDIT, 
        element: <ProtectedRoute authRequired={true}><NoticeForm /></ProtectedRoute> 
      },
      
      { 
        path: RouteLink.SOCIAL, 
        element: <ProtectedRoute authRequired={true}><SocialList /></ProtectedRoute> 
      },
      { 
        path: RouteLink.SOCIAL_DETAIL, 
        element: <ProtectedRoute authRequired={true}><SocialDetail /></ProtectedRoute> 
      },
      
      { 
        path: RouteLink.CHAT, 
        element: <ProtectedRoute authRequired={true}><Chat /></ProtectedRoute> 
      },
      
      { 
        path: RouteLink.SCHEDULE, 
        element: <ProtectedRoute authRequired={true} roles={[UserRole.USER, UserRole.ADMIN]}><Schedule /></ProtectedRoute> 
      },
      
      // 관리자 라우트
      {
        path: RouteLink.ADMIN,
        element: <ProtectedRoute authRequired={true} roles={[UserRole.ADMIN]}><Dashboard /></ProtectedRoute>,
      },
      {
        path: RouteLink.ADMIN_DASHBOARD,
        element: <ProtectedRoute authRequired={true} roles={[UserRole.ADMIN]}><Dashboard /></ProtectedRoute>,
      },
      {
        path: RouteLink.ADMIN_MEMBERS,
        element: <ProtectedRoute authRequired={true} roles={[UserRole.ADMIN]}><MemberManagement /></ProtectedRoute>,
      },
      {
        path: RouteLink.ADMIN_POSTS,
        element: <ProtectedRoute authRequired={true} roles={[UserRole.ADMIN]}><PostManagement /></ProtectedRoute>,
      },
      {
        path: RouteLink.ADMIN_SYSTEM,
        element: <ProtectedRoute authRequired={true} roles={[UserRole.ADMIN]}><SystemManagement /></ProtectedRoute>,
      },
      {
        path: RouteLink.ADMIN_APIS,
        element: <ProtectedRoute authRequired={true} roles={[UserRole.ADMIN]}><ApiManagement /></ProtectedRoute>,
      },
    ]
  },
  {
    element: <SimpleLayout />,
    children: [
      { path: RouteLink.LOGIN, element: <Login /> },
      { path: RouteLink.FORBIDDEN, element: <Forbidden /> },
      { path: RouteLink.DEFAULT, element: <NotFound /> },
    ]
  }
];

export default routeConfig;
