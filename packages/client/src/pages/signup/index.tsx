import React from 'react';
import SignupFooter from './SignupFooter';
import SignupForm from './SignupForm';
import SignupHeader from './SignupHeader';

const Signup: React.FC = () => (
  <div className="w-full max-w-[300px] my-[100px] mx-auto items-center">
    <SignupHeader />
    <SignupForm />
    <SignupFooter />
  </div>
);

export default Signup;
