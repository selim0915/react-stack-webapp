import { RouteLink } from './routes';
import { UserRole } from '../constants/app.config';
import ApiManagement from '../pages/admin/apis';
import Dashboard from '../pages/admin/dashboard';
import MemberManagement from '../pages/admin/members';
import PostManagement from '../pages/admin/posts';
import SystemManagement from '../pages/admin/system';
import Chat from '../pages/chat';
import Forbidden from '../pages/error/Forbidden';
import NotFound from '../pages/error/NotFound';
import FreeBoardDetail from '../pages/freeboard/FreeBoardDetail';
import FreeBoardList from '../pages/freeboard/FreeBoardList';
import Login from '../pages/login';
import Main from '../pages/main';
import Schedule from '../pages/mypage';
import NoticeDetail from '../pages/notice/NoticeDetail';
import NoticeForm from '../pages/notice/NoticeForm';
import NoticeList from '../pages/notice/NoticeList';
import { RouteMenuItem } from '../types/core.type';

export const routeConfig: RouteMenuItem[] = [
  {
    path: RouteLink.MAIN,
    element: Main,
    showInMenu: false,
    authRequired: false,
    layout: ['header', 'nav', 'footer'],
  },
  {
    path: RouteLink.LOGIN,
    element: Login,
    showInMenu: false,
    authRequired: false,
    layout: ['footer'],
  },
  {
    path: RouteLink.NOTICE,
    label: '공지사항',
    element: NoticeList,
    showInMenu: true,
    authRequired: false,
    layout: ['header', 'nav', 'footer'],
  },
  {
    path: RouteLink.NOTICE_WRITE,
    element: NoticeForm,
    showInMenu: false,
    authRequired: true,
    layout: ['header', 'nav', 'footer'],
  },
  {
    path: RouteLink.NOTICE_DETAIL,
    element: NoticeDetail,
    showInMenu: false,
    authRequired: false,
    layout: ['header', 'nav', 'footer'],
  },
  {
    path: RouteLink.NOTICE_EDIT,
    element: NoticeForm,
    showInMenu: false,
    authRequired: true,
    layout: ['header', 'nav', 'footer'],
  },
  {
    path: RouteLink.FREE_BOARD,
    label: '자유게시판',
    element: FreeBoardList,
    showInMenu: true,
    authRequired: true,
    layout: ['header', 'nav', 'footer'],
  },
  {
    path: RouteLink.FREE_BOARD_DETAIL,
    element: FreeBoardDetail,
    showInMenu: false,
    authRequired: true,
    layout: ['header', 'nav', 'footer'],
  },
  {
    path: RouteLink.CHAT,
    label: '채팅방',
    element: Chat,
    showInMenu: true,
    authRequired: true,
    layout: ['header', 'nav', 'footer'],
  },
  {
    path: RouteLink.ADMIN,
    label: '관리자 홈',
    element: Dashboard, // 기본적으로 대시보드로 사용
    showInMenu: true,
    authRequired: true,
    roles: [UserRole.ADMIN],
    layout: ['header', 'nav', 'footer'],
  },
  {
    path: RouteLink.ADMIN_DASHBOARD,
    label: '대시보드',
    element: Dashboard,
    showInMenu: true,
    authRequired: true,
    roles: [UserRole.ADMIN],
    layout: ['header', 'nav', 'footer'],
  },
  {
    path: RouteLink.ADMIN_MEMBERS,
    label: '회원 관리',
    element: MemberManagement,
    showInMenu: true,
    authRequired: true,
    roles: [UserRole.ADMIN],
    layout: ['header', 'nav', 'footer'],
  },
  {
    path: RouteLink.ADMIN_POSTS,
    label: '게시글 관리',
    element: PostManagement,
    showInMenu: true,
    authRequired: true,
    roles: [UserRole.ADMIN],
    layout: ['header', 'nav', 'footer'],
  },
  {
    path: RouteLink.ADMIN_SYSTEM,
    label: '서버 관리',
    element: SystemManagement,
    showInMenu: true,
    authRequired: true,
    roles: [UserRole.ADMIN],
    layout: ['header', 'nav', 'footer'],
  },
  {
    path: RouteLink.ADMIN_APIS,
    label: 'API 관리',
    element: ApiManagement,
    showInMenu: true,
    authRequired: true,
    roles: [UserRole.ADMIN],
    layout: ['header', 'nav', 'footer'],
  },
  {
    path: RouteLink.SCHEDULE,
    label: '마이페이지',
    element: Schedule,
    showInMenu: false,
    authRequired: true,
    roles: [UserRole.USER, UserRole.ADMIN],
    layout: ['header', 'nav', 'footer'],
  },
  {
    path: RouteLink.FORBIDDEN,
    element: Forbidden,
    showInMenu: false,
    authRequired: false,
    layout: ['footer'],
  },
  {
    path: RouteLink.DEFAULT,
    element: NotFound,
    showInMenu: false,
    authRequired: false,
    layout: ['footer'],
  },
];

export default routeConfig;
