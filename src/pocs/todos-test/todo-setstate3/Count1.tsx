import { useSelector } from './TodoStore';

export const Count1 = () => {
  // const [count1] = useStore('count1');
  const count1 = useSelector((state) => state.count1);

  console.log('render Count1');

  return (
    <div className='text-center'>
      <hr />
      <div>Count1: {count1} rows</div>
    </div>
  );
};
