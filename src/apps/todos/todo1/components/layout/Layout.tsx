import { useContext } from 'react';

import Header from './Header';
import Footer from './Footer';
import { ThemeContext, ThemeProvider } from '../../contexts/ThemeContext';

const Inner = ({ children }: { children: React.ReactNode }) => {
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

const Layout = (props: any) => {
  return (
    <ThemeProvider>
      <Inner {...props} />
    </ThemeProvider>
  );
};

export default Layout;
