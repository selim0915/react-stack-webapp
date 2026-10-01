import React from 'react';
import { useNavigate } from 'react-router-dom';
import { logo } from '../../assets';
import useAuth from '../../hooks/useAuth';
import { RouteLink } from '../../routes/routes';
import Nav from './Nav';
import SubNav from './SubNav';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();

  return (
    <header className="sticky top-0 z-50 w-full bg-[var(--ui-color-background)] font-sans flex flex-col">
      {/* Main Header Container */}
      <div className="border-b border-[var(--ui-color-border)] h-[var(--header-height)] flex items-center relative">
        <div className="max-w-[var(--content-width)] mx-auto w-full px-8 flex justify-between items-center h-full">
          
          {/* Left Side: Logo & Navigation */}
          <div className="flex items-center gap-10 h-full">
            <button 
              type="button"
              onClick={() => navigate(RouteLink.MAIN)} 
              className="cursor-pointer flex items-center bg-transparent border-none p-0 hover:opacity-80 transition-opacity"
            >
              <img src={logo} alt="Logo" className="w-[100px] object-contain" />
            </button>

            {/* Nav Component separated as requested */}
            <Nav />
          </div>

          {/* Right Side: Utils & Auth */}
          <div className="flex items-center gap-6">
            {isLoggedIn ? (
              <>
                <select 
                  className="text-[14px] font-medium text-[var(--ui-color-secondary)] bg-transparent border border-[var(--ui-color-border)] rounded-md px-2 py-1 outline-none cursor-pointer hover:border-[var(--ui-color-secondary)] transition-colors"
                  defaultValue="ko"
                >
                  <option value="ko">한국어 (KO)</option>
                  <option value="en">English (EN)</option>
                </select>
                <button 
                  type="button"
                  onClick={() => navigate(RouteLink.MYPAGE)} 
                  className="text-[15px] font-medium text-[var(--ui-color-secondary)] hover:text-[var(--ui-color-text)] transition-colors cursor-pointer bg-transparent border-none p-0"
                >
                  마이페이지
                </button>
                
                <button 
                  type="button"
                  onClick={() => navigate(RouteLink.NOTIFICATIONS)}
                  className="text-[15px] font-medium text-[var(--ui-color-secondary)] hover:text-[var(--ui-color-text)] transition-colors cursor-pointer flex items-center gap-1 bg-transparent border-none p-0"
                >
                  알림
                </button>
              </>
            ) : (
              <>
                <button 
                  type="button"
                  onClick={() => navigate(RouteLink.LOGIN)} 
                  className="text-[14px] font-semibold text-[var(--ui-color-background)] bg-[var(--ui-color-primary)] hover:opacity-90 transition-opacity cursor-pointer border-none rounded-full px-5 py-2"
                >
                  로그인
                </button>
                <select 
                  className="text-[14px] font-medium text-[var(--ui-color-secondary)] bg-transparent border border-[var(--ui-color-border)] rounded-md px-2 py-1 outline-none cursor-pointer hover:border-[var(--ui-color-secondary)] transition-colors"
                  defaultValue="ko"
                >
                  <option value="ko">한국어 (KO)</option>
                  <option value="en">English (EN)</option>
                </select>
              </>
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
