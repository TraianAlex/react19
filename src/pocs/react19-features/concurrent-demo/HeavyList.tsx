import { useDeferredValue } from 'react';

// Heavy computation component to demonstrate concurrent features
export default function HeavyList({ filter }: { filter: string }) {
  const deferredFilter = useDeferredValue(filter);

  // Simulate heavy computation
  const items = Array.from({ length: 10000 }, (_, i) => ({
    id: i,
    name: `Item ${i}`,
    description: `Description for item ${i} with some text content`,
  }));

  const filteredItems = items.filter(
    (item) =>
      item.name.toLowerCase().includes(deferredFilter.toLowerCase()) ||
      item.description.toLowerCase().includes(deferredFilter.toLowerCase())
  );

  const isStale = filter !== deferredFilter;

  return (
    <div className={`${isStale ? 'opacity-50' : ''}`}>
      <div className='d-flex justify-content-between align-items-center mb-2'>
        <h6>Heavy List ({filteredItems.length} items)</h6>
        {isStale && (
          <span className='badge bg-warning text-dark'>Updating...</span>
        )}
      </div>

      <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
        {filteredItems.slice(0, 50).map((item) => (
          <div key={item.id} className='card card-body py-1 mb-1 small'>
            <strong>{item.name}</strong>
            <span className='text-muted'>{item.description}</span>
          </div>
        ))}
        {filteredItems.length > 50 && (
          <div className='text-center text-muted small'>
            ... and {filteredItems.length - 50} more items
          </div>
        )}
      </div>
    </div>
  );
}
