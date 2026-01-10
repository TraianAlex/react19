import { useState, useTransition, useDeferredValue, startTransition } from 'react';
import { jsonPlaceholderApi } from '../shared/api';
import { LoadingSpinner } from '../shared/components/LoadingSpinner';
import type { Post } from '../shared/types';

// Heavy computation component to demonstrate concurrent features
function HeavyList({ filter }: { filter: string }) {
  const deferredFilter = useDeferredValue(filter);
  
  // Simulate heavy computation
  const items = Array.from({ length: 10000 }, (_, i) => ({
    id: i,
    name: `Item ${i}`,
    description: `Description for item ${i} with some text content`
  }));

  const filteredItems = items.filter(item => 
    item.name.toLowerCase().includes(deferredFilter.toLowerCase()) ||
    item.description.toLowerCase().includes(deferredFilter.toLowerCase())
  );

  const isStale = filter !== deferredFilter;

  return (
    <div className={`${isStale ? 'opacity-50' : ''}`}>
      <div className="d-flex justify-content-between align-items-center mb-2">
        <h6>Heavy List ({filteredItems.length} items)</h6>
        {isStale && (
          <span className="badge bg-warning text-dark">Updating...</span>
        )}
      </div>
      
      <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
        {filteredItems.slice(0, 50).map((item) => (
          <div key={item.id} className="card card-body py-1 mb-1 small">
            <strong>{item.name}</strong>
            <span className="text-muted">{item.description}</span>
          </div>
        ))}
        {filteredItems.length > 50 && (
          <div className="text-center text-muted small">
            ... and {filteredItems.length - 50} more items
          </div>
        )}
      </div>
    </div>
  );
}

// Component that demonstrates useTransition for non-urgent updates
function PostsWithTransition() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isPending, startTransition] = useTransition();
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);

  const loadPosts = () => {
    startTransition(async () => {
      try {
        const fetchedPosts = await jsonPlaceholderApi.getPosts();
        setPosts(fetchedPosts.slice(0, 20));
        setFilteredPosts(fetchedPosts.slice(0, 20));
      } catch (error) {
        console.error('Failed to load posts:', error);
      }
    });
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    
    // Use startTransition for non-urgent filtering
    startTransition(() => {
      const filtered = posts.filter(post =>
        post.title.toLowerCase().includes(term.toLowerCase()) ||
        post.body.toLowerCase().includes(term.toLowerCase())
      );
      setFilteredPosts(filtered);
    });
  };

  return (
    <div>
      <div className="d-flex gap-2 mb-3">
        <button 
          className="btn btn-primary btn-sm"
          onClick={loadPosts}
          disabled={isPending}
        >
          {isPending ? 'Loading...' : 'Load Posts'}
        </button>
        
        <input 
          type="text"
          className="form-control form-control-sm"
          placeholder="Search posts..."
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
          style={{ maxWidth: '200px' }}
        />
        
        {isPending && (
          <span className="badge bg-info align-self-center">
            Filtering...
          </span>
        )}
      </div>

      <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
        {filteredPosts.map((post) => (
          <div key={post.id} className="card mb-2">
            <div className="card-body py-2">
              <h6 className="card-title small">{post.title}</h6>
              <p className="card-text small text-muted mb-1">
                {post.body.substring(0, 100)}...
              </p>
              <small className="text-muted">User {post.userId}</small>
            </div>
          </div>
        ))}
        
        {posts.length > 0 && filteredPosts.length === 0 && (
          <div className="text-center text-muted">
            No posts match your search
          </div>
        )}
      </div>
    </div>
  );
}

// Batch updates demonstration
function BatchUpdatesDemo() {
  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);
  const [count3, setCount3] = useState(0);
  const [renderCount, setRenderCount] = useState(0);

  // This will cause multiple renders in React 17, but batched in React 19
  const handleMultipleUpdates = () => {
    setCount1(prev => prev + 1);
    setCount2(prev => prev + 1);
    setCount3(prev => prev + 1);
    setRenderCount(prev => prev + 1);
  };

  // This uses startTransition to batch updates
  const handleTransitionUpdates = () => {
    startTransition(() => {
      setCount1(prev => prev + 10);
      setCount2(prev => prev + 10);
      setCount3(prev => prev + 10);
      setRenderCount(prev => prev + 1);
    });
  };

  return (
    <div className="card p-3">
      <h6>Automatic Batching Demo</h6>
      <div className="row mb-3">
        <div className="col-3">
          <div className="text-center">
            <div className="h4 text-primary">{count1}</div>
            <small>Counter 1</small>
          </div>
        </div>
        <div className="col-3">
          <div className="text-center">
            <div className="h4 text-success">{count2}</div>
            <small>Counter 2</small>
          </div>
        </div>
        <div className="col-3">
          <div className="text-center">
            <div className="h4 text-warning">{count3}</div>
            <small>Counter 3</small>
          </div>
        </div>
        <div className="col-3">
          <div className="text-center">
            <div className="h4 text-info">{renderCount}</div>
            <small>Renders</small>
          </div>
        </div>
      </div>
      
      <div className="d-flex gap-2">
        <button 
          className="btn btn-outline-primary btn-sm"
          onClick={handleMultipleUpdates}
        >
          Multiple Updates
        </button>
        <button 
          className="btn btn-outline-success btn-sm"
          onClick={handleTransitionUpdates}
        >
          Transition Updates
        </button>
        <button 
          className="btn btn-outline-secondary btn-sm"
          onClick={() => {
            setCount1(0);
            setCount2(0);
            setCount3(0);
            setRenderCount(0);
          }}
        >
          Reset
        </button>
      </div>
      
      <small className="text-muted mt-2">
        React 19 automatically batches all updates, reducing unnecessary renders
      </small>
    </div>
  );
}

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
