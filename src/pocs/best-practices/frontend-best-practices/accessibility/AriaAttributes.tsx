const AriaAttributes = () => {
  return (
    <div className='container-fluid'>
      <h1 className='mb-4'>19. ARIA Attributes</h1>

      <div className='row'>
        <div className='col-md-8'>
          <div className='card border-success mb-4'>
            <div className='card-header bg-success text-white'>
              <h5 className='mb-0'>✅ Good: Proper ARIA usage</h5>
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
                Use ARIA attributes when semantic HTML isn't sufficient. ARIA attributes provide 
                additional information to assistive technologies, making your UI more accessible.
              </p>
            </div>
          </div>

          <div className='card mb-4'>
            <div className='card-header'>
              <h5 className='mb-0'>Code Example</h5>
            </div>
            <div className='card-body'>
              <pre className='bg-light p-3 rounded' style={{ fontSize: '0.875rem' }}>
                <code>{`// ✅ Good: Proper ARIA usage
<div
  role="dialog"
  aria-labelledby="modal-title"
  aria-describedby="modal-description"
>
  <h2 id="modal-title">Confirm Action</h2>
  <p id="modal-description">Are you sure you want to proceed?</p>
</div>`}</code>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const GoodApproach = () => {
  return (
    <div>
      <div
        role='dialog'
        aria-labelledby='modal-title'
        aria-describedby='modal-description'
        className='card'
      >
        <div className='card-header'>
          <h2 id='modal-title' className='h5 mb-0'>
            Confirm Action
          </h2>
        </div>
        <div className='card-body'>
          <p id='modal-description' className='mb-0'>
            Are you sure you want to proceed? This action cannot be undone.
          </p>
        </div>
        <div className='card-footer'>
          <button className='btn btn-primary me-2'>Confirm</button>
          <button className='btn btn-secondary'>Cancel</button>
        </div>
      </div>
      <small className='text-muted mt-2 d-block'>
        Benefits: Screen readers can identify dialog, understand relationships, better accessibility
      </small>
    </div>
  );
};

export default AriaAttributes;
