import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.scss';
import { NavigationBar } from './components/navigation-bar/navigation-bar';
import Home from './components/home/home';
import Todos from './apps/todos/todos';
import WatchList from './apps/watch-list/watch-list';
import Layout from './components/layout.tsx/layout';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path='/' element={<Home />} />
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
