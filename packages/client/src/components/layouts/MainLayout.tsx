import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from './Footer';
import Header from './Header';
import Nav from './Nav';

const MainLayout: React.FC = () => (
    <div className="w-full h-full min-h-screen relative flex flex-col bg-[#f5f5f7]">
      <Header />
      <Nav />
      <div className="w-full h-full overflow-auto" style={{ overflowAnchor: 'none' }}>
        <section className="w-full min-h-[calc(100%-60px)] px-6 py-6 box-border">
          <Outlet />
        </section>
        <Footer />
      </div>
    </div>
  );

export default MainLayout;
