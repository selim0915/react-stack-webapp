import React from 'react';
import { Link } from "react-router-dom";
import RouteLink from '../../routes/routes';

const LoginFooter: React.FC = () => (
  <div className="flex justify-center gap-2 sm:gap-4 text-xs sm:text-sm text-gray-500 mt-8 break-keep">
    <Link to={RouteLink.SIGNUP} className="hover:text-black transition-colors whitespace-nowrap">회원가입</Link>
    <span className="text-gray-300">|</span>
    <Link to={RouteLink.FIND_ID} className="hover:text-black transition-colors whitespace-nowrap">아이디 찾기</Link>
    <span className="text-gray-300">|</span>
    <Link to={RouteLink.FIND_PW} className="hover:text-black transition-colors whitespace-nowrap">비밀번호 찾기</Link>
  </div>
)

export default LoginFooter;
