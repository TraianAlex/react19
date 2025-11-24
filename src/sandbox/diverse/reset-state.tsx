import { useRef, useState } from 'react';

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
      <button onClick={handleClick}>Click +1</button>
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

const ResetState = () => {
  return (
    <div>
      <App />
    </div>
  );
};

export default ResetState;
