import React from 'react';
import { Link } from "react-router-dom";
import { RouteLink } from '../../routes/routes';

const SignupFooter: React.FC = () => (
  <div className="flex justify-center items-center gap-2 text-xs sm:text-sm text-gray-500 mt-8 break-keep">
    <span className="whitespace-nowrap">계정이 이미 있으신가요?</span>
    <Link to={RouteLink.LOGIN} className="font-semibold text-blue-500 hover:text-blue-700 transition-colors whitespace-nowrap">
      로그인하기
    </Link>
  </div>
);

export default SignupFooter;
