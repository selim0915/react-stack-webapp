import * as Sentry from '@sentry/react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CommonButton } from '../../styles/common.style';
import { RouteLink } from '../../utils/constants';

const NotFound: React.FC = () => {
  const navigate = useNavigate();

  const triggerSentryError = () => {
    Sentry.logger?.info('User triggered test error', {
      action: 'test_error_button_click',
    });

    Sentry.metrics?.count('test_counter', 1);
    throw new Error('This is your first error!');
  };

  const goMain = () => {
    triggerSentryError();

    navigate(RouteLink.MAIN);
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
      <h1 style={{ fontSize: '4rem', margin: '0', color: '#ff4d4d' }}>404</h1>
      <h2 style={{ fontSize: '1.5rem', margin: '20px 0' }}>페이지를 찾을 수 없습니다.</h2>
      <p style={{ color: '#666', marginBottom: '30px' }}>
        입력하신 주소가 잘못되었거나, 페이지가 이동 또는 삭제되었을 수 있습니다.
      </p>
      <CommonButton onClick={goMain} style={{ width: '200px' }}>
        메인으로 돌아가기
      </CommonButton>
    </div>
  );
};

export default NotFound;
