const SemanticHtml = () => {
  return (
    <div className='container-fluid'>
      <h1 className='mb-4'>32. Semantic HTML as Foundation</h1>

      <div className='row'>
        <div className='col-md-6'>
          <div className='card border-danger mb-4'>
            <div className='card-header bg-danger text-white'>
              <h5 className='mb-0'>❌ Bad: Looks like a button, doesn't work like one</h5>
            </div>
            <div className='card-body'>
              <BadApproach />
            </div>
          </div>
        </div>

        <div className='col-md-6'>
          <div className='card border-success mb-4'>
            <div className='card-header bg-success text-white'>
              <h5 className='mb-0'>✅ Good: Works for everyone</h5>
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
                Accessibility begins with using semantic HTML correctly. When the right elements are 
                chosen, many accessibility features — like keyboard navigation, screen reader support, 
                and automatic focus management, they come built in.
              </p>
              <p>
                Choosing between a &lt;button&gt; and a &lt;div&gt; is more than semantics; it directly 
                impacts how users with assistive technologies experience your app. Using elements as 
                they're intended sets the foundation for truly inclusive interfaces.
              </p>
            </div>
          </div>

          <div className='card mb-4'>
            <div className='card-header'>
              <h5 className='mb-0'>Code Example</h5>
            </div>
            <div className='card-body'>
              <pre className='bg-light p-3 rounded' style={{ fontSize: '0.875rem' }}>
                <code>{`// ❌ Bad: Looks like a button, doesn't work like one
<div className="button" onClick={handleClick}>
  Click me
</div>

// ✅ Good: Works for everyone
<button type="button" onClick={handleClick}>
  Click me
</button>

// Or when you need a div wrapper
<div>
  <button type="button" onClick={handleClick}>
    Click me
  </button>
</div>`}</code>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ❌ Bad: Looks like a button, doesn't work like one
const BadApproach = () => {
  const handleClick = () => {
    alert('Clicked!');
  };

  return (
    <div>
      <div
        className='btn btn-primary'
        onClick={handleClick}
        style={{ cursor: 'pointer' }}
      >
        Click me
      </div>
      <div className='mt-3'>
        <small className='text-muted'>
          Problems: Not keyboard accessible, screen readers don't recognize it as a button,
          can't be activated with Enter/Space keys, no focus indicator
        </small>
      </div>
    </div>
  );
};

// ✅ Good: Works for everyone
const GoodApproach = () => {
  const handleClick = () => {
    alert('Clicked!');
  };

  return (
    <div>
      <button type='button' className='btn btn-primary' onClick={handleClick}>
        Click me
      </button>
      <div className='mt-3'>
        <small className='text-muted'>
          Benefits: Keyboard accessible (Enter/Space), screen reader announces as button,
          proper focus indicator, works with assistive technologies
        </small>
      </div>
    </div>
  );
};

export default SemanticHtml;
