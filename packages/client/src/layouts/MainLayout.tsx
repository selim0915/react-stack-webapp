import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/layouts/Header';
import Nav from '../components/layouts/Nav';
import Footer from '../components/layouts/Footer';
import FAB from '../components/commons/FAB';

const MainLayout: React.FC = () => {
  return (
    <div className="w-full min-h-screen relative flex flex-col bg-[#f5f5f7] dark:bg-gray-900 transition-colors overflow-x-hidden">
      <Header />
      <Nav />
      <div className="w-full flex-1 flex flex-col">
        <section className="max-w-7xl mx-auto w-full flex-1 px-8 py-8 box-border">
          <Outlet />
        </section>
        <Footer />
        <FAB />
      </div>
    </div>
  );
};

export default MainLayout;
