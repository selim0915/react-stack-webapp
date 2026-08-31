import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import APIs from '../../apis';
import { Button, Title } from '../../components/commons';
import { RouteLink } from '../../routes/routes';
import { NewsFeed } from '../../types/newFeed.type';

export const FreeBoardList: React.FC = () => {
  const { page = '1' } = useParams();
  const currentPage = Number(page);
  const navigate = useNavigate();

  const { data: feeds = [] } = useQuery({
    queryKey: ['freeboard', 'list'],
    queryFn: async () => {
      const api = new APIs.Freeboard.NewsFeedApi();
      const data = await api.getData();
      // Add 'read' property as it was done previously
      return data.map((feed: NewsFeed) => ({ ...feed, read: false }));
    },
    staleTime: 5 * 60 * 1000,
  });

  const itemsPerPage = 10;
  const start = (currentPage - 1) * itemsPerPage;
  const end = currentPage * itemsPerPage;
  const currentFeeds = feeds.slice(start, end);

  const lastPage = Math.ceil(feeds.length / itemsPerPage) || 1;
  const prevPage = currentPage > 1 ? currentPage - 1 : 1;
  const nextPage = currentPage < lastPage ? currentPage + 1 : lastPage;

  const renderFeeds = () =>
    currentFeeds.map((feed) => (
      <div
        key={feed.id}
        style={{
          padding: '20px',
          borderRadius: '12px',
          backgroundColor: feed.read ? '#fff5f5' : '#fff',
          border: '1px solid #eee',
          marginBottom: '12px',
          transition: 'all 0.3s',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ flex: 1 }}>
            <Link
              to={RouteLink.FREE_BOARD_DETAIL.replace(':id', feed.id.toString())}
              style={{
                fontSize: '18px',
                fontWeight: '500',
                color: '#1d1d1f',
                textDecoration: 'none',
              }}
            >
              {feed.title}
            </Link>
          </div>
          <div
            style={{
              padding: '4px 12px',
              backgroundColor: '#e3f2fd',
              color: '#0071e3',
              borderRadius: '20px',
              fontSize: '14px',
              fontWeight: 'bold',
            }}
          >
            {feed.comments_count} comments
          </div>
        </div>
        <div style={{ display: 'flex', gap: '20px', marginTop: '12px', fontSize: '14px', color: '#86868b' }}>
          <span>
            <i className="fas fa-user" style={{ marginRight: '6px' }} />
            {feed.user}
          </span>
          <span>
            <i className="fas fa-heart" style={{ marginRight: '6px' }} />
            {feed.points} pts
          </span>
          <span>
            <i className="far fa-clock" style={{ marginRight: '6px' }} />
            {feed.time_ago}
          </span>
        </div>
      </div>
    ));

  return (
    <div>
      <Title>자유게시판 목록</Title>

      <div style={{ marginBottom: '20px' }}>
        <div style={{ marginTop: '10px', fontSize: '14px', color: '#666' }}>
          총 게시글 <span style={{ color: '#0071e3', fontWeight: 'bold' }}>{feeds.length}</span>개
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column' }}>{renderFeeds()}</div>

      {/* Pagination */}
      <div
        style={{
          marginTop: '30px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'relative',
          minHeight: '40px',
        }}
      >
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <Button
            type='button'
            onClick={() => navigate(RouteLink.FREE_BOARD.replace(':page', prevPage.toString()))}
            disabled={currentPage === 1}
            style={{
              padding: '0 12px',
              height: '32px',
              border: '1px solid #d2d2d7',
              borderRadius: '4px',
              backgroundColor: 'white',
              color: currentPage === 1 ? '#d2d2d7' : '#1d1d1f',
              cursor: currentPage === 1 ? 'default' : 'pointer',
              fontSize: '14px',
            }}
          >
            이전
          </Button>

          {Array.from({ length: lastPage }, (_, i) => (
            <Button
              type='button'
              key={i + 1}
              onClick={() => navigate(RouteLink.FREE_BOARD.replace(':page', (i + 1).toString()))}
              style={{
                width: '32px',
                height: '32px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '1px solid #d2d2d7',
                borderRadius: '4px',
                backgroundColor: currentPage === i + 1 ? '#0071e3' : 'white',
                color: currentPage === i + 1 ? 'white' : '#1d1d1f',
                cursor: 'pointer',
                fontSize: '14px',
                transition: 'all 0.2s',
              }}
            >
              {i + 1}
            </Button>
          ))}

          <Button
            type='button'
            onClick={() => navigate(RouteLink.FREE_BOARD.replace(':page', nextPage.toString()))}
            disabled={currentPage === lastPage}
            style={{
              padding: '0 12px',
              height: '32px',
              border: '1px solid #d2d2d7',
              borderRadius: '4px',
              backgroundColor: 'white',
              color: currentPage === lastPage ? '#d2d2d7' : '#1d1d1f',
              cursor: currentPage === lastPage ? 'default' : 'pointer',
              fontSize: '14px',
            }}
          >
            다음
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FreeBoardList;
