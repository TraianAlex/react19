const HeavyChart = () => {
  // Simulate a heavy chart component
  const data = [
    { month: 'Jan', value: 65 },
    { month: 'Feb', value: 59 },
    { month: 'Mar', value: 80 },
    { month: 'Apr', value: 81 },
    { month: 'May', value: 56 },
    { month: 'Jun', value: 55 },
  ];

  return (
    <div className='card'>
      <div className='card-header'>
        <h5 className='mb-0'>Advanced Chart (Lazy Loaded)</h5>
      </div>
      <div className='card-body'>
        <div className='mb-3'>
          <p className='text-muted'>
            This component is lazy-loaded. It would typically contain a heavy charting
            library like Chart.js or D3.js.
          </p>
        </div>
        <div className='table-responsive'>
          <table className='table table-striped'>
            <thead>
              <tr>
                <th>Month</th>
                <th>Value</th>
                <th>Bar</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item.month}>
                  <td>{item.month}</td>
                  <td>{item.value}</td>
                  <td>
                    <div
                      className='bg-primary'
                      style={{
                        width: `${item.value}%`,
                        height: '20px',
                        borderRadius: '4px',
                      }}
                    ></div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className='alert alert-info mt-3'>
          <small>
            In a real application, this would be a complex chart component that's only
            needed when the user wants to see advanced analytics. By lazy loading it,
            we keep the initial bundle size small.
          </small>
        </div>
      </div>
    </div>
  );
};

export default HeavyChart;
