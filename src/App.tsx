import { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';

import './App.scss';
import Layout from './main/layout.tsx';
import { ProtectedRoute } from './pocs/auth/private-routes';
import store from './pocs/auth/state/store';
import LoadingSpinner from './components/loading-spinner';
import {
  CustomErrorBoundary,
  CustomErrorBoundary2,
  ErrorBoundaryWithHook,
} from './components/CustomErrorBoundary.tsx';

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
const Playground = lazy(() => import('./sandbox/Playground'));
const CompoundComponents = lazy(() => import('./sandbox/CompoundComponents'));
const FlexibleCompoundComponents = lazy(
  () => import('./sandbox/FlexibleCompoundComponents')
);
const CompoundComponentsSimple = lazy(
  () => import('./sandbox/CompoundComponentsSimple')
);
const TodosTest = lazy(() => import('./pocs/todos-test'));
const TodosBasic = lazy(() => import('./pocs/todos-test/todo-standard/Todos'));
const TodosContext = lazy(
  () => import('./pocs/todos-test/TodoContext/TodosContext')
);
const SpeakersApp = lazy(() => import('./apps/speakers/Speakers'));
const SpeakerList = lazy(
  () => import('./apps/speakers/components/speakers/SpeakerList')
);
const Speaker = lazy(
  () => import('./apps/speakers/components/speakers/Speaker')
);
const About = lazy(() => import('./apps/speakers/components/about/About'));
const Speakers = lazy(
  () => import('./apps/speakers/components/speakers/Speakers')
);
const SpeakersHome = lazy(() => import('./apps/speakers/components/home/Home'));
const TodosFlux = lazy(() => import('./pocs/todos-test/ToDoFlux/App'));

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <ErrorBoundaryWithHook>
          <Suspense fallback={<LoadingSpinner />}>
            <Layout>
              <Routes>
                <Route path='/' element={<Home />}>
                  <Route path='recipe/:recipeId' element={<HomeDetails />} />
                </Route>
                <Route path='todos' element={<Todos />}>
                  <Route index element={<Todos1 />} />
                  <Route path='todo1' element={<Todos1 />} />
                  <Route path='todo2' element={<h1>TODO2</h1>} />
                </Route>
                <Route path='speakers-app' element={<SpeakersApp />}>
                  <Route index element={<SpeakersHome />} />
                  <Route path='home' element={<SpeakersHome />} />
                  <Route path='speakerlist' element={<SpeakerList />} />
                  <Route path='speakers' element={<Speakers />} />
                  <Route path='speaker/:id' element={<Speaker />} />
                  <Route path='about' element={<About />} />
                </Route>
                <Route path='watch-list' element={<WatchList />} />
                <Route path='tic-tac-toe' element={<TicTacToe />}>
                  <Route index element={<Game1 />} />
                  <Route path='game1' element={<Game1 />} />
                  <Route path='game2' element={<Game2 />} />
                  <Route path='game3' element={<Game3 />} />
                  <Route path='game4' element={<Game4 />} />
                  <Route path='game5' element={<Game5 />} />
                  <Route path='game6' element={<Game6 />} />
                </Route>
                <Route path='sandbox' element={<Sandbox />}>
                  <Route index element={<Playground />} />
                  <Route path='playground' element={<Playground />} />
                  <Route
                    path='flexible-compound-components'
                    element={<FlexibleCompoundComponents />}
                  />
                  <Route
                    path='compound-components'
                    element={<CompoundComponents />}
                  />
                  <Route
                    path='compound-components-simple'
                    element={<CompoundComponentsSimple />}
                  />
                  <Route path='game3' element={<h1>Game 3</h1>} />
                  <Route path='game4' element={<h1>Game 4</h1>} />
                  <Route path='game5' element={<h1>Game 5</h1>} />
                  <Route path='game6' element={<h1>Game 6</h1>} />
                </Route>
                <Route path='todos-test' element={<TodosTest />}>
                  <Route index element={<TodosBasic />} />
                  <Route path='todos-basic' element={<TodosBasic />} />
                  <Route path='todos-state1' element={<h1>Todos State 1</h1>} />
                  <Route path='todos-state2' element={<h1>Todos State 2</h1>} />
                  <Route path='todos-state3' element={<h1>Todos State 3</h1>} />
                  <Route path='todo-context' element={<TodosContext />} />
                  <Route path='todos-flux' element={<TodosFlux />} />
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
        </ErrorBoundaryWithHook>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
