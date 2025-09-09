import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { RootState } from './state/store';

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  return isAuthenticated ? children : <Navigate to='/login' replace />;
};
