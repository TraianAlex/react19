import { useStore } from './TodoStore';

export const Count = () => {
  const count = useStore('count');

  console.log('render Count');

  return (
    <div style={{ width: '90%', margin: 'auto' }}>
      <hr />
      <div>{count} rows</div>
    </div>
  );
};
