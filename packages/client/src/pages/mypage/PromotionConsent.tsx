import React from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { showToast } from '../../store/slices/uiSlice';
import { updateUser } from '../../store/slices/userSlice';

const PromotionConsent: React.FC = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);

  const handleConsentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    
    dispatch(
      updateUser({
        agreements: {
          ...user.agreements,
          [name]: checked,
        },
      }),
    );

    if (checked) {
      dispatch(showToast("약관 동의했습니다."));
    } else {
      dispatch(showToast("약관 동의 해제했습니다."));
    }
  };

  return (
    <div className="border border-gray-300 rounded-lg p-6 bg-white">
      <h3 className="text-ml font-bold text-gray-800 mb-5">프로모션 정보수신 동의</h3>
      
      <div className="flex flex-col gap-4">
        <label
          htmlFor="termsOfService"
          className="flex items-center cursor-pointer text-[15px] text-gray-700 hover:text-gray-900 transition-colors"
        >
          <input
            type="checkbox"
            id="termsOfService"
            name="termsOfService"
            checked={user.agreements.termsOfService}
            onChange={handleConsentChange}
            className="w-5 h-5 mr-3 accent-[#0071e3] border-gray-300 rounded"
          />
          (필수) 이용약관 동의
        </label>

        <label
          htmlFor="privacyPolicy"
          className="flex items-center cursor-pointer text-[15px] text-gray-700 hover:text-gray-900 transition-colors"
        >
          <input
            type="checkbox"
            id="privacyPolicy"
            name="privacyPolicy"
            checked={user.agreements.privacyPolicy}
            onChange={handleConsentChange}
            className="w-5 h-5 mr-3 accent-[#0071e3] border-gray-300 rounded"
          />
          (필수) 개인정보 처리방침 동의
        </label>
      </div>
    </div>
  );
};

export default PromotionConsent;
