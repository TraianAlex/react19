import { useContext } from 'react';

import Header from './Header';
import Footer from './Footer';
import { ThemeContext, ThemeProvider } from '../../contexts/ThemeContext';

interface LayoutProps {
  children: React.ReactNode;
}

const Inner = ({ children }: LayoutProps) => {
  const { darkTheme } = useContext(ThemeContext);
  const layoutVersion = 'Layout Version 3.0';

  return (
    <div className='container1' data-theme={darkTheme ? 'dark' : 'light'}>
      <Header layoutVersion={layoutVersion} />
      {children}
      <Footer />
    </div>
  );
};

const Layout = (props: LayoutProps) => {
  return (
    <ThemeProvider>
      <Inner {...props} />
    </ThemeProvider>
  );
};

export default Layout;
