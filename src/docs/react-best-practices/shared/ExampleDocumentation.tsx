interface ExampleDocumentationProps {
  explanation: string | React.ReactNode;
  codeExample: string;
}

export const ExampleDocumentation = ({ explanation, codeExample }: ExampleDocumentationProps) => {
  return (
    <>
      <div className='card mb-4'>
        <div className='card-header'>
          <h5 className='mb-0'>Explanation</h5>
        </div>
        <div className='card-body'>
          {typeof explanation === 'string' ? <p>{explanation}</p> : explanation}
        </div>
      </div>

      <div className='card mb-4'>
        <div className='card-header'>
          <h5 className='mb-0'>Code Example</h5>
        </div>
        <div className='card-body'>
          <pre className='bg-light p-3 rounded' style={{ fontSize: '0.875rem', overflowX: 'auto' }}>
            <code>{codeExample}</code>
          </pre>
        </div>
      </div>
    </>
  );
};
