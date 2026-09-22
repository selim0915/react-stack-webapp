import { RouteLink } from '../routes/routes';

export interface MenuType {
  label: string;
  path: string;
  authRequired: boolean;
  roles?: string[];
}

// 1Depth 메인 네비게이션 메뉴
export const MainMenus: MenuType[] = [
  { label: '뉴스', path: RouteLink.NEWS, authRequired: false },
  { label: '게시글', path: RouteLink.POSTS, authRequired: false },
  { label: '소셜', path: RouteLink.SOCIAL.replace(':page', '1'), authRequired: true },
  { label: '미니 도구', path: RouteLink.TOOLS, authRequired: false },
  { label: '채팅', path: RouteLink.CHAT.replace('/*', ''), authRequired: true },
  
  // 관리자 전용 메뉴 (ADMIN 권한이 있는 유저에게만 보임)
// 관리자 전용 메뉴 (ADMIN 권한이 있는 유저에게만 보임)
  { label: '관리자 홈', path: RouteLink.ADMIN, authRequired: true, roles: ['ADMIN'] },
  { label: '회원 관리', path: RouteLink.ADMIN_MEMBERS, authRequired: true, roles: ['ADMIN'] },
  { label: '게시글 관리', path: RouteLink.ADMIN_POSTS, authRequired: true, roles: ['ADMIN'] },
  { label: '서버 관리', path: RouteLink.ADMIN_SYSTEM, authRequired: true, roles: ['ADMIN'] },
  { label: 'API 관리', path: RouteLink.ADMIN_APIS, authRequired: true, roles: ['ADMIN'] },
];

// 하단 푸터 네비게이션 메뉴
export const FooterMenus: MenuType[] = [
  { label: '공지사항', path: RouteLink.NOTICE, authRequired: false },
  { label: 'FAQ', path: '/faq', authRequired: false },
  { label: '이용약관', path: '/terms', authRequired: false },
];
