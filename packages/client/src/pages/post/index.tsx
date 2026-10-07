import React from 'react';
import { Outlet } from 'react-router-dom';

const PostLayout: React.FC = () => (
    <div className="flex flex-col md:flex-row w-full gap-8 justify-between">
      {/* 메인 콘텐츠 (모바일에서는 아래, 데스크탑에서는 왼쪽) */}
      <div className="flex-1 min-w-0 order-2 md:order-1">
        <Outlet />
      </div>

      {/* 사이드 배너 (모바일에서는 위, 데스크탑에서는 오른쪽) */}
      <div className="w-full md:w-[200px] flex-shrink-0 order-1 md:order-2">
        <div className="sticky top-10 w-full h-[150px] md:h-[300px] bg-[#E2E4E9] rounded-md md:rounded-none" />
      </div>
    </div>
  );

export default PostLayout;
