import React, { useEffect, useState } from 'react';

const Countdown: React.FC = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center py-32 text-center w-full">
      <div className="text-xl font-semibold text-gray-700 bg-gray-100 inline-block px-10 py-4 rounded-full shadow-sm">
        현재 시간은 '{time.toLocaleTimeString()}' 입니다.
      </div>
    </div>
  );
};

export default Countdown;

