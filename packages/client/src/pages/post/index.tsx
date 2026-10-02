import React from 'react';
import { Outlet } from 'react-router-dom';

const PostLayout: React.FC = () => (
    <div className="flex w-full gap-8 justify-between">
      {/* 메인 콘텐츠 */}
      <div className="flex-1 min-w-0">
        <Outlet />
      </div>

      {/* 사이드 배너 */}
      <div className="w-[200px] flex-shrink-0">
        <div className="sticky top-10 w-full h-[300px] bg-[#E2E4E9]" />
      </div>
    </div>
  );

export default PostLayout;
