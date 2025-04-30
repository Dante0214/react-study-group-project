import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './components/Header/Header';

const AppLayout = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 576);

  const handleResize = () => {
    setIsMobile(window.innerWidth < 576);
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div>
      <Header isMobile={isMobile} />
      <Outlet />
    </div>
  );
};

export default AppLayout;
