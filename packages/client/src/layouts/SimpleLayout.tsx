import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../components/layouts/Footer';

const SimpleLayout: React.FC = () => {
  return (
    <div className="w-full min-h-screen relative flex flex-col bg-[#f5f5f7] dark:bg-gray-900 transition-colors">
      <div className="w-full flex-1 flex flex-col">
        <section className="w-full flex-1 px-6 py-6 box-border flex justify-center items-center">
          <Outlet />
        </section>
        <Footer />
      </div>
    </div>
  );
};

export default SimpleLayout;
