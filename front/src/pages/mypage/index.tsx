import React, { useEffect, useState } from 'react';
import { Button, Input, Title } from '../../components/commons';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { updateUserInfo } from '../../store/slices/userSlice';

const MyPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);

  // 로컬 상태 관리
  const [formData, setFormData] = useState({
    name: '',
    phoneNumber: '',
    termsOfService: false,
    privacyPolicy: false,
  });

  // 초기값 설정
  useEffect(() => {
    setFormData({
      name: user.name,
      phoneNumber: user.phoneNumber,
      termsOfService: user.agreements.termsOfService,
      privacyPolicy: user.agreements.privacyPolicy,
    });
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(
      updateUserInfo({
        name: formData.name,
        phoneNumber: formData.phoneNumber,
        agreements: {
          termsOfService: formData.termsOfService,
          privacyPolicy: formData.privacyPolicy,
        },
      }),
    );
    alert('회원정보가 수정되었습니다.');
  };

  const getGenderText = (gender: string) => {
    if (gender === 'M') return '남성';
    if (gender === 'F') return '여성';
    return '-';
  };

  return (
    <div>
      <Title>마이페이지</Title>

      <div style={{ maxWidth: '800px', marginTop: '30px' }}>
        <form onSubmit={handleSubmit}>
          {/* 아이디 / 이름 섹션 */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
            <div>
              <label htmlFor="id" style={{ display: 'block', fontSize: '14px', color: '#86868b', marginBottom: '8px' }}>
                아이디
              </label>
              <Input
                type="text"
                id="id"
                value={user.id}
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
              <label
                htmlFor="name"
                style={{ display: 'block', fontSize: '14px', color: '#86868b', marginBottom: '8px' }}
              >
                이름
              </label>
              <Input
                type="text"
                id="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="이름을 입력하세요"
                style={{ width: '100%' }}
              />
            </div>
          </div>

          {/* 생년월일 / 성별 섹션 */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
            <div>
              <label
                htmlFor="birthDate"
                style={{ display: 'block', fontSize: '14px', color: '#86868b', marginBottom: '8px' }}
              >
                생년월일
              </label>
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
              <label
                htmlFor="gender"
                style={{ display: 'block', fontSize: '14px', color: '#86868b', marginBottom: '8px' }}
              >
                성별
              </label>
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
          </div>

          {/* 휴대폰 번호 섹션 */}
          <div style={{ marginBottom: '40px' }}>
            <label
              htmlFor="phoneNumber"
              style={{ display: 'block', fontSize: '14px', color: '#86868b', marginBottom: '8px' }}
            >
              휴대폰 번호
            </label>
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

          {/* 약관 동의 섹션 */}
          <div style={{ marginBottom: '40px', borderTop: '1px solid #eee', paddingTop: '30px' }}>
            <div style={{ fontSize: '14px', color: '#86868b', marginBottom: '15px' }}>약관 동의</div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <label
                htmlFor="termsOfService"
                style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', fontSize: '15px' }}
              >
                <input
                  type="checkbox"
                  name="termsOfService"
                  checked={formData.termsOfService}
                  onChange={handleChange}
                  style={{ width: '20px', height: '20px', marginRight: '10px', accentColor: '#0071e3' }}
                />
                (필수) 이용약관 동의
              </label>

              <label
                htmlFor="privacyPolicy"
                style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', fontSize: '15px' }}
              >
                <input
                  type="checkbox"
                  name="privacyPolicy"
                  checked={formData.privacyPolicy}
                  onChange={handleChange}
                  style={{ width: '20px', height: '20px', marginRight: '10px', accentColor: '#0071e3' }}
                />
                (필수) 개인정보 처리방침 동의
              </label>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button type="submit" style={{ width: 'auto', padding: '12px 30px' }}>
              저장
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MyPage;
