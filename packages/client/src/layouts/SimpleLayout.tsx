import React from 'react';
import { Outlet } from 'react-router-dom';
import { PageTitle } from '../components/commons/PageTitle';
import Footer from './components/Footer';

const SimpleLayout: React.FC = () => (
    <div className="w-full min-h-screen relative flex flex-col bg-[#f5f5f7] dark:bg-gray-900 transition-colors">
      <div className="w-full flex-1 flex flex-col">
        <section className="max-w-[var(--content-width)] mx-auto w-full flex-1 px-8 py-8 box-border flex flex-col justify-center items-center">
          <PageTitle />
          <Outlet />
        </section>
        <Footer />
      </div>
    </div>
  );

export default SimpleLayout;



