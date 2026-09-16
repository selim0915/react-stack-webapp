import React from 'react';
import { Button } from '../../components/commons';

const GlobalError: React.FC = () => {
  const goMain = () => {
    window.location.href = '/';
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '80vh',
        textAlign: 'center',
      }}
    >
      <h1 style={{ fontSize: '2rem', marginBottom: '20px', color: '#ff3b30' }}>오류가 발생했습니다</h1>
      <p style={{ color: '#666', marginBottom: '30px' }}>문제가 지속되면 관리자에게 문의해 주세요.</p>
      <Button onClick={goMain} style={{ width: '200px' }}>
        메인으로 이동
      </Button>
    </div>
  );
};

export default GlobalError;
