import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, Form, Input } from '../../components/commons';
import useAuth from '../../hooks/useAuth';
import { app } from "../../libs/firebaseApp";
import RouteLink from '../../routes/routes';
import { showToast } from "../../store/slices/uiSlice";
import { UserRole } from '../../utils/constants';

const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { login: authLogin } = useAuth();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const auth = getAuth(app);
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const token = await userCredential.user.getIdToken();
      
      // 관리자 이메일 하드코딩 혹은 기본값으로 처리 (원하시는 조건에 맞게 변경 가능)
      const role = email === 'admin@co.kr' ? UserRole.ADMIN : UserRole.USER;
      authLogin(email, role, token); // 기존 useAuth 훅의 로직(Redux, Cookie 세팅) 실행

      dispatch(showToast("로그인에 성공했습니다."));
      navigate(RouteLink.MAIN);
    } catch (err) {
      dispatch(showToast("로그인에 실패했습니다."));
      console.log(err);
    }
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { target: { name, value } } = e;

    if (name === "email") {
      setEmail(value);

      const validRegex =
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

      if (!value?.match(validRegex)) {
        setError("이메일 형식이 올바르지 않습니다.");
      } else {
        setError("");
      }
    }

    if (name === "password") {
      setPassword(value);

      if (value?.length < 8) {
        setError("비밀번호는 8자리 이상 입력해주세요");
      } else {
        setError("");
      }
    }
  };

  return (
    <Form onSubmit={onSubmit} className="flex flex-col w-full">
      <div className="w-full flex flex-col gap-5">
        <Input
          type="email"
          name="email"
          id="email"
          placeholder='이메일'
          required
          onChange={onChange}
          value={email}
        />
        <Input
          type="password"
          name="password"
          id="password"
          placeholder='비밀번호'
          required
          onChange={onChange}
          value={password}
        />
        <Button
          type="submit"
          className="w-full"
          disabled={error?.length > 0}
        >
          로그인
        </Button>
      </div>

      {error && error?.length > 0 && (
        <div className="w-full mt-2 text-red-500 text-sm text-center">
          <span>{error}</span>
        </div>
      )}
    </Form>
  );
}

export default LoginForm;
