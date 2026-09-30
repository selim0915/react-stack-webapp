import React from 'react';

export const ComingSoon: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center flex-1 h-full text-center w-full min-h-[400px]">
      <div className="w-36 h-36 bg-[#eeeeee] rounded-full flex items-center justify-center mb-10">
        <i className="fas fa-tools text-[70px] text-white"></i>
      </div>
      
      <h2 className="text-[32px] font-bold text-[#666666] mb-5 tracking-tight">
        페이지 준비중입니다
      </h2>
      
      <p className="text-[#888888] text-[16px] leading-relaxed mb-10">
        해당 페이지는 현재 업데이트 준비중입니다.<br />
        빠른 시일내에 찾아뵙겠습니다.
      </p>
    </div>
  );
};
