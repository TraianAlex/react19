import { useRef, useState } from 'react';
import { Child, TabTest } from './Child';
import SpreadJS from '../components/SpreadJS';
import { AppWithContext } from '../context/TestContext';
import ResetState from '../diverse/reset-state';

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
      <div className='d-flex gap-2'>
        <button onClick={handleClick} className='btn btn-primary'>
          Parent button
        </button>
        <Child clickParentHandler={handleClick} value={value} />
      </div>
      <div>
        {/* <TabTest /> */}
        {/* <AppWithContext /> */}
        {/* <ResetState /> */}
      </div>
      {/* <SpreadJS /> */}
    </div>
  );
};

export default Playground;
