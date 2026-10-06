import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, Form, Input } from '../../components/commons';
import { app } from "../../libs/firebaseApp";
import { RouteLink } from '../../routes/routes';
import { showToast } from "../../store/slices/uiSlice";

const SignupForm: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordConfirm, setPasswordConfirm] = useState<string>("");
  const [error, setError] = useState<string>("");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const auth = getAuth(app);
      await createUserWithEmailAndPassword(auth, email, password);

      dispatch(showToast("회원가입에 성공했습니다."));
      navigate(RouteLink.LOGIN);
    } catch (err) {
      dispatch(showToast("회원가입에 실패했습니다."));
      console.log(err);
    }
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = e;

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
        setError("비밀번호는 8자리 이상으로 입력해주세요");
      } else if (passwordConfirm?.length > 0 && value !== passwordConfirm) {
        setError("비밀번호와 비밀번호 확인 값이 다릅니다. 다시 확인해주세요.");
      } else {
        setError("");
      }
    }

    if (name === "password_confirm") {
      setPasswordConfirm(value);

      if (value?.length < 8) {
        setError("비밀번호는 8자리 이상으로 입력해주세요");
      } else if (value !== password) {
        setError("비밀번호와 비밀번호 확인 값이 다릅니다. 다시 확인해주세요.");
      } else {
        setError("");
      }
    }
  };

  return (
    <Form onSubmit={onSubmit} className="flex flex-col items-center w-full">
      <div className="w-full flex flex-col gap-3">
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
        <Input
          type="password"
          name="password_confirm"
          id="password_confirm"
          placeholder='비밀번호 확인'
          required
          onChange={onChange}
          value={passwordConfirm}
        />
      </div>

      {error && error?.length > 0 && (
        <div className="w-full mt-2 text-red-500 text-sm text-center">
          <span>{error}</span>
        </div>
      )}

      <div className="w-full mt-8">
        <Button
          type="submit"
          className="w-full"
          disabled={error?.length > 0}
        >
          회원가입
        </Button>
      </div>
    </Form>
  );
}

export default SignupForm;
