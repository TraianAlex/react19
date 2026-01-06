import { lazy, Suspense } from 'react';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  Outlet,
} from 'react-router-dom';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

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
const TodosLayout = lazy(() => import('./apps/todos/TodosLayout'));
const WatchList = lazy(() => import('./apps/watch-list'));
const TicTacToeLayout = lazy(
  () => import('./apps/tic-tac-toe/TicTacToeLayout')
);
const Login = lazy(() => import('./pocs/auth/components/login'));
const Profile = lazy(() => import('./pocs/auth/components/profile'));
const Todos1 = lazy(() => import('./apps/todos/todo1/Todos1'));
const Game1 = lazy(() => import('./apps/tic-tac-toe/game1'));
const Game2 = lazy(() => import('./apps/tic-tac-toe/game2'));
const Game3 = lazy(() => import('./apps/tic-tac-toe/game3'));
const Game4 = lazy(() => import('./apps/tic-tac-toe/game4'));
const Game5 = lazy(() => import('./apps/tic-tac-toe/game5'));
const Game6 = lazy(() => import('./apps/tic-tac-toe/game6'));
const SandboxLayout = lazy(() => import('./sandbox/SandboxLayout'));
const Playground = lazy(() => import('./sandbox/playground/Playground'));
const CompoundComponents = lazy(
  () =>
    import(
      './sandbox/compound-components/compound-components-context/CompoundComponents'
    )
);
const FlexibleCompoundComponents = lazy(
  () =>
    import(
      './sandbox/compound-components/compound-components2/FlexibleCompoundComponents'
    )
);
const CompoundComponentsSimple = lazy(
  () =>
    import(
      './sandbox/compound-components/compound-components1/CompoundComponentsSimple'
    )
);
const TodosTestLayout = lazy(() => import('./pocs/todos-test/TodosTestLayout'));
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
const TodosRedux = lazy(
  () => import('./pocs/todos-test/ToDoRedux/TodoListRedux')
);
const IncrementReduxHooks = lazy(() => import('./sandbox/ReduxWithHooks/App'));
const TodoApp = lazy(
  () => import('./pocs/todos-test/todos-context-fakeapi-localstorage/TodoApp')
);
const TodosAction = lazy(
  () => import('./pocs/todos-test/todos-server-actions/TodosAction')
);
const TodosActions = lazy(
  () => import('./pocs/todos-test/todos-actions/TodosActions')
);
const Vanlife = lazy(() => import('./apps/vanlife/Vanlife'));
const VanlifeLayout = lazy(() => import('./apps/vanlife/components/Layout'));
const VanlifeHome = lazy(() => import('./apps/vanlife/pages/Home'));
const VanlifeAbout = lazy(() => import('./apps/vanlife/pages/About'));
const VanlifeNotFound = lazy(() => import('./apps/vanlife/pages/NotFound'));
const VanlifeLogin = lazy(() => import('./apps/vanlife/pages/Login'));
const VanlifeVans = lazy(() => import('./apps/vanlife/pages/vans/Vans'));
const VanlifeVanDetail = lazy(
  () => import('./apps/vanlife/pages/vans/VanDetail')
);
const VanlifeHostLayout = lazy(
  () => import('./apps/vanlife/components/HostLayout')
);
const VanlifeDashboard = lazy(
  () => import('./apps/vanlife/pages/Host/Dashboard')
);
const VanlifeIncome = lazy(() => import('./apps/vanlife/pages/Host/Income'));
const VanlifeHostVans = lazy(
  () => import('./apps/vanlife/pages/Host/HostVans')
);
const VanlifeHostVanDetail = lazy(
  () => import('./apps/vanlife/pages/Host/HostVanDetail')
);
const VanlifeHostVanPricing = lazy(
  () => import('./apps/vanlife/pages/Host/HostVanPricing')
);
const VanlifeHostVanPhotos = lazy(
  () => import('./apps/vanlife/pages/Host/HostVanPhotos')
);
const VanlifeHostVanInfo = lazy(
  () => import('./apps/vanlife/pages/Host/HostVanInfo')
);
const VanlifeReviews = lazy(() => import('./apps/vanlife/pages/Host/Reviews'));
const VanlifeAuthRequired = lazy(
  () => import('./apps/vanlife/components/AuthRequired')
);
const VanlifeError = lazy(() => import('./apps/vanlife/components/Error'));
const Weather = lazy(() => import('./pocs/weather/Weather'));
const TodosSetState1 = lazy(
  () => import('./pocs/todos-test/todo-setstate1/Todos')
);
const TodosSetState2 = lazy(
  () => import('./pocs/todos-test/todo-setstate2/Todos')
);
const RscLayout = lazy(() => import('./pocs/rsc/RscLayout'));
const AppHeader = lazy(() => import('./pocs/rsc/simple-rsc/app-header'));
const TransitionLayout = lazy(
  () => import('./pocs/transition/TransitionLayout')
);
const TransitionTabs = lazy(
  () => import('./pocs/transition/transition-delay/TransitionTabs')
);
const TransitionOptimistic = lazy(
  () => import('./pocs/transition/transition-optimistic/TransitionTabs')
);
const TransitionSuspense = lazy(
  () => import('./pocs/transition/transition-suspense/TransitionTabs')
);
const TodosActionState = lazy(
  () => import('./pocs/todos-test/todos-action-state/TodosActionState')
);
const HooksLayout = lazy(() => import('./pocs/hooks/HooksLayout'));
const NotesApp = lazy(() => import('./pocs/hooks/useHookNotesApp/NotesApp'));
const NoteDashboardApp = lazy(
  () => import('./pocs/hooks/useHookParallelDashboard/NoteDashboardApp')
);
const ContextApp = lazy(() => import('./pocs/hooks/useHookContextApp/ContextApp'));
import { action as vanlifeLoginAction } from './apps/vanlife/pages/Login';
import { loader as vansLoader } from './apps/vanlife/pages/vans/Vans';
import { loader as vanlifeVanDetailLoader } from './apps/vanlife/pages/vans/VanDetail';
import { loader as vanlifeDashboardLoader } from './apps/vanlife/pages/Host/Dashboard';
import { loader as vanlifeHostVanDetailLoader } from './apps/vanlife/pages/Host/HostVanDetail';
import { loader as vanlifeHostVansLoader } from './apps/vanlife/pages/Host/HostVans';
import { loader as weatherLoader } from './pocs/weather/Weather';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      element={
        <ErrorBoundaryWithHook>
          <Suspense fallback={<LoadingSpinner />}>
            <Layout>
              <Outlet />
            </Layout>
          </Suspense>
        </ErrorBoundaryWithHook>
      }
    >
      <Route path='/' element={<Home />}>
        <Route path='recipe/:recipeId' element={<HomeDetails />} />
      </Route>
      <Route path='todos' element={<TodosLayout />}>
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
      <Route path='vanlife' element={<Vanlife />}>
        <Route path='/vanlife' element={<VanlifeLayout />}>
          <Route index element={<VanlifeHome />} />
          <Route path='about' element={<VanlifeAbout />} />
          <Route
            path='login'
            element={<VanlifeLogin />}
            action={vanlifeLoginAction}
          />
          <Route
            path='vans'
            element={<VanlifeVans />}
            errorElement={<VanlifeError />}
            loader={vansLoader}
          />
          <Route
            path='vans/:id'
            element={<VanlifeVanDetail />}
            errorElement={<VanlifeError />}
            loader={vanlifeVanDetailLoader}
          />
          <Route element={<VanlifeAuthRequired />}>
            <Route path='host' element={<VanlifeHostLayout />}>
              <Route
                index
                element={<VanlifeDashboard />}
                errorElement={<VanlifeError />}
                loader={vanlifeDashboardLoader}
              />
              <Route path='income' element={<VanlifeIncome />} />
              <Route path='reviews' element={<VanlifeReviews />} />
              <Route
                path='vans'
                element={<VanlifeHostVans />}
                errorElement={<VanlifeError />}
                loader={vanlifeHostVansLoader}
              />
              <Route
                path='vans/:id'
                element={<VanlifeHostVanDetail />}
                errorElement={<VanlifeError />}
                loader={vanlifeHostVanDetailLoader}
              >
                <Route index element={<VanlifeHostVanInfo />} />
                <Route path='pricing' element={<VanlifeHostVanPricing />} />
                <Route path='photos' element={<VanlifeHostVanPhotos />} />
              </Route>
            </Route>
          </Route>
          <Route path='*' element={<VanlifeNotFound />} />
        </Route>
      </Route>
      <Route path='watch-list' element={<WatchList />} />
      <Route path='tic-tac-toe' element={<TicTacToeLayout />}>
        <Route index element={<Game1 />} />
        <Route path='game1' element={<Game1 />} />
        <Route path='game2' element={<Game2 />} />
        <Route path='game3' element={<Game3 />} />
        <Route path='game4' element={<Game4 />} />
        <Route path='game5' element={<Game5 />} />
        <Route path='game6' element={<Game6 />} />
      </Route>
      <Route path='sandbox' element={<SandboxLayout />}>
        <Route index element={<Playground />} />
        <Route path='playground' element={<Playground />} />
        <Route
          path='flexible-compound-components'
          element={<FlexibleCompoundComponents />}
        />
        <Route path='compound-components' element={<CompoundComponents />} />
        <Route
          path='compound-components-simple'
          element={<CompoundComponentsSimple />}
        />
        <Route path='increment-redux-hooks' element={<IncrementReduxHooks />} />
        <Route path='game4' element={<h1>Game 4</h1>} />
        <Route path='game5' element={<h1>Game 5</h1>} />
        <Route path='game6' element={<h1>Game 6</h1>} />
      </Route>
      <Route path='todos-test' element={<TodosTestLayout />}>
        <Route index element={<TodosBasic />} />
        <Route path='todos-basic' element={<TodosBasic />} />
        <Route path='todos-state1' element={<TodosSetState1 />} />
        <Route path='todos-state2' element={<TodosSetState2 />} />
        <Route path='todos-state3' element={<h1>Todos State 3</h1>} />
        <Route path='todos-server-actions' element={<TodosAction />} />
        <Route path='todos-actions' element={<TodosActions />} />
        <Route path='todos-action-state' element={<TodosActionState />} />
        <Route path='todo-context' element={<TodosContext />} />
        <Route path='todos-flux' element={<TodosFlux />} />
        <Route path='todos-redux' element={<TodosRedux />} />
        <Route
          path='todos-context-fakeapi-localstorage'
          element={<TodoApp />}
        />
      </Route>
      <Route path='rsc' element={<RscLayout />}>
        <Route index element={<AppHeader />} />
        <Route path='rsc-simple' element={<AppHeader />} />
      </Route>
      <Route path='transition' element={<TransitionLayout />}>
        <Route index element={<TransitionTabs />} />
        <Route path='transition-tabs' element={<TransitionTabs />} />
        <Route
          path='transition-optimistic'
          element={<TransitionOptimistic />}
        />
        <Route path='transition-suspense' element={<TransitionSuspense />} />
      </Route>
      <Route path='hooks' element={<HooksLayout />}>
        <Route index element={<NotesApp />} />
        <Route path='use-hook-notes-app' element={<NotesApp />} />
        <Route path='parallel-dashboard' element={<NoteDashboardApp />} />
        <Route
          path='parallel-dashboard/:noteId'
          element={<NoteDashboardApp />}
        />
        <Route path='context-app' element={<ContextApp />} />
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
      <Route path='weather' element={<Weather />} loader={weatherLoader} />
      <Route path='loading-spinner' element={<LoadingSpinner />} />
      <Route path='not-found' element={<NotFound />} />
      <Route path='*' element={<NotFound />} />
    </Route>
  )
);

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </QueryClientProvider>
  );
};

export default App;
