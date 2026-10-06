import React from 'react';
import { Link } from "react-router-dom";
import { logo } from "../../assets";
import RouteLink from '../../routes/routes';

const SignupHeader: React.FC = () => (
  <Link to={RouteLink.MAIN}>
    <img src={logo} alt="logo" className="w-[200px] object-contain mx-auto mb-10" />
  </Link>
)

export default SignupHeader;
