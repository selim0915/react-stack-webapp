import React from 'react';

const ComingSoon: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center py-32 text-center w-full">
      {/* 둥근 배경과 아이콘 */}
      <div className="w-36 h-36 bg-[#eeeeee] rounded-full flex items-center justify-center mb-10">
        <i className="fas fa-tools text-[70px] text-white"></i>
      </div>
      
      {/* 큰 제목 */}
      <h2 className="text-[32px] font-bold text-[#666666] mb-5 tracking-tight">
        페이지 준비중입니다
      </h2>
      
      {/* 안내 문구 */}
      <p className="text-[#888888] text-[16px] leading-relaxed">
        본 페이지는 현재 업데이트 준비중에 있습니다.<br />
        빠른 시일내에 찾아뵙겠습니다.
      </p>
    </div>
  );
};

export default ComingSoon;
