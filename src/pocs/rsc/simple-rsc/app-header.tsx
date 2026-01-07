'use server';

import AppHeaderClock from './app-header-clock';
import AppServerComponent from './app-server-component';
import AppThemeProvider from './app-theme-provider';
import AppContainer from './app-container';
import ServerForm from './server-form';

export default function AppHeader() {
  const isoDateString = new Date().toISOString();

  return (
    <AppThemeProvider>
      <AppContainer>
        <h2>Clock App</h2>
        <hr />
        <AppHeaderClock isoDateString={isoDateString}>
          <AppServerComponent />
        </AppHeaderClock>
        <ServerForm />
      </AppContainer>
    </AppThemeProvider>
  );
}
