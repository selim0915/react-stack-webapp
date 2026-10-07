import React from 'react';
import { useNavigate } from 'react-router-dom';
import { logo } from '../../assets';
import useAuth from '../../hooks/useAuth';
import { RouteLink } from '../../routes/routes';
import Nav from './Nav';
import SubNav from './SubNav';
import './header.css'; // 새로 생성한 CSS 파일 임포트

const Header: React.FC = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();

  return (
    <header className="sticky top-0 z-50 w-full bg-[var(--ui-color-background)] font-sans flex flex-col">
      <div className="border-b border-[var(--ui-color-border)] min-h-[var(--header-height)] flex items-center relative">
        <div className="header-custom-grid">
          
          {/* 1. Logo */}
          <button 
            type="button"
            onClick={() => navigate(RouteLink.MAIN)} 
            className="header-custom-logo cursor-pointer flex items-center bg-transparent border-none p-0 hover:opacity-80 transition-opacity"
          >
            <img src={logo} alt="Logo" className="w-[100px] object-contain" />
          </button>

          {/* 2. Navigation */}
          <div className="header-custom-nav">
            <Nav />
          </div>

          {/* 3. Utils & Auth */}
          <div className="header-custom-utils">
            <select 
              className="text-[12px] md:text-[14px] font-medium text-[var(--ui-color-secondary)] bg-transparent border border-[var(--ui-color-border)] rounded-md px-1 md:px-2 py-1 outline-none cursor-pointer hover:border-[var(--ui-color-secondary)] transition-colors"
              defaultValue="ko"
            >
              <option value="ko">한국어</option>
              <option value="en">English</option>
            </select>

            {isLoggedIn ? (
              <>
                <button 
                  type="button"
                  onClick={() => navigate(RouteLink.MYPAGE)} 
                  className="text-[var(--ui-color-secondary)] hover:text-[var(--ui-color-text)] transition-colors cursor-pointer bg-transparent border-none p-1 rounded-full hover:bg-gray-100 flex items-center justify-center"
                  aria-label="마이페이지"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 md:w-6 md:h-6">
                    <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z" clipRule="evenodd" />
                  </svg>
                </button>
                
                <button 
                  type="button"
                  onClick={() => navigate(RouteLink.NOTIFICATIONS)}
                  className="text-[var(--ui-color-secondary)] hover:text-[var(--ui-color-text)] transition-colors cursor-pointer bg-transparent border-none p-1 rounded-full hover:bg-gray-100 flex items-center justify-center"
                  aria-label="알림"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 md:w-6 md:h-6">
                    <path fillRule="evenodd" d="M5.25 9a6.75 6.75 0 0 1 13.5 0v.75c0 2.123.8 4.057 2.118 5.52a.75.75 0 0 1-.297 1.206c-1.544.57-3.16.99-4.831 1.243a3.75 3.75 0 1 1-7.48 0 24.585 24.585 0 0 1-4.831-1.244.75.75 0 0 1-.298-1.205A8.217 8.217 0 0 0 5.25 9.75V9Zm4.502 8.9a2.25 2.25 0 1 0 4.496 0 25.057 25.057 0 0 1-4.496 0Z" clipRule="evenodd" />
                  </svg>
                </button>
              </>
            ) : (
              <button 
                type="button"
                onClick={() => navigate(RouteLink.LOGIN)} 
                className="text-[12px] md:text-[14px] font-semibold text-[var(--ui-color-background)] bg-[var(--ui-color-primary)] hover:opacity-90 transition-opacity cursor-pointer border-none rounded-full px-4 md:px-5 py-1.5 md:py-2"
              >
                로그인
              </button>
            )}
          </div>
          
        </div>
      </div>
      
      {/* Sub Menu Container - Now part of document flow */}
      <SubNav />
    </header>
  );
};

export default Header;
