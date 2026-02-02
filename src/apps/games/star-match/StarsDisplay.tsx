import { utils } from './utils';

export const StarsDisplay = ({ count }: { count: number }) => (
  <>
    {utils.range(1, count).map((starId) => (
      <div key={starId} className='star' />
    ))}
  </>
);
