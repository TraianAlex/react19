import Header from './Header';
import AppMenu from './AppMenu';
import Speakers from '../speakers/Speakers';
import About from '../about/About';
import Speaker from '../speakers/Speaker';
import SpeakerList from '../speakers/SpeakerList';
import { ThemeProvider } from '../contexts/ThemeContext';
import Home from '../home/Home';
import { Outlet } from 'react-router-dom';

// Layout does not use children but instead uses what
//   comes from AppRouteProvider
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
