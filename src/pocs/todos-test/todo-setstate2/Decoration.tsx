import { useGlobalState } from './TodoStore';

export const Decoration = () => {
  const [decor] = useGlobalState('title');

  console.log('render Title');

  return (
    <>
      <div>{decor}</div>
      <div>{}</div>
    </>
  );
};
