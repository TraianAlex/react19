import { Component, ReactNode, ErrorInfo } from 'react';

const ErrorBoundaries = () => {
  return (
    <div className='container-fluid'>
      <h1 className='mb-4'>10. Error Boundaries</h1>

      <div className='row'>
        <div className='col-md-8'>
          <div className='card border-success mb-4'>
            <div className='card-header bg-success text-white'>
              <h5 className='mb-0'>✅ Good: Error Boundary</h5>
            </div>
            <div className='card-body'>
              <GoodApproach />
            </div>
          </div>
        </div>
      </div>

      <div className='row mt-4'>
        <div className='col-12'>
          <div className='card mb-4'>
            <div className='card-header'>
              <h5 className='mb-0'>Explanation</h5>
            </div>
            <div className='card-body'>
              <p>
                Use Error Boundaries to catch JavaScript errors anywhere in the component tree and 
                display fallback UI. This prevents the entire app from crashing when an error occurs.
              </p>
            </div>
          </div>

          <div className='card mb-4'>
            <div className='card-header'>
              <h5 className='mb-0'>Code Example</h5>
            </div>
            <div className='card-body'>
              <pre className='bg-light p-3 rounded' style={{ fontSize: '0.875rem' }}>
                <code>{`// ✅ Good: Error Boundary
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught:', error, errorInfo);
    // Log to error reporting service
  }

  render() {
    if (this.state.hasError) {
      return <FallbackUI error={this.state.error} />;
    }
    return this.props.children;
  }
}

// Usage
<ErrorBoundary>
  <App />
</ErrorBoundary>`}</code>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ✅ Good: Error Boundary
interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error caught:', error, errorInfo);
    // In production, log to error reporting service
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className='alert alert-danger'>
          <h5>Something went wrong</h5>
          <p>{this.state.error?.message}</p>
          <button
            className='btn btn-secondary'
            onClick={() => this.setState({ hasError: false, error: null })}
          >
            Try Again
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

// Component that throws an error
const BuggyComponent = ({ shouldThrow }: { shouldThrow: boolean }) => {
  if (shouldThrow) {
    throw new Error('This is a test error!');
  }
  return <div className='alert alert-success'>Component working correctly</div>;
};

const GoodApproach = () => {
  const [shouldThrow, setShouldThrow] = useState(false);

  return (
    <div>
      <button
        className='btn btn-danger mb-3'
        onClick={() => setShouldThrow(true)}
      >
        Trigger Error
      </button>
      <ErrorBoundary>
        <BuggyComponent shouldThrow={shouldThrow} />
      </ErrorBoundary>
      <small className='text-muted mt-2 d-block'>
        Benefits: Prevents app crash, graceful error handling, better user experience
      </small>
    </div>
  );
};

import { useState } from 'react';

export default ErrorBoundaries;
