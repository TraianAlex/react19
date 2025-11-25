import { useRef, useState } from 'react';
import { Child, TabTest } from './Child';
import SpreadJS from '../components/SpreadJS';
import { AppWithContext } from '../context/TestContext';
import ResetState from '../diverse/reset-state';
import { Marquee } from '../components/Marquee';
import MenuDemo from '../compound-components/menu/MenuDemo';

const Playground = () => {
  const [value, setValue] = useState(1);

  const handleClick = () => {
    setValue((prev) => prev + 1);
    console.log('handleClick', value); // 1
  };

  console.log('Playground rendered', value);

  return (
    <div className='container'>
      <h2 onClick={handleClick}>Playground</h2>
      {/* <div className='d-flex gap-2'>
        <button onClick={handleClick} className='btn btn-primary'>
          Parent button
        </button>
        <Child clickParentHandler={handleClick} value={value} />
      </div> */}
      <main className='d-flex flex-column gap-2'>
        <Marquee>🧛‍♀️ Welcome to Horrorville 🧛‍♀️'</Marquee>
        <MenuDemo />
        {/* <TabTest /> */}
        {/* <AppWithContext /> */}
        {/* <ResetState /> */}
      </main>
      {/* <SpreadJS /> */}
    </div>
  );
};

export default Playground;
