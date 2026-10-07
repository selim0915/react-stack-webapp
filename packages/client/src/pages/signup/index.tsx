import React from 'react';
import SignupFooter from './SignupFooter';
import SignupForm from './SignupForm';
import SignupHeader from './SignupHeader';

const Signup: React.FC = () => (
  <div className="w-full max-w-[300px] mx-auto flex flex-col justify-center items-center w-full">
    <SignupHeader />
    <SignupForm />
    <SignupFooter />
  </div>
);

export default Signup;
