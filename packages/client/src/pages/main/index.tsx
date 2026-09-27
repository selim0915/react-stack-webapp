import React from 'react';
import Carousel from '../../components/commons/Carousel';
import { ko } from '../../locales';

const Main: React.FC = () => {
  return (
    <div className="w-full">
      <div className="w-full">
        <Carousel />
      </div>
      
      <div className="text-center mt-12 mb-16">
        <h3 className="text-3xl font-bold text-gray-800 mb-4">{ko.PROJECT_NAME}</h3>
        <p className="text-lg text-gray-600 mb-6">{ko.PROJECT_DESCRIPTION}</p>
      </div>
    </div>
  );
};

export default Main;
