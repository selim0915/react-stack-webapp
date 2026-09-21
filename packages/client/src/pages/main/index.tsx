import React, { useEffect, useState } from 'react';
import Carousel from '../../components/commons/Carousel';
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
    <div className="max-w-6xl mx-auto pt-6">
      <Carousel />
      
      <div className="text-center mt-12">
        <Title>Welcome to My Content Hub</Title>
        <SubTitle>Current Time: {time.toLocaleString()}</SubTitle>
      </div>
    </div>
  );
};

export default Main;
