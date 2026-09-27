import React from 'react';
import { useLocation, matchPath } from 'react-router-dom';
import { RouteLink } from '../../routes/routes';

const getPageTitle = (pathname: string): string | null => {
  if (matchPath({ path: RouteLink.NEWS }, pathname)) return '뉴스';
  if (matchPath({ path: RouteLink.POSTS }, pathname)) return '게시글';
  if (matchPath({ path: RouteLink.SOCIAL }, pathname)) return '소셜 목록';
  if (matchPath({ path: RouteLink.SOCIAL_DETAIL }, pathname)) return '소셜 상세';
  if (matchPath({ path: RouteLink.TOOLS }, pathname)) return '미니 도구';
  if (matchPath({ path: RouteLink.TOOLS_ROULETTE }, pathname)) return '룰렛';
  if (matchPath({ path: RouteLink.TOOLS_SETTLEMENT }, pathname)) return '정산하기';
  if (matchPath({ path: RouteLink.TOOLS_COUNTDOWN }, pathname)) return '카운트다운';
  if (matchPath({ path: RouteLink.TOOLS_MAP }, pathname)) return '주변조회(지도)';
  if (matchPath({ path: RouteLink.CHAT }, pathname)) return '채팅';
  if (matchPath({ path: RouteLink.NOTICE }, pathname)) return '공지사항 목록';
  if (matchPath({ path: RouteLink.NOTICE_DETAIL }, pathname)) return '공지사항 상세';
  if (matchPath({ path: RouteLink.NOTICE_WRITE }, pathname)) return '공지사항 작성';
  if (matchPath({ path: RouteLink.NOTICE_EDIT }, pathname)) return '공지사항 수정';
  if (matchPath({ path: RouteLink.FAQ }, pathname)) return 'FAQ';
  if (matchPath({ path: RouteLink.TERMS }, pathname)) return '이용약관';
  if (matchPath({ path: RouteLink.MYPAGE }, pathname)) return '마이페이지';
  if (matchPath({ path: RouteLink.NOTIFICATIONS }, pathname)) return '알림';
  
  return null;
};

export const PageTitle: React.FC = () => {
  const location = useLocation();
  const title = getPageTitle(location.pathname);

  if (!title) return null;

  return (
    <h3 className="text-2xl font-bold text-gray-800 mb-6">{title}</h3>
  );
};
