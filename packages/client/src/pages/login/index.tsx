import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Form, Input, InputHelperText } from '../../components/commons';
import { UserRole } from '../../constants/app.config';
import useAuth from '../../hooks/useAuth';
import { RouteLink } from '../../routes/routes';
import { sampeople } from '../../utils/images';

const Login: React.FC = () => {
  const { login: authLogin, logout: authLogout } = useAuth();
  const navigate = useNavigate();
  const [userId, setUserId] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [msg, setMsg] = useState<string>('');

  React.useEffect(() => {
    authLogout();
  }, [authLogout]);

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

      authLogin(userId, role, accessToken);
      navigate(RouteLink.MAIN);
    } else {
      setMsg('아이디와 비밀번호를 확인하세요.');
    }
  };

  return (
    <div className="w-full max-w-[480px] my-[100px] mx-auto flex flex-col items-center gap-[30px]">
      <Link to={RouteLink.MAIN}>
        <img src={sampeople} alt="Logo" className="h-8 object-contain" />
      </Link>

      <Form onSubmit={login}>
        <Input type="text" id="userId" value={userId} onChange={handleChange} placeholder="아이디" />
        <Input type="password" id="password" value={password} onChange={handleChange} placeholder="비밀번호" />
        <InputHelperText>{msg}</InputHelperText>

        <Button type="submit">로그인</Button>
      </Form>

      <div className="flex gap-4 text-sm text-gray-500 mt-2">
        <Link to={RouteLink.SIGNUP} className="hover:text-black transition-colors">회원가입</Link>
        <span className="text-gray-300">|</span>
        <Link to={RouteLink.FIND_ID} className="hover:text-black transition-colors">아이디 찾기</Link>
        <span className="text-gray-300">|</span>
        <Link to={RouteLink.FIND_PW} className="hover:text-black transition-colors">비밀번호 찾기</Link>
      </div>
    </div>
  );
};

export default Login;
