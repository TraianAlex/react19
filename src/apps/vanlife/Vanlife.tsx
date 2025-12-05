import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import './Vanlife.modules.scss';
import { makeServer, shutdownServer } from './server';

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
      <Outlet />
    </div>
  );
};

export default Vanlife;
