import { memo } from 'react';
import { useStore } from './TodoStore';

export const Count2 = memo(() => {
  const count2 = useStore('count2');

  console.log('render Count2');

  return <div style={{ width: '90%', margin: 'auto' }}>Count2: {count2}</div>;
});
