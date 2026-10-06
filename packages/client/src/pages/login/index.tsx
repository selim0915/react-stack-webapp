import React from 'react';
import LoginFooter from './LoginFooter';
import LoginForm from './LoginForm';
import LoginHeader from './LoginHeader';

const Login: React.FC = () => (
  <div className="w-full max-w-[300px] my-[150px] mx-auto items-center">
    <LoginHeader />
    <LoginForm />
    <LoginFooter />
  </div>
);

export default Login;
