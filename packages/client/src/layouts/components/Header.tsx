import React from 'react';
import { useNavigate } from 'react-router-dom';
import { RouteLink } from '../../routes/routes';
import { logo } from '../../assets';
import useAuth from '../../hooks/useAuth';
import Nav from './Nav';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-sm bg-[#fafafa] border-b border-[#e4e8eb] h-[var(--header-height)] flex items-center font-sans">
      <div className="max-w-[var(--content-width)] mx-auto w-full px-8 flex justify-between items-center">
        
        {/* 왼쪽 로고 영역 */}
        <button 
          type="button"
          onClick={() => navigate(RouteLink.MAIN)} 
          className="cursor-pointer flex items-center transition-opacity hover:opacity-80 bg-transparent border-none p-0"
        >
        </button>

        {/* 오른쪽 텍스트 메뉴 영역 */}
        <div className="flex items-center gap-8">
          {/* 다국어 설정 셀렉트 박스 */}
          <select 
            className="text-[14px] font-medium text-[#495057] bg-transparent border border-[#e9ecef] rounded-md px-2 py-1 outline-none cursor-pointer hover:border-[#ced4da] transition-colors"
            defaultValue="ko"
          >
            <option value="ko">한국어 (KO)</option>
            <option value="en">English (EN)</option>
          </select>
          
          {isLoggedIn ? (
            <>
              <button 
                type="button"
                onClick={() => navigate(RouteLink.MYPAGE)} 
                className="text-[15px] font-medium text-[#495057] hover:text-[#212529] transition-colors cursor-pointer bg-transparent border-none p-0"
              >
                마이페이지
              </button>
              
              <button 
                type="button"
                onClick={() => navigate(RouteLink.NOTIFICATIONS)}
                className="text-[15px] font-medium text-[#495057] hover:text-[#212529] transition-colors cursor-pointer flex items-center gap-1 bg-transparent border-none p-0"
              >
                알림
              </button>
            </>
          ) : (
            <button 
              type="button"
              onClick={() => navigate(RouteLink.LOGIN)} 
              className="text-[14px] font-semibold text-white bg-[#0071e3] hover:bg-[#0077ED] transition-colors cursor-pointer border-none rounded-full px-5 py-2"
            >
              로그인
              <img src={logo} alt="Logo" className="w-[100px] object-contain" />
            </button>
          )}
        </div>
        
      </div>
    </header>
  );
};

export default Header;


