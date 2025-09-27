import { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';

import './App.scss';
import Layout from './main/layout.tsx';
import { ProtectedRoute } from './pocs/auth/private-routes';
import store from './pocs/auth/state/store';
import LoadingSpinner from './components/loading-spinner';
import { CustomErrorBoundary } from './components/CustomErrorBoundary.tsx';

const NotFound = lazy(() => import('./components/not-found'));
const Home = lazy(() => import('./main/home'));
const HomeDetails = lazy(() => import('./main/home/home-detail'));
const Todos = lazy(() => import('./apps/todos'));
const WatchList = lazy(() => import('./apps/watch-list'));
const TicTacToe = lazy(() => import('./apps/tic-tac-toe'));
const Login = lazy(() => import('./pocs/auth/components/login'));
const Profile = lazy(() => import('./pocs/auth/components/profile'));
const Todos1 = lazy(() => import('./apps/todos/todo1/Todos1'));
const Game1 = lazy(() => import('./apps/tic-tac-toe/game1'));
const Game2 = lazy(() => import('./apps/tic-tac-toe/game2'));
const Game3 = lazy(() => import('./apps/tic-tac-toe/game3'));
const Game4 = lazy(() => import('./apps/tic-tac-toe/game4'));
const Game5 = lazy(() => import('./apps/tic-tac-toe/game5'));
const Game6 = lazy(() => import('./apps/tic-tac-toe/game6'));
const Sandbox = lazy(() => import('./sandbox'));
const Playground = lazy(() => import('./sandbox/playground/Playground'));
const CompoundComponents = lazy(() => import('./sandbox/playground/CompoundComponents'));
const FlexibleCompoundComponents = lazy(() => import('./sandbox/playground/FlexibleCompoundComponents'));

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <CustomErrorBoundary>
          <Suspense fallback={<LoadingSpinner />}>
            <Layout>
              <Routes>
                <Route path='/' element={<Home />}>
                  <Route path='recipe/:recipeId' element={<HomeDetails />} />
                </Route>
                <Route path='todos' element={<Todos />}>
                  <Route path='todo1' element={<Todos1 />} />
                  <Route path='todo2' element={<h1>TODO2</h1>} />
                </Route>
                <Route path='watch-list' element={<WatchList />} />
                <Route path='tic-tac-toe' element={<TicTacToe />}>
                  <Route path='game1' element={<Game1 />} />
                  <Route path='game2' element={<Game2 />} />
                  <Route path='game3' element={<Game3 />} />
                  <Route path='game4' element={<Game4 />} />
                  <Route path='game5' element={<Game5 />} />
                  <Route path='game6' element={<Game6 />} />
                </Route>
                <Route path='sandbox' element={<Sandbox />}>
                  <Route path='playground' element={<Playground />} />
                  <Route path='flexible-compound-components' element={<FlexibleCompoundComponents />} />
                  <Route path='compound-components' element={<CompoundComponents />} />
                  <Route path='game3' element={<h1>Game 3</h1>} />
                  <Route path='game4' element={<h1>Game 4</h1>} />
                  <Route path='game5' element={<h1>Game 5</h1>} />
                  <Route path='game6' element={<h1>Game 6</h1>} />
                </Route>
                <Route path='login' element={<Login />} />
                <Route
                  path='profile'
                  element={
                    <ProtectedRoute>
                      <Profile />
                    </ProtectedRoute>
                  }
                />
                <Route path='loading-spinner' element={<LoadingSpinner />} />
                <Route path='not-found' element={<NotFound />} />
                <Route path='*' element={<NotFound />} />
              </Routes>
            </Layout>
          </Suspense>
        </CustomErrorBoundary>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
