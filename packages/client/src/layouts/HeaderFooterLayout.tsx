import React from 'react';
import { Outlet } from 'react-router-dom';
import FAB from '../components/commons/FAB';
import { PageTitle } from '../components/commons/PageTitle';
import Footer from './components/Footer';
import Header from './components/Header';

const HeaderFooterLayout: React.FC = () => (
    <div className="w-full min-h-screen relative flex flex-col bg-[var(--ui-color-background)] transition-colors ">
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

export default HeaderFooterLayout;




