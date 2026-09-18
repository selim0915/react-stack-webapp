import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Table, TH, Title } from '../../components/commons';
import { RouteLink } from '../../routes/routes';
import { formatDate } from '../../utils/format';

interface Post {
  id: number;
  title: string;
  author: string;
  createdAt: string;
}

const NoticeList: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const navigate = useNavigate();

  useEffect(() => {
    const savedPosts = localStorage.getItem('board_posts');
    if (savedPosts) {
      setPosts(JSON.parse(savedPosts));
    } else {
      // Dummy data
      const dummyPosts = Array.from({ length: 25 }, (_, i) => ({
        id: i + 1,
        title: `테스트 게시글 ${i + 1}`,
        content: `테스트 내용 ${i + 1}`,
        author: 'admin',
        createdAt: formatDate(new Date()),
      })).reverse();
      setPosts(dummyPosts);
      localStorage.setItem('board_posts', JSON.stringify(dummyPosts));
    }
  }, []);

  const totalPages = Math.ceil(posts.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = posts.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div>
      <Title>공지사항 목록</Title>

      <div style={{ marginBottom: '20px' }}>
        <div style={{ marginTop: '10px', fontSize: '14px', color: '#666' }}>
          총 게시글 <span style={{ color: '#0071e3', fontWeight: 'bold' }}>{posts.length}</span>개
        </div>
      </div>

      <Table>
        <thead>
          <tr>
            <TH size={80}>번호</TH>
            <TH>제목</TH>
            <TH size={120}>작성자</TH>
            <TH size={200}>작성일시</TH>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((post) => (
            <tr key={post.id}>
              <td className="center">{post.id}</td>
              <td>
                <Link to={RouteLink.NOTICE_DETAIL.replace(':id', post.id.toString())}>{post.title}</Link>
              </td>
              <td className="center">{post.author}</td>
              <td className="center">{post.createdAt}</td>
            </tr>
          ))}
          {currentItems.length === 0 && (
            <tr>
              <td colSpan={4} className="center">
                게시글이 없습니다.
              </td>
            </tr>
          )}
        </tbody>
      </Table>

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
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
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

          {Array.from({ length: totalPages }, (_, i) => (
            <Button
              type='button'  
              key={i + 1}
              onClick={() => setCurrentPage(i + 1)}
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
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            style={{
              padding: '0 12px',
              height: '32px',
              border: '1px solid #d2d2d7',
              borderRadius: '4px',
              backgroundColor: 'white',
              color: currentPage === totalPages ? '#d2d2d7' : '#1d1d1f',
              cursor: currentPage === totalPages ? 'default' : 'pointer',
              fontSize: '14px',
            }}
          >
            다음
          </Button>
        </div>

        <div style={{ position: 'absolute', right: 0 }}>
          <Button onClick={() => navigate(RouteLink.NOTICE_WRITE)} style={{ width: 'auto', padding: '10px 24px' }}>
            글쓰기
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NoticeList;
