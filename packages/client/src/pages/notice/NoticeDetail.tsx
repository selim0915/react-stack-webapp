import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '../../components/commons';
import { UserRole } from '../../constants/app.config';
import useAuth from '../../hooks/useAuth';
import { RouteLink } from '../../routes/routes';

interface Notice {
  id: number;
  title: string;
  content: string;
  author: string;
  createdAt: string;
}

const NoticeDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { userId, userRole } = useAuth();
  const [post, setPost] = useState<Notice | null>(null);

  useEffect(() => {
    const savedPosts = localStorage.getItem('notice_notices');
    if (savedPosts) {
      const notices = JSON.parse(savedPosts);
      const foundPost = notices.find((p: Notice) => p.id === Number(id));
      if (foundPost) {
        setPost(foundPost);
      } else {
        alert('존재하지 않는 게시글입니다.');
        navigate(RouteLink.NOTICE);
      }
    }
  }, [id, navigate]);

  const handleDelete = () => {
    if (!window.confirm('정말 삭제하시겠습니까?')) return;

    const savedPosts = localStorage.getItem('notice_notices');
    if (savedPosts) {
      const notices = JSON.parse(savedPosts);
      const updatedPosts = notices.filter((p: Notice) => p.id !== Number(id));
      localStorage.setItem('notice_notices', JSON.stringify(updatedPosts));
      navigate(RouteLink.NOTICE);
    }
  };

  if (!notice) return <div>Loading...</div>;

  return (
    <div>
      <h3 className="text-2xl font-bold text-gray-800 mb-6">공지사항 상세보기</h3>

      <div style={{ borderBottom: '1px solid #eee', paddingBottom: '20px', marginBottom: '20px', marginTop: '30px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: '600' }}>{notice.title}</h2>
        <div style={{ marginTop: '10px', color: '#86868b', fontSize: '14px' }}>
          작성자 {notice.author} | 작성일 {notice.createdAt}
        </div>
      </div>

      <div style={{ minHeight: '300px', whiteSpace: 'pre-wrap', lineHeight: '1.6' }}>{notice.content}</div>

      <div
        style={{ marginTop: '40px', display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '10px' }}
      >
        <Button
          onClick={() => navigate(RouteLink.NOTICE)}
          style={{ width: 'auto', padding: '10px 24px', backgroundColor: '#86868b' }}
        >
          목록
        </Button>

        {(userId === notice.author || userRole === UserRole.ADMIN) && (
          <div style={{ display: 'flex', gap: '10px' }}>
            <Button
              onClick={() => navigate(RouteLink.NOTICE_EDIT.replace(':id', notice.id.toString()))}
              style={{ width: 'auto', padding: '10px 24px', backgroundColor: '#0071e3' }}
            >
              수정
            </Button>
            <Button onClick={handleDelete} style={{ width: 'auto', padding: '10px 24px', backgroundColor: '#ff3b30' }}>
              삭제
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default NoticeDetail;
