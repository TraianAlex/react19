const Fragments = () => {
  return (
    <div className='container-fluid'>
      <h1 className='mb-4'>13. Fragment Usage</h1>

      <div className='row'>
        <div className='col-md-6'>
          <div className='card border-danger mb-4'>
            <div className='card-header bg-danger text-white'>
              <h5 className='mb-0'>❌ Bad: Creates unnecessary div wrapper</h5>
            </div>
            <div className='card-body'>
              <BadApproach />
            </div>
          </div>
        </div>

        <div className='col-md-6'>
          <div className='card border-success mb-4'>
            <div className='card-header bg-success text-white'>
              <h5 className='mb-0'>✅ Good: Respects HTML structure</h5>
            </div>
            <div className='card-body'>
              <GoodApproach />
            </div>
          </div>
        </div>
      </div>

      <div className='row mt-4'>
        <div className='col-12'>
          <ListExample />
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
                Use fragments to avoid unnecessary wrapper divs. Respect semantic HTML structure.
              </p>
              <p>
                Fragment Usage shows attention to semantic HTML structure. Fragments are especially 
                useful when you need to return multiple elements without adding an extra DOM node, 
                which can break CSS layouts or semantic HTML.
              </p>
            </div>
          </div>

          <div className='card mb-4'>
            <div className='card-header'>
              <h5 className='mb-0'>Code Example</h5>
            </div>
            <div className='card-body'>
              <pre className='bg-light p-3 rounded' style={{ fontSize: '0.875rem' }}>
                <code>{`// ❌ Bad: Creates unnecessary div wrapper
const UserInfo = ({ user }) => (
  <div>
    <h2>{user.name}</h2>
    <p>{user.email}</p>
  </div>
);

// ✅ Good: Respects HTML structure
const UserInfo = ({ user }) => (
  <>
    <h2>{user.name}</h2>
    <p>{user.email}</p>
  </>
);`}</code>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ❌ Bad: Creates unnecessary div wrapper
const BadApproach = () => {
  const user = { name: 'John Doe', email: 'john@example.com' };

  return (
    <div>
      <h2>{user.name}</h2>
      <p>{user.email}</p>
    </div>
  );
};

// ✅ Good: Respects HTML structure
const GoodApproach = () => {
  const user = { name: 'John Doe', email: 'john@example.com' };

  return (
    <>
      <h2>{user.name}</h2>
      <p>{user.email}</p>
    </>
  );
};

// Example showing when fragments are especially useful
const ListExample = () => {
  const items = ['Item 1', 'Item 2', 'Item 3'];

  return (
    <div className='mt-4'>
      <h5>Fragment in Lists:</h5>
      <ul className='list-group'>
        {items.map((item, index) => (
          <li key={index} className='list-group-item'>
            {item}
          </li>
        ))}
      </ul>
      <div className='mt-3'>
        <small className='text-muted'>
          Fragments are especially useful when you need to return multiple elements
          without adding an extra DOM node, which can break CSS layouts or semantic HTML.
        </small>
      </div>
    </div>
  );
};

export default Fragments;
