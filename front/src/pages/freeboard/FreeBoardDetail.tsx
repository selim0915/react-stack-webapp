/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable no-shadow */
import { useQuery } from '@tanstack/react-query';
import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import APIs from '../../apis';
import { Button, Title } from '../../components/commons';
import { useAppDispatch } from '../../store/hooks';
import { makeRead } from '../../store/slices/newsSlice';
import { NewsComment } from '../../types/newFeed.type';

const Comment: React.FC<{ comment: NewsComment }> = ({ comment }) => (
  <div style={{ paddingLeft: `${comment.level * 40}px`, marginTop: '16px' }}>
    <div style={{ color: '#86868b', fontSize: '14px', marginBottom: '8px' }}>
      <strong>{comment.user}</strong> · {comment.time_ago}
    </div>
    <div
      style={{
        padding: '16px',
        backgroundColor: '#f5f5f7',
        borderRadius: '12px',
        fontSize: '15px',
        lineHeight: '1.6',
        color: '#1d1d1f',
      }}
      dangerouslySetInnerHTML={{ __html: comment.content }}
    />
    {comment.comments.length > 0 && (
      <div style={{ marginTop: '10px' }}>
        {comment.comments.map((child) => (
          <Comment key={child.id} comment={child} />
        ))}
      </div>
    )}
  </div>
);

const FreeBoardDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { data } = useQuery({
    queryKey: ['freeboard', 'detail', id],
    queryFn: async () => {
      if (!id) throw new Error('No ID');
      const api = new APIs.Freeboard.NewsDetailApi(id);
      return api.getData();
    },
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  });

  const { title = '', content = '', comments = [] } = data || {};

  useEffect(() => {
    if (id && data) {
      dispatch(makeRead(Number(id)));
    }
  }, [id, data, dispatch]);

  return (
    <div>
      <Title>자유게시판 상세보기</Title>

      <div style={{ borderBottom: '1px solid #eee', paddingBottom: '20px', marginBottom: '20px', marginTop: '30px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: '600', color: '#1d1d1f' }}>{title}</h2>
      </div>

      <div
        style={{
          minHeight: '100px',
          lineHeight: '1.8',
          fontSize: '16px',
          color: '#1d1d1f',
          padding: '20px 0',
        }}
        dangerouslySetInnerHTML={{ __html: content }}
      />

      <div style={{ marginTop: '40px', borderTop: '1px solid #eee', paddingTop: '30px' }}>
        <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '20px' }}>댓글 {comments.length}개</h3>
        {comments.map((comment) => (
          <Comment key={comment.id} comment={comment} />
        ))}
      </div>

      <div style={{ marginTop: '40px', display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          onClick={() => navigate(-1)}
          style={{ width: 'auto', padding: '10px 24px', backgroundColor: '#86868b' }}
        >
          목록
        </Button>
      </div>
    </div>
  );
};

export default FreeBoardDetail;
