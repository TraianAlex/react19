import { useState, useMemo } from 'react';

const MeasureFirst = () => {
  return (
    <div className='container-fluid'>
      <h1 className='mb-4'>17. Measure First, Optimize Second</h1>

      <div className='row'>
        <div className='col-md-8 offset-md-2'>
          <div className='card border-success mb-4'>
            <div className='card-header bg-success text-white'>
              <h5 className='mb-0'>✅ Good: Measure first approach</h5>
            </div>
            <div className='card-body'>
              <ExampleComponent />
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
                Performance isn't about tweaking for the sake of it. Every optimization brings its 
                own set of tradeoffs.. sometimes you gain speed at the cost of added complexity, 
                reduced readability, or a bigger bundle.
              </p>
              <p>
                What I feel is, the most experienced Frontend developers start by measuring. They 
                make sure improvements really matter before changing anything.
              </p>
              <p>
                React DevTools Profiler is the go-to tool here. It helps spot components that 
                re-render more often than they should, expensive renders that block the main thread, 
                or unnecessary work happening in child components. This kind of investigation lets 
                us focus our efforts where they'll have real impact.
              </p>
              <p>
                When it comes to useMemo and useCallback, they're "options", not "must-haves". 
                The goal isn't to sprinkle them everywhere, but to use them when profiling shows 
                a real benefit. That way, optimizations stay purposeful and maintainable.
              </p>
            </div>
          </div>

          <div className='card mb-4'>
            <div className='card-header'>
              <h5 className='mb-0'>Code Example</h5>
            </div>
            <div className='card-body'>
              <pre className='bg-light p-3 rounded' style={{ fontSize: '0.875rem' }}>
                <code>{`// Don't memoize everything
const ExpensiveComponent = ({ data, filter }) => {
  // This is fine - simple string operations are cheap
  const title = data.name.toUpperCase();
  
  // This warrants memoization - expensive computation
  const processedData = useMemo(() => {
    return data.items
      .filter(item => item.category === filter)
      .map(item => ({
        ...item,
        score: calculateComplexScore(item)
      }))
      .sort((a, b) => b.score - a.score);
  }, [data.items, filter]);
  
  return (
    <div>
      <h1>{title}</h1>
      <DataList items={processedData} />
    </div>
  );
};`}</code>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Example showing when to memoize
const ExampleComponent = () => {
  const [filter, setFilter] = useState('all');
  const [data] = useState(() =>
    Array.from({ length: 1000 }, (_, i) => ({
      id: i,
      name: `Item ${i}`,
      category: i % 2 === 0 ? 'even' : 'odd',
      score: Math.random() * 100,
    }))
  );

  // This is fine - simple string operations are cheap
  const title = data[0]?.name.toUpperCase() || '';

  // This warrants memoization - expensive computation
  const processedData = useMemo(() => {
    return data
      .filter((item) => (filter === 'all' ? true : item.category === filter))
      .map((item) => ({
        ...item,
        score: calculateComplexScore(item),
      }))
      .sort((a, b) => b.score - a.score);
  }, [data, filter]);

  return (
    <div>
      <h5>{title}</h5>
      <div className='mb-3'>
        <label className='form-label'>Filter:</label>
        <select
          className='form-select'
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value='all'>All</option>
          <option value='even'>Even</option>
          <option value='odd'>Odd</option>
        </select>
      </div>
      <div className='alert alert-info'>
        Showing {processedData.length} items (out of {data.length} total)
      </div>
      <ul className='list-group' style={{ maxHeight: '300px', overflowY: 'auto' }}>
        {processedData.slice(0, 20).map((item) => (
          <li key={item.id} className='list-group-item'>
            {item.name} - Score: {item.score.toFixed(2)}
          </li>
        ))}
      </ul>
      <div className='mt-3'>
        <small className='text-muted'>
          <strong>Key Points:</strong>
          <ul className='mb-0 mt-2'>
            <li>
              <code>title</code> - Simple string operation, no memoization needed
            </li>
            <li>
              <code>processedData</code> - Expensive computation (filter, map, sort),
              memoized with useMemo
            </li>
            <li>
              Use React DevTools Profiler to measure actual performance before optimizing
            </li>
          </ul>
        </small>
      </div>
    </div>
  );
};

// Simulate expensive calculation
const calculateComplexScore = (item: { id: number; name: string; score: number }) => {
  // Simulate complex calculation
  let score = item.score;
  for (let i = 0; i < 100; i++) {
    score = Math.sqrt(score * item.id) + Math.sin(score);
  }
  return score;
};

export default MeasureFirst;
