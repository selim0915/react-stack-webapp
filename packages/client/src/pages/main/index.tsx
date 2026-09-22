import React, { useEffect, useState } from 'react';
import Carousel from '../../components/commons/Carousel';
import { ko } from '../../locales';

const Main: React.FC = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full">
      <div className="w-full">
        <Carousel />
      </div>
      
      <div className="text-center mt-12 mb-16">
        <h3 className="text-3xl font-bold text-gray-800 mb-4">{ko.PROJECT_NAME}</h3>
        <p className="text-lg text-gray-600 mb-6">{ko.PROJECT_DESCRIPTION}</p>

        <h4 className="text-xl font-semibold text-gray-700 bg-gray-100 inline-block px-6 py-2 rounded-full">
          현재 시간은 '{time.toLocaleTimeString()}' 입니다.
        </h4>
      </div>
    </div>
  );
};

export default Main;
