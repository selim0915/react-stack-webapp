import React from 'react';
import { Link } from 'react-router-dom';
import { getFooterMenus } from '../../utils/menus';

const Footer: React.FC = () => {
  const footerMenus = getFooterMenus();

  return (
    <footer className="w-full bg-[#fafafa] border-t border-[#e4e8eb] py-8 mt-auto">
      <div className="max-w-[var(--content-width)] mx-auto px-8 flex flex-wrap justify-center items-center gap-x-2 gap-y-4 text-[13px] text-[#424242]">
        {footerMenus.map((menu, index) => (
          <React.Fragment key={menu.path}>
            <Link 
              to={menu.path} 
              target="_blank"
              rel="noopener noreferrer"
              className={`hover:underline cursor-pointer ${menu.label === '개인정보처리방침' ? 'font-bold text-[#1e1e23]' : ''}`}
            >
              {menu.label}
            </Link>
            {index < footerMenus.length - 1 && (
              <span className="text-[#d7dce0] mx-1 text-[11px]">|</span>
            )}
          </React.Fragment>
        ))}
        
        {/* 카피라이트 영역 */}
        <div className="text-[13px] font-bold text-[#1e1e23] ml-4">
          ⓒ 2026 Woo. Corp.
        </div>
      </div>
    </footer>
  );
};

export default Footer;



