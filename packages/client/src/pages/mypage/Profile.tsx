import { getAuth, signOut } from "firebase/auth";
import React from 'react';
import { useDispatch } from "react-redux";
import { Button } from '../../components/commons';
import { app } from "../../libs/firebaseApp";
import { showToast } from "../../store/slices/uiSlice";
import ProfileForm from './ProfileForm';
import PromotionConsent from './PromotionConsent';

const Profile: React.FC = () => {
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      const auth = getAuth(app);
      await signOut(auth);
      dispatch(showToast("로그아웃 되었습니다."));
    } catch (err) {
      dispatch(showToast("로그아웃 실패했습니다."));
      console.log(err);
    }
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
