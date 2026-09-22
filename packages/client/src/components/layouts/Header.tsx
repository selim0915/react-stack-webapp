import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ko as WordKey } from '../../locales';
import { RouteLink } from '../../routes/routes';
import { sampeople } from '../../utils/images';

const Header: React.FC = () => {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-sm bg-[#fafafa] border-b border-[#f1f3f5] h-[72px] flex items-center font-sans">
      <div className="max-w-7xl mx-auto w-full px-8 flex justify-between items-center">
        
        {/* 왼쪽 로고 영역 */}
        <button 
          type="button"
          onClick={() => navigate(RouteLink.MAIN)} 
          className="cursor-pointer flex items-center transition-opacity hover:opacity-80 bg-transparent border-none p-0"
        >
          <img src={sampeople} alt="Logo" className="h-8 object-contain" width={100} />
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
          
          <button 
            type="button"
            onClick={() => navigate(RouteLink.SCHEDULE)} 
            className="text-[15px] font-medium text-[#495057] hover:text-[#212529] transition-colors cursor-pointer bg-transparent border-none p-0"
          >
            마이페이지
          </button>
          
          <button 
            type="button"
            onClick={() => navigate('/notifications')}
            className="text-[15px] font-medium text-[#495057] hover:text-[#212529] transition-colors cursor-pointer flex items-center gap-1 bg-transparent border-none p-0"
          >
            알림
          </button>
        </div>
        
      </div>
    </header>
  );
};

export default Header;
