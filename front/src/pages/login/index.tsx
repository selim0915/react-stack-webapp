import React, { useState } from 'react';
import { CommonButton, CommonForm, CommonImage, CommonInput, CommonInputText } from '../../styles/common.style';
import { LoginLayout } from '../../styles/layout.style';
import { CookieKey, UserRole } from '../../utils/constants';
import { setCookie } from '../../utils/cookie';
import { sampeople } from '../../utils/image.import';

const Login: React.FC = () => {
  const [userId, setUserId] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [msg, setMsg] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    if (id === 'userId') {
      setUserId(value);
    } else if (id === 'password') {
      setPassword(value);
    }
  };

  const login = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (userId && password) {
      const role = userId === 'admin' ? UserRole.ADMIN : UserRole.USER;
      const accessToken = 'abcdefg';

      setCookie(CookieKey.ACCESS_TOKEN, accessToken, 1);
      setCookie(CookieKey.USER_ID, userId);
      setCookie(CookieKey.ROLE, role);
      window.location.href = '/';
    } else {
      setMsg('아이디와 비밀번호를 확인하세요.');
    }
  };

  return (
    <LoginLayout>
      <CommonImage src={sampeople} alt="netflix logo" width={180} height={100} />

      <CommonForm onSubmit={login}>
        <CommonInput type="text" id="userId" value={userId} onChange={handleChange} placeholder="아이디" />
        <CommonInput type="password" id="password" value={password} onChange={handleChange} placeholder="비밀번호" />
        <CommonInputText>{msg}</CommonInputText>

        <CommonButton type="submit">로그인</CommonButton>
      </CommonForm>
    </LoginLayout>
  );
};

export default Login;
