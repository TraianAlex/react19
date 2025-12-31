import { memo } from 'react';

export const Decoration = memo(({ title }: { title: string }) => {
  console.log('render Title Decoration component');

  return (
    <h5>
      <u>{title}</u>
    </h5>
  );
});
