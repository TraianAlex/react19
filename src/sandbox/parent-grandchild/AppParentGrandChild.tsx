import { useCallback, useEffect, useMemo, useState } from 'react';
import GrandParent from './GrandParent';
import stylesModule from './styles.module.scss';

export const styles = stylesModule as Record<string, string>;

export default function AppParentGrandChild() {
  const [count, setCount] = useState(0);
  const [darkMode, setDarkMode] = useState(false);

  const increment = useCallback(() => {
    setCount((prevCount) => prevCount + 1);
  }, []);

  function decrement() {
    setCount((prevCount) => prevCount - 1);
  }

  const style = useMemo(() => {
    return {
      backgroundColor: darkMode ? '#2b283a' : '#e9e3ff',
      color: darkMode ? '#e9e3ff' : '#2b283a',
    };
  }, [darkMode]);

  useEffect(() => {
    console.log('style changed');
  }, [style]);

  console.log('[GP] [P] [C] [GC] APP just rendered');
  return (
    <div className={styles.container}>
      <button className={styles.button} onClick={decrement}>
        -
      </button>
      <button className={styles.button} onClick={increment}>
        +
      </button>
      <h2>Count: {count}</h2>
      <button
        className={styles.button}
        onClick={() => setDarkMode((prev) => !prev)}
      >
        {darkMode ? 'Switch to Light' : 'Switch to Dark'}
      </button>
      <p className='m-2'>App component</p>
      <GrandParent style={style} increment={increment} />
      <GrandParent style={undefined} />
    </div>
  );
}
