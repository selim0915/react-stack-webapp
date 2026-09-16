import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/commons';

const Forbidden: React.FC = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '60vh',
        textAlign: 'center',
      }}
    >
      <h1 style={{ fontSize: '4rem', margin: '0', color: '#ff9500' }}>403</h1>
      <h2 style={{ fontSize: '1.5rem', margin: '20px 0' }}>접근 권한이 없습니다.</h2>
      <p style={{ color: '#666', marginBottom: '30px' }}>이 페이지에 접근할 권한이 없습니다. 관리자에게 문의하세요.</p>
      <Button onClick={goBack} style={{ width: '200px' }}>
        이전 페이지로 돌아가기
      </Button>
    </div>
  );
};

export default Forbidden;
