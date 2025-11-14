import { useState } from 'react';
import { Child } from './Child';
import SpreadJS from './SpreadJS';

const Playground = () => {
  const [value, setValue] = useState(1);

  const handleClick = () => {
    setValue((prev) => prev + 1);
    console.log(value); // 1
  };

  return (
    <div className='container'>
      <h2 onClick={handleClick}>Playground</h2>
      <div className='d-flex gap-2'>
        <button onClick={handleClick} className='btn btn-primary'>
          Parent button
        </button>
        <Child clickParentHandler={handleClick} value={value} />
      </div>
      <SpreadJS />
    </div>
  );
};

export default Playground;
