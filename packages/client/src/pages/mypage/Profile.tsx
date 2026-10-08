import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/commons';
import useAuth from '../../hooks/useAuth';
import { RouteLink } from '../../routes/routes';
import ProfileForm from './ProfileForm';
import PromotionConsent from './PromotionConsent';

const Profile: React.FC = () => {
  const navigate = useNavigate();
  const { logout: authLogout } = useAuth();

  const handleLogout = () => {
    authLogout(() => {
      navigate(RouteLink.MAIN);
    });
  };

  return (
    <div>
      <ProfileForm />

      <PromotionConsent />

      <div className="flex text-xs sm:text-sm text-gray-500 mt-5 break-keep">
        <Button
          type="button"
          variant="text"
          onClick={handleLogout}
          className="text-inherit hover:text-gray-700 transition-colors"
        >
          로그아웃
        </Button>
      </div>
    </div>
  );
};

export default Profile;
