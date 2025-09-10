import React from 'react';
import { ErrorBoundary, FallbackProps } from 'react-error-boundary';

const CustomFallbackUI = ({ error, resetErrorBoundary }: FallbackProps) => (
  <div className='d-flex flex-column justify-content-center align-items-center vh-100'>
    <h2>Oops! Something went wrong.</h2>
    <p>{error.message}</p>
    <button className='btn btn-primary' onClick={resetErrorBoundary}>
      Retry
    </button>
  </div>
);

export const CustomErrorBoundary = ({
  children,
  FallbackComponent = CustomFallbackUI,
}: {
  children: React.ReactNode;
  FallbackComponent?: React.ComponentType<FallbackProps>;
}) => {
  return (
    <ErrorBoundary FallbackComponent={FallbackComponent}>
      {children}
    </ErrorBoundary>
  );
};
