import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';

import './App.scss';
import Home from './components/home';
import Todos from './apps/todos';
import WatchList from './apps/watch-list';
import Layout from './components/layout.tsx';
import { HomeDetails } from './components/home/home-detail';
import Login from './pocs/auth/components/login';
import Profile from './pocs/auth/components/profile';
import { ProtectedRoute } from './pocs/auth/private-routes';
import store from './pocs/auth/state/store';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
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
      </BrowserRouter>
    </Provider>
  );
}

export default App;
