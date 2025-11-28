import { Routes, Route } from 'react-router-dom';
import './Vanlife.modules.scss';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import NotFound from './pages/NotFound';
import Login, { action as loginAction } from './pages/Login';

const Vanlife = () => {
  return (
    <div className='vanlife d-flex justify-content-center mt-5'>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='about' element={<About />} />
          <Route path='login' element={<Login />} action={loginAction} />
          {/* <Route
        path='vans'
        element={<Vans />}
        errorElement={<Error />}
        loader={vansLoader}
      />
      <Route
        path='vans/:id'
        element={<VanDetail />}
        errorElement={<Error />}
        loader={vanDetailLoader}
      /> */}

          {/* <Route element={<AuthRequired />}>
        <Route path='host' element={<HostLayout />}>
          <Route
            index
            element={<Dashboard />}
            errorElement={<Error />}
            loader={dashboardLoader}
          />
          <Route path='income' element={<Income />} />
          <Route path='reviews' element={<Reviews />} />
          <Route
            path='vans'
            element={<HostVans />}
            errorElement={<Error />}
            loader={hostVansLoader}
          />
          <Route
            path='vans/:id'
            element={<HostVanDetail />}
            errorElement={<Error />}
            loader={hostVansDetailLoader}
          >
            <Route index element={<HostVanInfo />} />
            <Route path='pricing' element={<HostVanPricing />} />
            <Route path='photos' element={<HostVanPhotos />} />
          </Route>
        </Route>
      </Route> */}
          <Route path='*' element={<NotFound />} />
        </Route>
      </Routes>
    </div>
  );
};

export default Vanlife;
