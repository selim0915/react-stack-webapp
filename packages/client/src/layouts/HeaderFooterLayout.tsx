import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/layouts/Header';
import Footer from '../components/layouts/Footer';
import FAB from '../components/commons/FAB';
import { PageTitle } from '../components/commons/PageTitle';

const HeaderFooterLayout: React.FC = () => {
  return (
    <div className="w-full min-h-screen relative flex flex-col bg-[#f5f5f7] dark:bg-gray-900 transition-colors ">
      <Header />
      <div className="w-full flex-1 flex flex-col">
        <section className="max-w-[var(--content-width)] mx-auto w-full flex-1 px-8 py-8 box-border flex flex-col">
          <PageTitle />
          <Outlet />
        </section>
        <Footer />
        <FAB />
      </div>
    </div>
  );
};

export default HeaderFooterLayout;



