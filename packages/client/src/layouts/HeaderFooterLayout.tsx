import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/layouts/Header';
import Footer from '../components/layouts/Footer';
import FAB from '../components/commons/FAB';

const HeaderFooterLayout: React.FC = () => {
  return (
    <div className="w-full min-h-screen relative flex flex-col bg-[#f5f5f7] dark:bg-gray-900 transition-colors overflow-x-hidden">
      <Header />
      <div className="w-full flex-1 flex flex-col">
        <section className="max-w-7xl mx-auto w-full flex-1 px-8 py-8 box-border flex flex-col">
          <Outlet />
        </section>
        <Footer />
        <FAB />
      </div>
    </div>
  );
};

export default HeaderFooterLayout;
