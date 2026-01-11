import React from 'react';
import { CommonButton } from '../../styles/common.style';

const GlobalError: React.FC = () => {
  const goMain = () => {
    window.location.href = '/';
  };

  const handleReload = () => {
    window.location.reload();
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
      <h1 style={{ fontSize: '4rem', margin: '0', color: '#ff4d4d' }}>Error</h1>
      <h2 style={{ fontSize: '1.5rem', margin: '20px 0' }}>문제가 발생했습니다.</h2>
      <p style={{ color: '#666', marginBottom: '30px' }}>
        예기치 못한 오류가 발생하여 앱을 불러올 수 없습니다.
        <br />
        잠시 후 다시 시도해 주세요.
      </p>
      <div style={{ display: 'flex', gap: '10px' }}>
        <CommonButton onClick={handleReload} style={{ width: '150px', backgroundColor: '#6c757d' }}>
          다시 시도
        </CommonButton>
        <CommonButton onClick={goMain} style={{ width: '150px' }}>
          메인으로 이동
        </CommonButton>
      </div>
    </div>
  );
};

export default GlobalError;
