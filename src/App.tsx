import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.scss';
import { NavigationBar } from './components/navigation-bar/navigation-bar';

function App() {
  const [count, setCount] = useState<number>(0);

  return (
    <div className='container'>
      <NavigationBar />
      <div></div>
    </div>
  );
}

export default App;
