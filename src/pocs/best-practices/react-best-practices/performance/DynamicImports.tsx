import { useState } from 'react';

const DynamicImports = () => {
  return (
    <div className='container-fluid'>
      <h1 className='mb-4'>20. Dynamic Imports for Heavy Libraries</h1>

      <div className='row'>
        <div className='col-md-8 offset-md-2'>
          <div className='card border-success mb-4'>
            <div className='card-header bg-success text-white'>
              <h5 className='mb-0'>✅ Good: Dynamic import when needed</h5>
            </div>
            <div className='card-body'>
              <DynamicImportExample />
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
                Use dynamic imports for libraries that might not be needed immediately. Only load 
                heavy libraries when needed.
              </p>
              <p>
                Dynamic Imports for libraries that might not be needed. Only load heavy date 
                manipulation library when needed.
              </p>
            </div>
          </div>

          <div className='card mb-4'>
            <div className='card-header'>
              <h5 className='mb-0'>Code Example</h5>
            </div>
            <div className='card-body'>
              <pre className='bg-light p-3 rounded' style={{ fontSize: '0.875rem' }}>
                <code>{`// Only load heavy date manipulation library when needed
const handleDateRangeSelect = async (startDate, endDate) => {
  const { formatDateRange } = await import('date-fns');
  return formatDateRange(startDate, endDate);
};`}</code>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const DynamicImportExample = () => {
  const [startDate, setStartDate] = useState('2024-01-01');
  const [endDate, setEndDate] = useState('2024-12-31');
  const [formattedRange, setFormattedRange] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleFormatDateRange = async () => {
    setLoading(true);
    try {
      // Simulate dynamic import of a heavy date manipulation library
      // In real app: const { formatDateRange } = await import('date-fns');
      const formatDateRange = async (start: string, end: string) => {
        // Simulate heavy library loading
        await new Promise((resolve) => setTimeout(resolve, 500));
        return `${start} to ${end}`;
      };

      const formatted = await formatDateRange(startDate, endDate);
      setFormattedRange(formatted);
    } catch (error) {
      console.error('Failed to load date library:', error);
      setFormattedRange('Error formatting dates');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className='mb-3'>
        <h5>Date Range Formatter</h5>
        <p className='text-muted'>
          The date formatting library is only loaded when you click the button.
          This keeps the initial bundle size small.
        </p>
      </div>

      <div className='row mb-3'>
        <div className='col-md-6'>
          <label className='form-label'>Start Date</label>
          <input
            type='date'
            className='form-control'
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>
        <div className='col-md-6'>
          <label className='form-label'>End Date</label>
          <input
            type='date'
            className='form-control'
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
      </div>

      <button
        className='btn btn-primary mb-3'
        onClick={handleFormatDateRange}
        disabled={loading}
      >
        {loading ? 'Loading library...' : 'Format Date Range'}
      </button>

      {formattedRange && (
        <div className='alert alert-success'>
          <strong>Formatted Range:</strong> {formattedRange}
        </div>
      )}

      <div className='mt-3'>
        <small className='text-muted'>
          <strong>Benefits:</strong>
          <ul className='mb-0 mt-2'>
            <li>Heavy libraries only load when needed</li>
            <li>Smaller initial bundle size</li>
            <li>Better initial page load performance</li>
            <li>Check Network tab to see the library being loaded on demand</li>
          </ul>
          <p className='mb-0 mt-2'>
            <strong>Real-world example:</strong> Only load Chart.js when user wants to see charts,
            or load a PDF viewer library only when user clicks "View PDF".
          </p>
        </small>
      </div>
    </div>
  );
};

export default DynamicImports;
