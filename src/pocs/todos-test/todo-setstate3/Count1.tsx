import { useSelector } from './TodoStore';

export const Count1 = () => {
  // const [count1] = useStore('count1');
  const count1 = useSelector((state) => state.count1);

  console.log('render Count1');

  return (
    <div style={{ width: '90%', margin: 'auto' }}>
      <hr />
      <div>Count1: {count1} rows</div>
    </div>
  );
};
