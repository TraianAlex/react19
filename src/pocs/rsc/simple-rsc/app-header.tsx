'use server';

import AppHeaderClock from './app-header-clock';

export default function AppHeader() {
  const isoDateString = new Date().toISOString();

  return (
    <div className='bg-light text-dark w-auto'>
      <h2>Clock App</h2>
      <hr />
      <AppHeaderClock isoDateString={isoDateString} />
    </div>
  );
}
