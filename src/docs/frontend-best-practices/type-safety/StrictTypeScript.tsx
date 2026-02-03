const StrictTypeScript = () => {
  return (
    <div className='container-fluid'>
      <h1 className='mb-4'>16. Strict TypeScript Configuration</h1>

      <div className='row'>
        <div className='col-md-6'>
          <div className='card border-danger mb-4'>
            <div className='card-header bg-danger text-white'>
              <h5 className='mb-0'>❌ Bad: Using any</h5>
            </div>
            <div className='card-body'>
              <BadApproach />
            </div>
          </div>
        </div>

        <div className='col-md-6'>
          <div className='card border-success mb-4'>
            <div className='card-header bg-success text-white'>
              <h5 className='mb-0'>✅ Good: Proper typing</h5>
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
                Use strict TypeScript settings and avoid `any` type. Proper typing catches errors 
                at compile time and serves as documentation for your code.
              </p>
            </div>
          </div>

          <div className='card mb-4'>
            <div className='card-header'>
              <h5 className='mb-0'>Code Example</h5>
            </div>
            <div className='card-body'>
              <pre className='bg-light p-3 rounded' style={{ fontSize: '0.875rem' }}>
                <code>{`// ❌ Bad: Using any
const processData = (data: any) => {
  return data.value;
};

// ✅ Good: Proper typing
interface Data {
  value: string;
  id: number;
}

const processData = (data: Data): string => {
  return data.value;
};`}</code>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ❌ Bad: Using any
const BadApproach = () => {
  const processData = (data: any) => {
    // No type safety - could access non-existent properties
    return data.value;
  };

  const result = processData({ value: 'test', id: 1 });
  // Also works with wrong data structure - no error!
  const wrongResult = processData({ wrong: 'property' });

  return (
    <div>
      <div className='mb-2'>
        <strong>Result:</strong> {result}
      </div>
      <div className='mb-2'>
        <strong>Wrong result:</strong> {wrongResult}
      </div>
      <small className='text-muted mt-2 d-block'>
        Problems: No type safety, runtime errors possible, no IntelliSense
      </small>
    </div>
  );
};

// ✅ Good: Proper typing
interface Data {
  value: string;
  id: number;
}

const GoodApproach = () => {
  const processData = (data: Data): string => {
    return data.value;
  };

  const result = processData({ value: 'test', id: 1 });
  // TypeScript would error here: processData({ wrong: 'property' });

  return (
    <div>
      <div className='mb-2'>
        <strong>Result:</strong> {result}
      </div>
      <small className='text-muted mt-2 d-block'>
        Benefits: Type safety, compile-time errors, better IntelliSense, self-documenting
      </small>
    </div>
  );
};

export default StrictTypeScript;
