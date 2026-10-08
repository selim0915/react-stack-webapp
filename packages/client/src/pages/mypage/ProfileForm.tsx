import React, { useEffect, useState } from 'react';
import * as UserAPI from '../../apis/user.api';
import { Button, Input } from '../../components/commons';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { updateUser } from '../../store/slices/userSlice';

const ProfileForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);

  const [formData, setFormData] = useState({
    nickname: '',
    phoneNumber: '',
  });

  useEffect(() => {
    setFormData({
      nickname: user.nickname,
      phoneNumber: user.phoneNumber,
    });
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await UserAPI.updateProfile({
        nickname: formData.nickname,
        phoneNumber: formData.phoneNumber,
      });

      dispatch(
        updateUser({
          nickname: formData.nickname,
          phoneNumber: formData.phoneNumber,
        }),
      );
      alert('기본정보가 수정되었습니다.');
    } catch (error) {
      alert('기본정보 수정에 실패했습니다.');
    }
  };

const getGenderText = (gender: string) => {
    if (gender === 'M') return '남성';
    if (gender === 'F') return '여성';
    return '-';
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="border border-gray-300 rounded-lg p-6 bg-white mb-8">
        <h3 className="text-ml font-bold text-gray-800 mb-5">기본정보</h3>
        
        <div className="flex items-center gap-4 mb-8">
          <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center overflow-hidden flex-shrink-0">
            <svg className="w-12 h-12 text-white mt-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="flex flex-col items-start gap-1 flex-1 min-w-0">
            <div className="flex items-center gap-2 w-full">
              <span className="text-xl font-bold text-gray-900 break-all">{user.name}</span>
              <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full shrink-0">
                {user.role === 'ADMIN' ? '관리자' : '일반 회원'}
              </span>
            </div>
            <span className="text-sm text-gray-600 break-all">{user.email}</span>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
          <div>
            <label htmlFor="birthDate" className="block text-sm text-gray-500 mb-2">생년월일</label>
            <Input
              type="text"
              id="birthDate"
              value={user.birthDate}
              disabled
              style={{
                width: '100%',
                backgroundColor: '#f5f5f7',
                color: '#86868b',
                cursor: 'not-allowed',
                border: '1px solid #e5e5e5',
              }}
            />
          </div>
          <div>
            <label htmlFor="gender" className="block text-sm text-gray-500 mb-2">성별</label>
            <Input
              type="text"
              id="gender"
              value={getGenderText(user.gender)}
              disabled
              style={{
                width: '100%',
                backgroundColor: '#f5f5f7',
                color: '#86868b',
                cursor: 'not-allowed',
                border: '1px solid #e5e5e5',
              }}
            />
          </div>
          <div>
            <label htmlFor="nickname" className="block text-sm text-gray-500 mb-2">닉네임</label>
            <Input
              type="text"
              id="nickname"
              name="nickname"
              value={formData.nickname}
              onChange={handleChange}
              placeholder="닉네임을 입력하세요"
              style={{ width: '100%' }}
            />
          </div>
          <div>
            <label htmlFor="phoneNumber" className="block text-sm text-gray-500 mb-2">휴대폰 번호</label>
            <Input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              placeholder="010-0000-0000"
              style={{ width: '100%' }}
            />
          </div>
        </div>

        <div className="flex justify-end mt-8">
          <Button type="submit" style={{ width: 'auto', padding: '12px 40px' }}>
            저장
          </Button>
        </div>
      </div>
    </form>
  );
};

export default ProfileForm;
