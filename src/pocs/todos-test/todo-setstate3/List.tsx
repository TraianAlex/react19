import { useEffect } from 'react';
import { useStore } from './TodoStore';

export const List = () => {
  const [list, setList] = useStore('list');

  useEffect(() => {
    setList(() => ['initial list']);
  }, []);

  console.log('render List');

  return (
    <div style={{ width: '90%', margin: 'auto' }}>
      <hr />
      {list?.map((item: string, i: number) => (
        <span key={Math.random()}>
          {item} {i + 1} /{' '}
        </span>
      ))}
    </div>
  );
};
