import React, { useEffect, useRef, useState } from 'react';
import fakeData from '../../test/fakedata.json';

interface Post {
  id: number;
  title: string;
  content: string;
  author: string;
  createdAt: string;
  likes: number;
  comments: number;
  thumbnail: string | null;
}

const PostList: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  
  // 무한 스크롤용 감지 DOM 레퍼런스
  const loaderRef = useRef<HTMLDivElement>(null);
  
  const ITEMS_PER_PAGE = 10;
  const totalPosts = fakeData.posts.length;

  // 페이지가 바뀔 때마다 데이터 10개씩 추가 로드
  useEffect(() => {
    const startIndex = (page - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const newPosts = fakeData.posts.slice(startIndex, endIndex);
    
    if (newPosts.length > 0) {
      setPosts((prev) => {
        // 중복 데이터 방지 처리
        const existingIds = new Set(prev.map(p => p.id));
        const filteredNew = newPosts.filter(p => !existingIds.has(p.id));
        return [...prev, ...filteredNew];
      });
    }
    
    if (endIndex >= totalPosts) {
      setHasMore(false);
    }
  }, [page, totalPosts]);

  // 스크롤이 맨 바닥에 닿았는지 감지하는 Intersection Observer
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
      {/* 리스트 개수 헤더 */}
      <div className="mb-6">
        <span className="text-sm text-[var(--ui-color-secondary)]">
          총 게시글 <strong className="text-[var(--ui-color-primary)]">{totalPosts}</strong>개
        </span>
      </div>

      {/* 게시글 리스트 */}
      <div className="flex flex-col border-t border-t-[var(--ui-color-border)]">
        {posts.map((post) => (
          <div 
            key={post.id} 
            className="py-6 border-b border-b-[var(--ui-color-border)] flex gap-6 hover:bg-gray-50 cursor-pointer transition-colors"
          >
            {/* 왼쪽: 텍스트 영역 */}
            <div className="flex-1 flex flex-col justify-center">
              <h4 className="text-[18px] font-bold text-[var(--ui-color-text)] mb-2">
                {post.title}
              </h4>
              <p className="text-[14px] text-[var(--ui-color-secondary)] mb-4 line-clamp-2 leading-relaxed">
                {post.content}
              </p>
              
              <div className="text-[13px] text-gray-400 flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                  <span>{post.author}</span>
                </div>
                <div className="flex items-center gap-1">
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd"  d="M18 10c0 3.866-3.582 7-8 7a9.5 9.5 0 01-3.297-.585L3 17.5l.985-2.955A6.74 6.74 0 012 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM6 9a1 1 0 100 2 1 1 0 000-2zm4 0a1 1 0 100 2 1 1 0 000-2zm4 0a1 1 0 100 2 1 1 0 000-2z" clipRule="evenodd" />
                  </svg>
                  <span>{post.comments}</span>
                </div>
                <div className="flex items-center gap-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                  </svg>
                  <span>{post.likes}</span>
                </div>
                <div className="flex items-center gap-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                  </svg>
                  <span>{post.createdAt}</span>
                </div>
              </div>

            </div>
            
            {/* 오른쪽: 이미지 영역 (썸네일이 있을 경우에만 노출) */}
            {post.thumbnail && (
              <div className="w-[160px] h-[100px] flex-shrink-0 overflow-hidden rounded-lg">
                <img src={post.thumbnail} alt={post.title} className="w-full h-full object-cover" />
              </div>
            )}
          </div>
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
