import { memo } from 'react';

export const Count = memo(({ count }: { count: number }) => {
  console.log('render Count component', count);

  return <div>{count} rows</div>;
});
