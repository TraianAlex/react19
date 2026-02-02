import { utils } from './utils';

export const StarsDisplay = ({ count }: { count: number }) => (
  <div className='row g-1 justify-content-center'>
    {utils.range(1, count).map((starId) => (
      <div key={starId} className='col-4 d-flex justify-content-center'>
        <span className='text-dark fs-1'>★</span>
      </div>
    ))}
  </div>
);
