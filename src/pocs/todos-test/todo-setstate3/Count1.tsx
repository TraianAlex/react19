import { useStore } from './TodoStore';

export const Count1 = () => {
  const count = useStore('count1');

  console.log('render Count1');

  return (
    <div style={{ width: '90%', margin: 'auto' }}>
      <hr />
      <div>Count1: {count} rows</div>
    </div>
  );
};
