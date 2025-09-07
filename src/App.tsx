import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.scss';
import { NavigationBar } from './components/navigation-bar/navigation-bar';
import Home from './components/home/home';

function App() {
  return (
    <BrowserRouter>
      <NavigationBar />
      <Routes>
        <Route path='/' element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
