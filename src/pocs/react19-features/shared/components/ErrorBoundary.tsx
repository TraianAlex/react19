import { Component, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: any) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className='alert alert-danger m-3'>
            <h4 className='alert-heading'>Something went wrong!</h4>
            <p className='mb-0'>
              {this.state.error?.message || 'An unexpected error occurred'}
            </p>
            <hr />
            <button
              className='btn btn-outline-danger btn-sm'
              onClick={() =>
                this.setState({ hasError: false, error: undefined })
              }
            >
              Try Again
            </button>
          </div>
        )
      );
    }

    return this.props.children;
  }
}

// Enhanced Error Boundary specifically for use() hook errors
export class UseErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    console.log('UseErrorBoundary caught error:', error);
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: any) {
    console.error('UseErrorBoundary - Error caught:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className='alert alert-danger m-3'>
            <h4 className='alert-heading'>Error Caught by Boundary!</h4>
            <p className='mb-0'>
              <strong>Error:</strong>{' '}
              {this.state.error?.message || 'An unexpected error occurred'}
            </p>
            <hr />
            <button
              className='btn btn-outline-danger btn-sm'
              onClick={() =>
                this.setState({ hasError: false, error: undefined })
              }
            >
              Try Again
            </button>
          </div>
        )
      );
    }

    return this.props.children;
  }
}
