import { useState } from 'react';
import HeavyList from './HeavyList';
import PostsWithTransition from './PostsWithTransition';
import BatchUpdatesDemo from './BatchUpdate';

export function ConcurrentDemo() {
  const [filter, setFilter] = useState('');
  const [selectedTab, setSelectedTab] = useState<'deferred' | 'transition' | 'batching'>('deferred');

  return (
    <div className="container-fluid">
      <div className="row mb-4">
        <div className="col">
          <h2 className="h4 mb-3">React 19 Concurrent Features Demo</h2>
          <p className="text-muted mb-3">
            React 19 enhances concurrent features with better automatic batching, improved useTransition,
            and useDeferredValue for handling expensive operations without blocking the UI.
          </p>
          
          <div className="btn-group mb-3" role="group">
            <button
              type="button"
              className={`btn btn-sm ${selectedTab === 'deferred' ? 'btn-primary' : 'btn-outline-primary'}`}
              onClick={() => setSelectedTab('deferred')}
            >
              useDeferredValue
            </button>
            <button
              type="button"
              className={`btn btn-sm ${selectedTab === 'transition' ? 'btn-primary' : 'btn-outline-primary'}`}
              onClick={() => setSelectedTab('transition')}
            >
              useTransition
            </button>
            <button
              type="button"
              className={`btn btn-sm ${selectedTab === 'batching' ? 'btn-primary' : 'btn-outline-primary'}`}
              onClick={() => setSelectedTab('batching')}
            >
              Automatic Batching
            </button>
          </div>
        </div>
      </div>

      {selectedTab === 'deferred' && (
        <div className="row">
          <div className="col-lg-6">
            <h5>useDeferredValue Demo</h5>
            <p className="text-muted mb-3">
              Type in the input to see how useDeferredValue keeps the UI responsive
              during expensive filtering operations.
            </p>
            
            <div className="mb-3">
              <label htmlFor="filterInput" className="form-label">Filter Items:</label>
              <input 
                id="filterInput"
                type="text"
                className="form-control"
                placeholder="Type to filter 10,000 items..."
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              />
              <small className="text-muted">
                Input stays responsive while filtering happens in the background
              </small>
            </div>
          </div>
          
          <div className="col-lg-6">
            <HeavyList filter={filter} />
          </div>
        </div>
      )}

      {selectedTab === 'transition' && (
        <div className="row">
          <div className="col">
            <h5>useTransition Demo</h5>
            <p className="text-muted mb-3">
              useTransition marks updates as non-urgent, keeping the UI responsive
              during expensive operations like filtering large datasets.
            </p>
            
            <PostsWithTransition />
          </div>
        </div>
      )}

      {selectedTab === 'batching' && (
        <div className="row">
          <div className="col-lg-8">
            <h5>Automatic Batching Demo</h5>
            <p className="text-muted mb-3">
              React 19 automatically batches all state updates, even in async functions,
              timeouts, and event handlers, reducing unnecessary re-renders.
            </p>
            
            <BatchUpdatesDemo />
          </div>
          
          <div className="col-lg-4">
            <div className="alert alert-info">
              <h6 className="alert-heading">What's Happening:</h6>
              <ul className="small mb-0">
                <li>Multiple state updates are batched automatically</li>
                <li>Only one render occurs per batch</li>
                <li>Transitions can further optimize updates</li>
                <li>UI stays responsive during heavy operations</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      <div className="mt-4">
        <div className="alert alert-info">
          <h6 className="alert-heading">React 19 Concurrent Features:</h6>
          <div className="row">
            <div className="col-md-4">
              <strong>useDeferredValue:</strong>
              <ul className="small mb-0">
                <li>Defers expensive updates</li>
                <li>Keeps UI responsive</li>
                <li>Shows stale state during updates</li>
                <li>Perfect for search/filtering</li>
              </ul>
            </div>
            <div className="col-md-4">
              <strong>useTransition:</strong>
              <ul className="small mb-0">
                <li>Marks updates as non-urgent</li>
                <li>Provides pending state</li>
                <li>Interruptible updates</li>
                <li>Better user experience</li>
              </ul>
            </div>
            <div className="col-md-4">
              <strong>Automatic Batching:</strong>
              <ul className="small mb-0">
                <li>Batches all state updates</li>
                <li>Works in async functions</li>
                <li>Reduces re-renders</li>
                <li>Improves performance</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-3">
        <div className="card">
          <div className="card-body">
            <h6 className="card-title">Performance Tips:</h6>
            <div className="row">
              <div className="col-md-6">
                <ul className="small mb-0">
                  <li>Use useDeferredValue for expensive computations</li>
                  <li>Wrap non-urgent updates with useTransition</li>
                  <li>Let React handle batching automatically</li>
                </ul>
              </div>
              <div className="col-md-6">
                <ul className="small mb-0">
                  <li>Combine with Suspense for better UX</li>
                  <li>Use concurrent features for large datasets</li>
                  <li>Monitor performance with React DevTools</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
