import { useRef, useState } from 'react';

function Counter() {
  const [score, setScore] = useState(0);
  const clickCountRef = useRef(0);

  const handleClick = () => {
    clickCountRef.current++;
    setScore(score + 1);
  };

  return (
    <div className='d-flex gap-2 mb-2'>
      <p>Score:{score}</p>
      <button className='btn btn-primary' onClick={handleClick}>
        Click +1
      </button>
      <p>Click count ref: {clickCountRef.current}</p>
    </div>
  );
}

function App() {
  const [showFirst, setShowFirst] = useState(true);

  return (
    <div className='d-flex justify-content-evenly align-items-center gap-2'>
      <div>
        {/* Same position in tree - state is preserved */}
        {showFirst ? <Counter /> : <Counter />}

        {/* Different positions in tree - state is reset */}
        {showFirst && <Counter />}
        {!showFirst && <Counter />}

        {/* Force reset with key */}
        <Counter key={showFirst ? 'first' : 'second'} />
      </div>
      <div>
        <button
          className='btn btn-secondary'
          onClick={() => setShowFirst(!showFirst)}
        >
          Toggle
        </button>
      </div>
    </div>
  );
}

const ResetState = () => {
  return (
    <div>
      <App />
    </div>
  );
};

export default ResetState;
