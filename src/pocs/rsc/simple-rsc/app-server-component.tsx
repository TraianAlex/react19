'use server';

import AppShowTheme from './app-show-theme';

export default function AppServerComponent() {
  return (
    <div className='container border'>
      <h3>I'm a Server Component</h3>
      <AppShowTheme />
    </div>
  );
}
