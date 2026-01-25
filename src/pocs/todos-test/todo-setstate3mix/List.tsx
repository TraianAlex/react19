import { useEffect } from 'react';
import { useStore } from './actions';

export const List = () => {
  const [list, setList] = useStore('list');

  useEffect(() => {
    setList(() => ['initial list']);
  }, []);

  console.log('render List');

  return (
    <div className='text-center border border-secondary rounded p-2 mt-3'>
      {list?.map((item: string, i: number) => (
        <span key={crypto.randomUUID()}>
          {item} {i + 1} /{' '}
        </span>
      ))}
    </div>
  );
};
