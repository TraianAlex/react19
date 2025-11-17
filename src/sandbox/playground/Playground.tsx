import { useRef, useState } from 'react';
import { Child, TabTest } from './Child';
import SpreadJS from './SpreadJS';
import { AppWithContext } from './TestContext';

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
        <TabTest />
        <AppWithContext />
        <App />
      </div>
      <SpreadJS />
    </div>
  );
};

function Counter() {
  const [score, setScore] = useState(0);
  const clickCountRef = useRef(0);

  const handleClick = () => {
    clickCountRef.current++;
    setScore(score + 1);
  };

  return (
    <div>
      <p>{score}</p>
      <button onClick={handleClick}>+1</button>
      <p>Click count ref: {clickCountRef.current}</p>
    </div>
  );
}

function App() {
  const [showFirst, setShowFirst] = useState(true);

  return (
    <div>
      {/* Same position in tree - state is preserved */}
      {showFirst ? <Counter /> : <Counter />}

      {/* Different positions in tree - state is reset */}
      {showFirst && <Counter />}
      {!showFirst && <Counter />}

      {/* Force reset with key */}
      <Counter key={showFirst ? 'first' : 'second'} />
      <button onClick={() => setShowFirst(!showFirst)}>Toggle</button>
    </div>
  );
}

export default Playground;
