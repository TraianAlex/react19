import { useState } from 'react';
import { Child, TabTest } from './Child';
import SpreadJS from '../components/SpreadJS';
import { AppContextProvider, SectionContext } from '../context/TestContext';
import ResetState from '../diverse/reset-state';
import { Marquee } from '../components/Marquee';
import CompoundComponentsDemo from '../compound-components/CompoundComponentsDemo';
import { AppProducts } from '../diverse/AppProducts';
import AppParentGrandChild from '../parent-grandchild/AppParentGrandChild';

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
        <CompoundComponentsDemo />
        {/* <TabTest /> */}
        <AppContextProvider>
          <SectionContext />
        </AppContextProvider>
        <ResetState />
      </main>
      <AppProducts />
      <AppParentGrandChild />
      {/* <SpreadJS /> */}
    </div>
  );
};

export default Playground;
