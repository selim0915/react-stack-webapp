import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import RouteLink from '../../routes/routes';
import fakeData from '../../test/fakedata.json';

interface Post {
  id: number;
  title: string;
  content: string;
  author: string;
  createdAt: string;
  likes: number;
  comments: number;
  views: number;
  thumbnail: string | null;
}

const PostList: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  
  const loaderRef = useRef<HTMLDivElement>(null);
  
  const ITEMS_PER_PAGE = 10;
  const totalPosts = fakeData.posts.length;

  useEffect(() => {
    const startIndex = (page - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const newPosts = fakeData.posts.slice(startIndex, endIndex);
    
    if (newPosts.length > 0) {
      setPosts((prev) => {
        const existingIds = new Set(prev.map(p => p.id));
        const filteredNew = newPosts.filter(p => !existingIds.has(p.id));
        return [...prev, ...filteredNew];
      });
    }
    
    if (endIndex >= totalPosts) {
      setHasMore(false);
    }
  }, [page, totalPosts]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prev) => prev + 1);
        }
      },
      { threshold: 1.0 }
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => observer.disconnect();
  }, [hasMore]);

  return (
    <div className="w-full pb-20">
      {/* 헤더 타이틀 */}
      <div className="mb-6">
        <p className="text-[13px] text-gray-500">
          총 게시글 <strong className="text-[var(--ui-color-primary)]">{totalPosts}</strong>개
        </p>
      </div>

      {/* 게시글 리스트 */}
      <div className="flex flex-col border-t border-[var(--ui-color-border)]">
        {posts.map((post) => (
          <Link 
            key={post.id} 
            to={RouteLink.POST_DETAIL.replace(':id', post.id.toString())}
            className="py-4 sm:py-6 border-b border-[var(--ui-color-border)] flex gap-3 sm:gap-6 hover:bg-gray-50 cursor-pointer transition-colors outline-none"
          >
            {/* 왼쪽: 텍스트 영역 */}
            <div className="flex-1 flex flex-col justify-center min-w-0">
              <h4 className="text-[16px] sm:text-[18px] font-bold text-[var(--ui-color-text)] mb-1 sm:mb-2 truncate">
                {post.title}
              </h4>
              <p className="text-[13px] sm:text-[14px] text-[var(--ui-color-secondary)] mb-2 sm:mb-4 line-clamp-2 leading-relaxed break-keep">
                {post.content}
              </p>
              
              <div className="text-[11px] sm:text-[12px] text-[#9CA3AF] flex flex-wrap items-center gap-x-3 gap-y-1">
                <div className="flex items-center gap-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                  <span>{post.author}</span>
                </div>
                
                <div className="flex items-center gap-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
                  </svg>
                  <span>{post.comments}</span>
                </div>

                <div className="flex items-center gap-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                  </svg>
                  <span>{post.likes}</span>
                </div>

                <div className="flex items-center gap-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                  </svg>
                  <span>{post.createdAt}</span>
                </div>

                <div className="flex items-center gap-1 hidden sm:flex">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                    <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                  </svg>
                  <span>{post.views}</span>
                </div>
              </div>
            </div>
            
            {/* 오른쪽: 이미지 영역 */}
            {post.thumbnail && (
              <div className="w-[80px] h-[60px] sm:w-[140px] sm:h-[90px] flex-shrink-0 overflow-hidden rounded-lg mt-1 sm:mt-0">
                <img src={post.thumbnail} alt={post.title} className="w-full h-full object-cover" />
              </div>
            )}
          </Link>
        ))}
      </div>
      
      {/* 무한 스크롤 트리거 로더 */}
      {hasMore && (
        <div ref={loaderRef} className="py-10 text-center text-[var(--ui-color-secondary)] text-sm font-medium">
          게시글을 불러오는 중입니다...
        </div>
      )}
    </div>
  );
};

export default PostList;
