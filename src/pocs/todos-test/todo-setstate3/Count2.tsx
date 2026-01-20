import { memo } from 'react';
import { State } from './store';
import { useSelector } from './TodoStore';

export const Count2 = memo(() => {
  // const [count2] = useStore('count2');
  const count2 = useSelector<number>((state: State) => state.count2);

  console.log('render Count2');

  return <div className='text-center mb-2'>Count2: {count2}</div>;
});
