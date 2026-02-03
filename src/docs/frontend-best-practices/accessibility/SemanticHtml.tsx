const SemanticHtml = () => {
  return (
    <div className='container-fluid'>
      <h1 className='mb-4'>18. Semantic HTML</h1>

      <div className='row'>
        <div className='col-md-6'>
          <div className='card border-danger mb-4'>
            <div className='card-header bg-danger text-white'>
              <h5 className='mb-0'>❌ Bad: Div soup</h5>
            </div>
            <div className='card-body'>
              <BadApproach />
            </div>
          </div>
        </div>

        <div className='col-md-6'>
          <div className='card border-success mb-4'>
            <div className='card-header bg-success text-white'>
              <h5 className='mb-0'>✅ Good: Semantic HTML</h5>
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
                Use semantic HTML elements for better accessibility and SEO. Semantic HTML provides 
                meaning to screen readers and search engines, improving the user experience for 
                everyone.
              </p>
            </div>
          </div>

          <div className='card mb-4'>
            <div className='card-header'>
              <h5 className='mb-0'>Code Example</h5>
            </div>
            <div className='card-body'>
              <pre className='bg-light p-3 rounded' style={{ fontSize: '0.875rem' }}>
                <code>{`// ❌ Bad: Div soup
<div onClick={handleClick}>
  <div>Click me</div>
</div>

// ✅ Good: Semantic HTML
<button onClick={handleClick} aria-label="Submit form">
  Submit
</button>`}</code>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ❌ Bad: Div soup
const BadApproach = () => {
  const handleClick = () => {
    alert('Clicked!');
  };

  return (
    <div>
      <div
        onClick={handleClick}
        style={{
          padding: '10px',
          backgroundColor: '#007bff',
          color: 'white',
          cursor: 'pointer',
          borderRadius: '4px',
          display: 'inline-block',
        }}
      >
        <div>Click me (div, not accessible)</div>
      </div>
      <small className='text-muted mt-2 d-block'>
        Problems: Not keyboard accessible, screen readers can't identify as button, no semantic meaning
      </small>
    </div>
  );
};

// ✅ Good: Semantic HTML
const GoodApproach = () => {
  const handleClick = () => {
    alert('Clicked!');
  };

  return (
    <div>
      <button
        type='button'
        onClick={handleClick}
        aria-label='Submit form'
        className='btn btn-primary'
      >
        Submit (semantic button)
      </button>
      <small className='text-muted mt-2 d-block'>
        Benefits: Keyboard accessible, screen reader friendly, semantic meaning, better SEO
      </small>
    </div>
  );
};

export default SemanticHtml;
