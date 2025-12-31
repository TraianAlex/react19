import { useGlobalState } from './TodoStore';

export const Count = () => {
  const [count] = useGlobalState('count');

  console.log('render Count', count);

  return <div>{count} rows</div>;
};
