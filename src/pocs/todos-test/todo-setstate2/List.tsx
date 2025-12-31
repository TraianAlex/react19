import { useGlobalState } from './TodoStore';

export const List = () => {
  const [list] = useGlobalState('list');

  console.log('render List');

  return (
    <>
      {list?.map((item: string) => (
        <span key={Math.random()}>{item} / </span>
      ))}
    </>
  );
};
