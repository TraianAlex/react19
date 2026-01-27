const FormLabels = () => {
  return (
    <div className='container-fluid'>
      <h1 className='mb-4'>33. Form Labels and Structure</h1>

      <div className='row'>
        <div className='col-md-6'>
          <div className='card border-danger mb-4'>
            <div className='card-header bg-danger text-white'>
              <h5 className='mb-0'>❌ Bad: Inaccessible form</h5>
            </div>
            <div className='card-body'>
              <BadApproach />
            </div>
          </div>
        </div>

        <div className='col-md-6'>
          <div className='card border-success mb-4'>
            <div className='card-header bg-success text-white'>
              <h5 className='mb-0'>✅ Good: Accessible form</h5>
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
                Always associate form inputs with labels. Use proper form structure for accessibility.
              </p>
              <p>
                Form Labels and Structure. Always associate form inputs with labels. Use proper form 
                structure for accessibility.
              </p>
            </div>
          </div>

          <div className='card mb-4'>
            <div className='card-header'>
              <h5 className='mb-0'>Code Example</h5>
            </div>
            <div className='card-body'>
              <pre className='bg-light p-3 rounded' style={{ fontSize: '0.875rem' }}>
                <code>{`// ❌ Bad: Inaccessible form
<form>
  <input type="text" placeholder="Enter your name" />
  <input type="email" placeholder="Enter your email" />
  <button>Submit</button>
</form>

// ✅ Good: Accessible form
<form>
  <div>
    <label htmlFor="name">Name</label>
    <input 
      id="name"
      type="text" 
      placeholder="Enter your name"
      required
      aria-describedby="name-help"
    />
    <div id="name-help">This will be displayed on your profile</div>
  </div>
  
  <div>
    <label htmlFor="email">Email</label>
    <input 
      id="email"
      type="email" 
      placeholder="Enter your email"
      required
      aria-describedby="email-help"
    />
    <div id="email-help">We'll never share your email</div>
  </div>
  
  <button type="submit">Submit</button>
</form>`}</code>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ❌ Bad: Inaccessible form
const BadApproach = () => {
  return (
    <form>
      <input type='text' className='form-control mb-3' placeholder='Enter your name' />
      <input type='email' className='form-control mb-3' placeholder='Enter your email' />
      <button type='submit' className='btn btn-primary'>
        Submit
      </button>
      <div className='mt-3'>
        <small className='text-muted'>
          Problems: No labels, screen readers don't know what fields are for,
          no help text, no error messages, placeholder text disappears when typing
        </small>
      </div>
    </form>
  );
};

// ✅ Good: Accessible form
const GoodApproach = () => {
  return (
    <form>
      <div className='mb-3'>
        <label htmlFor='name' className='form-label'>
          Name
        </label>
        <input
          id='name'
          type='text'
          className='form-control'
          placeholder='Enter your name'
          required
          aria-describedby='name-help'
        />
        <div id='name-help' className='form-text'>
          This will be displayed on your profile
        </div>
      </div>

      <div className='mb-3'>
        <label htmlFor='email' className='form-label'>
          Email
        </label>
        <input
          id='email'
          type='email'
          className='form-control'
          placeholder='Enter your email'
          required
          aria-describedby='email-help'
        />
        <div id='email-help' className='form-text'>
          We'll never share your email
        </div>
      </div>

      <button type='submit' className='btn btn-primary'>
        Submit
      </button>
      <div className='mt-3'>
        <small className='text-muted'>
          Benefits: Labels associated with inputs, help text linked via aria-describedby,
          screen readers announce labels and help text, proper form structure
        </small>
      </div>
    </form>
  );
};

export default FormLabels;
