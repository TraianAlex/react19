import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import './Vanlife.modules.scss';
import Layout from './components/Layout';
import Error from './components/Error';
import Home from './pages/Home';
import About from './pages/About';
import NotFound from './pages/NotFound';
import Login, { action as loginAction } from './pages/Login';
import Vans from './pages/vans/Vans';
import { makeServer, shutdownServer } from './server';
import VanDetail from './pages/vans/VanDetail';
import HostLayout from './components/HostLayout';
import Dashboard from './pages/Host/Dashboard';
import Income from './pages/Host/Income';
import HostVans from './pages/Host/HostVans';
import HostVanDetail from './pages/Host/HostVanDetail';
import HostVanPricing from './pages/Host/HostVanPricing';
import HostVanPhotos from './pages/Host/HostVanPhotos';
import HostVanInfo from './pages/Host/HostVanInfo';
import Reviews from './pages/Host/Reviews';

const Vanlife = () => {
  useEffect(() => {
    // Start MirageJS server when component mounts
    makeServer();

    // Cleanup: shutdown server only when navigating away (not on refresh)
    return () => {
      // Check if we're still on a vanlife route
      // If yes, it's a page refresh, so keep server alive
      // If no, we're navigating away, so shutdown server
      const currentPath = window.location.pathname;
      if (!currentPath.startsWith('/vanlife')) {
        shutdownServer();
      }
    };
  }, []);

  return (
    <div className='vanlife d-flex justify-content-center mt-5'>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='about' element={<About />} />
          <Route path='login' element={<Login />} action={loginAction} />
          <Route path='vans' element={<Vans />} errorElement={<Error />} />
          <Route
            path='vans/:id'
            element={<VanDetail />}
            errorElement={<Error />}
          />

          {/* <Route element={<AuthRequired />}>*/}
          <Route path='host' element={<HostLayout />}>
            <Route index element={<Dashboard />} errorElement={<Error />} />
            <Route path='income' element={<Income />} />
            <Route path='reviews' element={<Reviews />} />
            <Route
              path='vans'
              element={<HostVans />}
              errorElement={<Error />}
            />
            <Route
              path='vans/:id'
              element={<HostVanDetail />}
              errorElement={<Error />}
            >
              <Route index element={<HostVanInfo />} />
              <Route path='pricing' element={<HostVanPricing />} />
              <Route path='photos' element={<HostVanPhotos />} />
            </Route>
          </Route>
          {/* </Route> */}
          <Route path='*' element={<NotFound />} />
        </Route>
      </Routes>
    </div>
  );
};

export default Vanlife;
