import { Component, ReactNode } from 'react';

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export default class ErrorBoundary extends Component<
  {
    children: ReactNode;
    fallback?: (error: Error, reset: () => void) => ReactNode;
  },
  ErrorBoundaryState
> {

  constructor(props: {
    children: ReactNode;
    fallback?: (error: Error, reset: () => void) => ReactNode;
  }) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  reset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError && this.state.error) {
      if (this.props.fallback) {
        return this.props.fallback(this.state.error, this.reset);
      }
      return ErrorFallback(this.state.error, this.reset);
    }

    return this.props.children;
  }
}

export function ErrorFallback(error: Error, reset: () => void): ReactNode {
  return (
    <div className='alert alert-warning m-4' role='alert'>
      <h2 className='alert-heading'>Something went wrong:</h2>
      <pre className='bg-white p-3 rounded border'>{error.message}</pre>
      <button onClick={reset} className='btn btn-warning mt-3'>
        Try again
      </button>
    </div>
  );
}
