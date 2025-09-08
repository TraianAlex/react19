import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.scss';
import { NavigationBar } from './components/navigation-bar';
import Home from './components/home';
import Todos from './apps/todos';
import WatchList from './apps/watch-list';
import Layout from './components/layout.tsx';
import { HomeDetails } from './components/home/home-detail';

function App() {
  return (
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
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
