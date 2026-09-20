import React from 'react';
import { useNavigate } from 'react-router-dom';
import { WordKey } from '../../constants/messages';
import useAuth from '../../hooks/useAuth';
import { RouteLink } from '../../routes/routes';

const Header: React.FC = () => {
  const { userId, logout: authLogout } = useAuth();
  const navigate = useNavigate();

  const logout = () => {
    authLogout(() => {
      navigate(RouteLink.MAIN);
    });
  };

  return (
    <header className="sticky top-0 z-50 w-full h-[60px] px-6 box-border flex justify-between items-center bg-white/70 border-b border-black/5 font-sans">
      <a 
        onClick={() => navigate(RouteLink.MAIN)} 
        className="text-[20px] font-bold tracking-[-0.5px] text-[#1d1d1f] no-underline transition-opacity duration-200 ease-in hover:opacity-70 cursor-pointer"
      >
        {WordKey.PROJECT_NAME}
      </a>

      <div className="flex items-center gap-6">
        {userId ? (
          <>
            <span className="text-[13px] font-normal text-[#86868b]">{userId}님</span>
            <a 
              onClick={() => navigate(RouteLink.SCHEDULE)} 
              className="text-[13px] font-medium text-[#424245] no-underline cursor-pointer transition-colors duration-200 hover:text-blue-600"
            >마이페이지</a>
            <a 
              onClick={logout} 
              className="text-[13px] font-medium text-[#424245] no-underline cursor-pointer transition-colors duration-200 hover:text-blue-600"
            >로그아웃</a>
          </>
        ) : (
          <a 
            onClick={() => navigate(RouteLink.LOGIN)} 
            className="text-[13px] font-medium text-[#424245] no-underline cursor-pointer transition-colors duration-200 hover:text-blue-600"
          >로그인</a>
        )}
      </div>
    </header>
  );
};

export default Header;
