import React from 'react';
import { useNavigate, useRouteError, isRouteErrorResponse, useSearchParams } from 'react-router-dom';
import { Button } from '../../components/commons';
import { RouteLink } from '../../routes/routes';

export type ErrorType = '403' | '404' | '500';

interface ErrorPageProps {
  type?: ErrorType;
}

const ERROR_CONFIG = {
  '403': {
    title: '접근 권한이 없습니다.',
    description: '이 페이지에 접근할 권한이 없습니다. 관리자에게 문의하세요.',
    buttonText: '이전 페이지로 돌아가기',
    action: 'back',
  },
  '404': {
    title: '페이지를 찾을 수 없습니다.',
    description: '입력하신 주소가 잘못되었거나, 페이지가 이동 또는 삭제되었을 수 있습니다.',
    buttonText: '메인으로 돌아가기',
    action: 'main',
  },
  '500': {
    title: '서버 오류가 발생했습니다.',
    description: '문제가 지속되면 관리자에게 문의해 주세요.',
    buttonText: '메인으로 돌아가기',
    action: 'main',
  },
};

const ErrorPage: React.FC<ErrorPageProps> = ({ type: propType }) => {
  const navigate = useNavigate();
  const routeError = useRouteError();
  
  const [searchParams] = useSearchParams();
  const queryType = searchParams.get('type') as ErrorType;
  let resolvedType: ErrorType = propType || '500';

  if (!propType) {
    if (isRouteErrorResponse(routeError)) {
      if (queryType === '403') resolvedType = '403';
      else if (routeError.status === 404) resolvedType = '404';
      else if (routeError.status === 403) resolvedType = '403';
      else resolvedType = '500';
    } else if (queryType) {
      resolvedType = queryType;
    }
  }

  const config = ERROR_CONFIG[resolvedType] || ERROR_CONFIG['500'];

  const handleAction = () => {
    if (config.action === 'back') {
      navigate(-1);
    } else if (config.action === 'main') {
      navigate(RouteLink.MAIN);
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        textAlign: 'center',
      }}
    >
      {config.title && (
        <h2 style={{ fontSize: '1.5rem', margin: '20px 0' }}>{config.title}</h2>
      )}
      <p style={{ color: '#666', marginBottom: '30px' }}>{config.description}</p>
      
      <Button type="button" onClick={handleAction} style={{ width: '200px' }}>
        {config.buttonText}
      </Button>
    </div>
  );
};

export default ErrorPage;
