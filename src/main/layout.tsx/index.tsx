import { ReactNode } from 'react';
import { Toaster } from 'react-hot-toast';

import { NavigationBar } from '../navigation-bar';

interface LayoutProps {
  children?: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <NavigationBar />
      <Toaster position='top-right' />
      {children}
    </>
  );
};

export default Layout;
