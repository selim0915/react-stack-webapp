import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
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

const PostDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<Post | null>(null);

  useEffect(() => {
    if (id) {
      const foundPost = fakeData.posts.find(p => p.id.toString() === id);
      setPost(foundPost || null);
    }
  }, [id]);

  if (!post) {
    return (
      <div className="w-full py-20 text-center">
        <p className="text-[var(--ui-color-secondary)] mb-6">게시글을 찾을 수 없습니다.</p>
        <button 
          type="button"
          onClick={() => navigate(RouteLink.POSTS)}
          className="px-6 py-2 bg-[var(--ui-color-primary)] text-white rounded-lg hover:opacity-90 transition-opacity"
        >
          목록
        </button>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Header section */}
      <div className="border-b border-[var(--ui-color-border)] pb-6 mb-8">
        <h2 className="text-[20px] font-bold text-[var(--ui-color-text)] mb-4">{post.title}</h2>
        <div className="flex items-center justify-between text-sm text-[var(--ui-color-secondary)]">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 font-medium">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
              {post.author}
            </span>
            <span>{post.createdAt}</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
              </svg>
              {post.likes}
            </span>
            <span className="flex items-center gap-1 ml-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd"  d="M18 10c0 3.866-3.582 7-8 7a9.5 9.5 0 01-3.297-.585L3 17.5l.985-2.955A6.74 6.74 0 012 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM6 9a1 1 0 100 2 1 1 0 000-2zm4 0a1 1 0 100 2 1 1 0 000-2zm4 0a1 1 0 100 2 1 1 0 000-2z" clipRule="evenodd" />
              </svg>
              {post.comments}
            </span>
            <span className="flex items-center gap-1 ml-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
              </svg>
              {post.views}
            </span>
          </div>
        </div>
      </div>

      {/* Content section */}
      <div className="min-h-[300px] mb-12">
        {post.thumbnail && (
          <div className="mb-8 rounded-xl overflow-hidden bg-gray-100 flex justify-center">
            <img src={post.thumbnail} alt={post.title} className="max-h-[500px] object-contain" />
          </div>
        )}
        <div className="text-[var(--ui-color-text)] leading-loose whitespace-pre-wrap">
          {post.content}
        </div>
      </div>

      {/* Footer / Actions */}
      <div className="flex border-t border-[var(--ui-color-border)] pt-8">
        <button
          type="button"
          onClick={() => navigate(RouteLink.POSTS)}
          className="px-8 py-3 bg-[var(--ui-color-background)] border border-[var(--ui-color-border)] text-[var(--ui-color-text)] rounded-lg font-medium hover:bg-gray-50 transition-colors shadow-sm"
        >
          목록
        </button>
      </div>
    </div>
  );
};

export default PostDetail;

