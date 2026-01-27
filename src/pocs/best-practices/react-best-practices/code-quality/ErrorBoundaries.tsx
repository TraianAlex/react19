import { Component, ReactNode, useState } from 'react';

const ErrorBoundaries = () => {
  return (
    <div className='container-fluid'>
      <h1 className='mb-4'>27. Error Boundaries</h1>

      <div className='row'>
        <div className='col-md-8 offset-md-2'>
          <div className='card border-success mb-4'>
            <div className='card-header bg-success text-white'>
              <h5 className='mb-0'>✅ Good: Error boundary implementation</h5>
            </div>
            <div className='card-body'>
              <ErrorBoundaryExample />
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
                Building applications that fail gracefully is crucial. Users shouldn't be faced with 
                white screens or broken features just because of network hiccups, API changes, or 
                unexpected data formats.
              </p>
              <p>
                Error boundaries are key to isolating errors at the component level. They let us catch 
                rendering errors in specific parts of the UI and show fallback content, preventing the 
                entire app from crashing. This way, issues become manageable, and users still get a 
                smooth experience even when something goes wrong.
              </p>
            </div>
          </div>

          <div className='card mb-4'>
            <div className='card-header'>
              <h5 className='mb-0'>Code Example</h5>
            </div>
            <div className='card-body'>
              <pre className='bg-light p-3 rounded' style={{ fontSize: '0.875rem' }}>
                <code>{`class FeatureErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  
  componentDidCatch(error, errorInfo) {
    // Log to monitoring service
    logError(error, errorInfo);
  }
  
  render() {
    if (this.state.hasError) {
      return (
        <ErrorFallback 
          error={this.state.error}
          retry={() => this.setState({ hasError: false, error: null })}
        />
      );
    }
    
    return this.props.children;
  }
}

// Wrap features, not the entire app
<FeatureErrorBoundary>
  <UserProfile />
</FeatureErrorBoundary>`}</code>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class FeatureErrorBoundary extends Component<
  { children: ReactNode },
  ErrorBoundaryState
> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log to monitoring service
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <ErrorFallback
          error={this.state.error}
          retry={() => this.setState({ hasError: false, error: null })}
        />
      );
    }

    return this.props.children;
  }
}

const ErrorFallback = ({
  error,
  retry,
}: {
  error: Error | null;
  retry: () => void;
}) => {
  return (
    <div className='alert alert-danger'>
      <h5>Something went wrong</h5>
      <p>{error?.message || 'An unexpected error occurred'}</p>
      <button className='btn btn-primary' onClick={retry}>
        Try Again
      </button>
    </div>
  );
};

// Component that might throw an error
const BuggyComponent = ({ shouldThrow }: { shouldThrow: boolean }) => {
  if (shouldThrow) {
    throw new Error('This is a test error!');
  }
  return <div className='alert alert-success'>Component rendered successfully!</div>;
};

const ErrorBoundaryExample = () => {
  const [shouldThrow, setShouldThrow] = useState(false);

  return (
    <div>
      <div className='mb-3'>
        <button
          className='btn btn-danger'
          onClick={() => setShouldThrow(true)}
        >
          Trigger Error
        </button>
        <button
          className='btn btn-secondary ms-2'
          onClick={() => setShouldThrow(false)}
        >
          Reset
        </button>
      </div>

      <FeatureErrorBoundary>
        <BuggyComponent shouldThrow={shouldThrow} />
      </FeatureErrorBoundary>

      <div className='mt-3'>
        <small className='text-muted'>
          <strong>Benefits:</strong>
          <ul className='mb-0 mt-2'>
            <li>Errors are isolated to specific features</li>
            <li>Rest of the app continues to work</li>
            <li>Users see friendly error messages</li>
            <li>Errors can be logged to monitoring services</li>
            <li>Wrap features, not the entire app</li>
          </ul>
        </small>
      </div>
    </div>
  );
};

export default ErrorBoundaries;
