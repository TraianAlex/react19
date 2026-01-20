import { memo } from 'react';
import { useSelector } from './TodoStore';

export const Count2 = memo(() => {
  // const [count2] = useStore('count2');
  const count2 = useSelector<number>((state) => state.count2);

  console.log('render Count2');

  return <div style={{ width: '90%', margin: 'auto' }}>Count2: {count2}</div>;
});
