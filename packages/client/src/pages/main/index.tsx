import React, { useEffect, useState } from 'react';
import Carousel from '../../components/commons/Carousel';
import { Modal } from '../../components/commons';
import { ko } from '../../locales';
import { useAppSelector } from '../../store/hooks';
import { getCookie, setCookie } from '../../utils/cookie';

const Main: React.FC = () => {
  const isLoggedIn = useAppSelector((state) => state.user.isLoggedIn);
  const [showConsentModal, setShowConsentModal] = useState(false);

  const [hasConsent, setHasConsent] = useState(false);

  useEffect(() => {
    const consented = getCookie('COOKIE_CONSENT_ACCEPTED');
    setHasConsent(!!consented);

    if (isLoggedIn) {
      const hasSkipped = getCookie('COOKIE_CONSENT_SKIPPED');
      
      if (!consented && !hasSkipped) {
        setShowConsentModal(true);
      }
    }
  }, [isLoggedIn]);

  const handleConsentConfirm = () => {
    setCookie('COOKIE_CONSENT_ACCEPTED', 'true', 365);
    setHasConsent(true);
    setShowConsentModal(false);
  };

  const handleConsentCancel = () => {
    setCookie('COOKIE_CONSENT_SKIPPED', 'true', 1 / 24); // 1시간(1/24일) 동안 팝업 띄우지 않음
    setShowConsentModal(false);
  };

  return (
    <div className="w-full">
      <div className="w-full">
        <Carousel hasConsent={hasConsent} />
      </div>
      
      <div className="text-center mt-12 mb-16">
        <h3 className="text-3xl font-bold text-gray-800 mb-4">{ko.PROJECT_NAME}</h3>
        <p className="text-lg text-gray-600 mb-6">{ko.PROJECT_DESCRIPTION}</p>
      </div>

      <Modal
        isOpen={showConsentModal}
        title="쿠키 활용 동의 안내"
        content="본 웹사이트는 최상의 서비스 제공을 위해 쿠키를 사용합니다. 쿠키 수집에 동의하시겠습니까?"
        confirmText="동의"
        cancelText="닫기"
        onConfirm={handleConsentConfirm}
        onCancel={handleConsentCancel}
      />
    </div>
  );
};

export default Main;
