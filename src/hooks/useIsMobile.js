import { useEffect, useState } from 'react';

export const useIsMobile = (maxWidth) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < maxWidth);

  const handleResize = () => {
    setIsMobile(window.innerWidth < maxWidth);
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return isMobile;
};
