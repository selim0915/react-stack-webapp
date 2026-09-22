import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { RouteLink } from '../../routes/routes';
import { Button, Form, Input, Textarea } from '../../components/commons';
import { UserRole } from '../../constants/app.config';
import useAuth from '../../hooks/useAuth';
import { formatDate } from '../../utils/format';

interface Notice {
  id: number;
  title: string;
  content: string;
  author: string;
  createdAt: string;
}

const NoticeForm: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { userId, userRole } = useAuth();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    if (id) {
      setIsEdit(true);
      const savedPosts = localStorage.getItem('notice_notices');
      if (savedPosts) {
        const notices = JSON.parse(savedPosts);
        const notice = notices.find((p: Notice) => p.id === Number(id));
        if (notice) {
          if (userId !== notice.author && userRole !== UserRole.ADMIN) {
            alert('권한이 없습니다.');
            navigate(RouteLink.NOTICE);
            return;
          }
          setTitle(notice.title);
          setContent(notice.content);
        }
      }
    } else {
      setIsEdit(false);
      setTitle('');
      setContent('');
    }
  }, [id, userId, userRole, navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content) return;

    const savedPosts = localStorage.getItem('notice_notices');
    const notices = savedPosts ? JSON.parse(savedPosts) : [];

    if (isEdit) {
      const updatedPosts = notices.map((p: Notice) => (p.id === Number(id) ? { ...p, title, content } : p));
      localStorage.setItem('notice_notices', JSON.stringify(updatedPosts));
      navigate(RouteLink.NOTICE_DETAIL.replace(':id', id || ''));
    } else {
      const newPost = {
        id: notices.length > 0 ? Math.max(...notices.map((p: any) => p.id)) + 1 : 1,
        title,
        content,
        author: userId || '익명',
        createdAt: formatDate(new Date()),
      };
      const updatedPosts = [newPost, ...notices];
      localStorage.setItem('notice_notices', JSON.stringify(updatedPosts));
      navigate(RouteLink.NOTICE);
    }
  };

  return (
    <div>
      <h3 className="text-2xl font-bold text-gray-800 mb-6">공지사항 {isEdit ? '수정' : '등록'}</h3>

      <Form onSubmit={handleSubmit} style={{ marginTop: '30px' }}>
        <Input placeholder="제목을 입력하세요" value={title} onChange={(e) => setTitle(e.target.value)} required />
        <Textarea
          placeholder="내용을 입력하세요"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />

        <div
          style={{ marginTop: '40px', display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '10px' }}
        >
          <Button
            type="button"
            onClick={() =>
              isEdit ? navigate(RouteLink.NOTICE_DETAIL.replace(':id', id || '')) : navigate(RouteLink.NOTICE)
            }
            style={{ width: 'auto', padding: '10px 24px', backgroundColor: '#86868b' }}
          >
            취소
          </Button>
          <Button type="submit" style={{ width: 'auto', padding: '10px 24px' }}>
            저장
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default NoticeForm;
