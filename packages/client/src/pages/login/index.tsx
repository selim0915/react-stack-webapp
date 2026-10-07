import React from 'react';
import LoginFooter from './LoginFooter';
import LoginForm from './LoginForm';
import LoginHeader from './LoginHeader';

const Login: React.FC = () => (
  <div className="w-full max-w-[300px] mx-auto flex flex-col justify-center items-center w-full">
    <LoginHeader />
    <LoginForm />
    <LoginFooter />
  </div>
);

export default Login;
