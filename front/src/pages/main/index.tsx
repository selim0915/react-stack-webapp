import React, { useEffect, useState } from 'react';
import { CommonSubTitle, CommonTitle } from '../../styles/common.style';

const Main: React.FC = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <CommonTitle>Welcome to Sampeople</CommonTitle>
      <CommonSubTitle>Current Time: {time.toLocaleString()}</CommonSubTitle>
    </>
  );
};

export default Main;
