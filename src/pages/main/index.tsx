import React, { useEffect, useState } from 'react';
import { SubTitle, Title } from '../../components/commons';

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
      <Title>Welcome to Sampeople</Title>
      <SubTitle>Current Time: {time.toLocaleString()}</SubTitle>
    </>
  );
};

export default Main;
