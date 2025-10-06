import { Component, ComponentType, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ErrorBoundary, FallbackProps } from 'react-error-boundary';

interface CustomErrorBoundaryProps {
  children: ReactNode;
  FallbackComponent?: ComponentType<FallbackProps>;
}

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
}: CustomErrorBoundaryProps) => {
  return (
    <ErrorBoundary FallbackComponent={FallbackComponent}>
      {children}
    </ErrorBoundary>
  );
};

// The second way to handle errors
interface ErrorBoundaryState {
  hasError: boolean;
}

interface CustomErrorBoundaryProps {
  children: ReactNode;
  errorUI?: ReactNode;
}

export class CustomErrorBoundary2 extends Component<
  CustomErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: CustomErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: any) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error: any, errorInfo: any) {
    // You can also log the error to an error reporting service
    logErrorToMyService(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      if (this.props.errorUI) {
        return this.props.errorUI;
      }
      return (
        <>
          <h2 className='d-flex justify-content-center align-items-center vh-100'>
            Oops! Something went wrong.
          </h2>
          <Link to='/'>Go to Home Page</Link>
        </>
      );
    }

    return this.props.children;
  }
}

function logErrorToMyService(error: any, errorInfo: any) {
  console.error('error:', error);
}
