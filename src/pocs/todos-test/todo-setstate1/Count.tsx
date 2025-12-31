import { useSelector } from './store';
import { todoStore } from './TodoStore';

export const Count = () => {
  const count = useSelector<number>(todoStore, 'count');

  console.log('render Count', count);

  return <div>{count} rows</div>;
};
