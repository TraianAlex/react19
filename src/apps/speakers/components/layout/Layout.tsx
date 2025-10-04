import Header from './Header';
import AppMenu from './AppMenu';
import { ThemeProvider } from '../contexts/ThemeContext';
import { Outlet } from 'react-router-dom';

export default function Layout() {
  // const speakerId = parseInt(url.substring(9).replace('#', ''));

  return (
    <ThemeProvider>
      <Header />
      <AppMenu />
      {/* {url === '/' && <Home />}
      {url.startsWith('/speakers/about') && <About />}
      {url.startsWith('/speakers') && <Speakers />}
      {url.startsWith('/speakers/speaker/') && <Speaker id={speakerId} />}
      {url.startsWith('/speakers/speakerlist') && <SpeakerList />} */}
      <Outlet />
    </ThemeProvider>
  );
}
