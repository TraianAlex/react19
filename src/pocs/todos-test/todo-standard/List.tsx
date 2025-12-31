import { memo } from 'react';

export const List = memo(({ list }: { list: string[] }) => {
  console.log('render List component');

  return (
    <>
      {list?.map((item: string) => (
        <span key={Math.random()}>{item} / </span>
      ))}
    </>
  );
});
