import { useState } from 'react';

const Virtualization = () => {
  return (
    <div className='container-fluid'>
      <h1 className='mb-4'>9. Virtualization for Long Lists</h1>

      <div className='row'>
        <div className='col-md-6'>
          <div className='card border-danger mb-4'>
            <div className='card-header bg-danger text-white'>
              <h5 className='mb-0'>❌ Bad: Render all items</h5>
            </div>
            <div className='card-body'>
              <BadApproach />
            </div>
          </div>
        </div>

        <div className='col-md-6'>
          <div className='card border-success mb-4'>
            <div className='card-header bg-success text-white'>
              <h5 className='mb-0'>✅ Good: Virtualized list</h5>
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
                Use virtualization for rendering large lists to maintain performance. Only render 
                items that are visible in the viewport, dramatically improving performance for 
                long lists.
              </p>
            </div>
          </div>

          <div className='card mb-4'>
            <div className='card-header'>
              <h5 className='mb-0'>Code Example</h5>
            </div>
            <div className='card-body'>
              <pre className='bg-light p-3 rounded' style={{ fontSize: '0.875rem' }}>
                <code>{`// ❌ Bad: Render all items
const List = ({ items }) => (
  <ul>
    {items.map(item => <li key={item.id}>{item.name}</li>)}
  </ul>
);

// ✅ Good: Virtualized list
import { FixedSizeList } from 'react-window';

const VirtualizedList = ({ items }) => (
  <FixedSizeList
    height={600}
    itemCount={items.length}
    itemSize={35}
    width="100%"
  >
    {({ index, style }) => (
      <div style={style}>{items[index].name}</div>
    )}
  </FixedSizeList>
);`}</code>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Simple virtualization simulation (not using react-window for demo purposes)
const SimpleVirtualizedList = ({ items }: { items: { id: number; name: string }[] }) => {
  const [scrollTop, setScrollTop] = useState(0);
  const itemHeight = 40;
  const containerHeight = 200;
  const visibleCount = Math.ceil(containerHeight / itemHeight);
  const startIndex = Math.floor(scrollTop / itemHeight);
  const endIndex = Math.min(startIndex + visibleCount + 1, items.length);
  const visibleItems = items.slice(startIndex, endIndex);

  return (
    <div
      style={{
        height: containerHeight,
        overflow: 'auto',
        border: '1px solid #ddd',
        borderRadius: '4px',
      }}
      onScroll={(e) => setScrollTop(e.currentTarget.scrollTop)}
    >
      <div style={{ height: items.length * itemHeight, position: 'relative' }}>
        {visibleItems.map((item, idx) => (
          <div
            key={item.id}
            style={{
              position: 'absolute',
              top: (startIndex + idx) * itemHeight,
              height: itemHeight,
              width: '100%',
              padding: '8px',
              borderBottom: '1px solid #eee',
            }}
          >
            {item.name}
          </div>
        ))}
      </div>
    </div>
  );
};

// ❌ Bad: Render all items
const BadApproach = () => {
  const items = Array.from({ length: 1000 }, (_, i) => ({
    id: i,
    name: `Item ${i + 1}`,
  }));

  return (
    <div>
      <div
        style={{
          height: 200,
          overflow: 'auto',
          border: '1px solid #ddd',
          borderRadius: '4px',
        }}
      >
        <ul className='list-group' style={{ margin: 0 }}>
          {items.map((item) => (
            <li key={item.id} className='list-group-item'>
              {item.name}
            </li>
          ))}
        </ul>
      </div>
      <small className='text-muted mt-2 d-block'>
        Problems: Renders all 1000 items, poor performance, slow scrolling
      </small>
    </div>
  );
};

// ✅ Good: Virtualized list
const GoodApproach = () => {
  const items = Array.from({ length: 1000 }, (_, i) => ({
    id: i,
    name: `Item ${i + 1}`,
  }));

  return (
    <div>
      <SimpleVirtualizedList items={items} />
      <small className='text-muted mt-2 d-block'>
        Benefits: Only renders visible items (~5-6), excellent performance, smooth scrolling
      </small>
    </div>
  );
};

export default Virtualization;
