import { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';

import './App.scss';
import Layout from './components/layout.tsx';
import { ProtectedRoute } from './pocs/auth/private-routes';
import store from './pocs/auth/state/store';
import LoadingSpinner from './components/loading-spinner';
import { CustomErrorBoundary } from './components/CustomErrorBoundary.tsx';

const Home = lazy(() => import('./components/home'));
const HomeDetails = lazy(() => import('./components/home/home-detail'));
const Todos = lazy(() => import('./apps/todos'));
const WatchList = lazy(() => import('./apps/watch-list'));
const Login = lazy(() => import('./pocs/auth/components/login'));
const Profile = lazy(() => import('./pocs/auth/components/profile'));

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <CustomErrorBoundary>
          <Suspense fallback={<LoadingSpinner />}>
            <Layout>
              <Routes>
                <Route path='/' element={<Home />}>
                  <Route path=':recipeId' element={<HomeDetails />} />
                </Route>
                <Route path='todos' element={<Todos />}>
                  <Route path='todo1' element={<h1>TODO1</h1>} />
                  <Route path='todo2' element={<h1>TODO2</h1>} />
                </Route>
                <Route path='watch-list' element={<WatchList />} />
                <Route path='loading-spinner' element={<LoadingSpinner />} />
                <Route path='login' element={<Login />} />
                <Route
                  path='profile'
                  element={
                    <ProtectedRoute>
                      <Profile />
                    </ProtectedRoute>
                  }
                />
              </Routes>
            </Layout>
          </Suspense>
        </CustomErrorBoundary>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
