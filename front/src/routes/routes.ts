export const RouteLink = {
  MAIN: '/',
  LOGIN: '/login',
  NOTICE: '/notice',
  NOTICE_WRITE: '/notice/write',
  NOTICE_DETAIL: '/notice/:id',
  NOTICE_EDIT: '/notice/edit/:id',
  FREE_BOARD: '/freeboard/:page',
  FREE_BOARD_DETAIL: '/freeboard/show/:id',
  CHAT: '/chat/*',
  ADMIN: '/admin',
  ADMIN_DASHBOARD: '/admin/dashboard',
  ADMIN_MEMBERS: '/admin/members',
  ADMIN_POSTS: '/admin/posts',
  ADMIN_SYSTEM: '/admin/system',
  ADMIN_APIS: '/admin/apis',
  ADMIN_TEST: '/admin/test',
  SCHEDULE: '/mypage/schedule',
  FORBIDDEN: '/forbidden',
  DEFAULT: '*',
};

export default RouteLink;
