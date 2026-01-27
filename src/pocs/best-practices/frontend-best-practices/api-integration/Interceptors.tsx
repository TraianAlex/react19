const Interceptors = () => {
  return (
    <div className='container-fluid'>
      <h1 className='mb-4'>24. Request/Response Interceptors</h1>

      <div className='row'>
        <div className='col-md-8'>
          <div className='card border-success mb-4'>
            <div className='card-header bg-success text-white'>
              <h5 className='mb-0'>✅ Good: Interceptors pattern</h5>
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
                Use interceptors for common concerns like authentication and error handling. 
                Interceptors allow you to modify requests and responses in a centralized way.
              </p>
            </div>
          </div>

          <div className='card mb-4'>
            <div className='card-header'>
              <h5 className='mb-0'>Code Example</h5>
            </div>
            <div className='card-body'>
              <pre className='bg-light p-3 rounded' style={{ fontSize: '0.875rem' }}>
                <code>{`// ✅ Good: Interceptors pattern
const apiClient = {
  interceptors: {
    request: [] as Array<(config: RequestConfig) => RequestConfig>,
    response: [] as Array<(response: Response) => Response>,
  },

  async request(config: RequestConfig) {
    // Apply request interceptors
    let finalConfig = config;
    for (const interceptor of this.interceptors.request) {
      finalConfig = interceptor(finalConfig);
    }

    // Add auth token
    finalConfig.headers = {
      ...finalConfig.headers,
      Authorization: \`Bearer \${getToken()}\`,
    };

    const response = await fetch(finalConfig.url, finalConfig);

    // Apply response interceptors
    let finalResponse = response;
    for (const interceptor of this.interceptors.response) {
      finalResponse = interceptor(finalResponse);
    }

    return finalResponse;
  },
};`}</code>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ✅ Good: Interceptors pattern
interface RequestConfig extends RequestInit {
  url: string;
}

const apiClient = {
  interceptors: {
    request: [] as Array<(config: RequestConfig) => RequestConfig>,
    response: [] as Array<(response: Response) => Response>,
  },

  async request(config: RequestConfig): Promise<Response> {
    // Apply request interceptors
    let finalConfig = config;
    for (const interceptor of this.interceptors.request) {
      finalConfig = interceptor(finalConfig);
    }

    // Simulate adding auth token
    const mockToken = 'mock-auth-token-12345';
    finalConfig.headers = {
      ...finalConfig.headers,
      Authorization: `Bearer ${mockToken}`,
    };

    const response = await fetch(finalConfig.url, finalConfig);

    // Apply response interceptors
    let finalResponse = response;
    for (const interceptor of this.interceptors.response) {
      finalResponse = interceptor(finalResponse);
    }

    return finalResponse;
  },
};

// Add interceptors
apiClient.interceptors.request.push((config) => {
  console.log('Request interceptor: Adding timestamp');
  return {
    ...config,
    headers: {
      ...config.headers,
      'X-Request-Time': new Date().toISOString(),
    },
  };
});

apiClient.interceptors.response.push((response) => {
  console.log('Response interceptor: Logging response');
  return response;
});

const GoodApproach = () => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);

  const fetchData = async () => {
    setLoading(true);
    setLogs([]);
    try {
      const response = await apiClient.request({
        url: 'https://jsonplaceholder.typicode.com/posts/1',
        method: 'GET',
      });
      const result = await response.json();
      setData(result);
      setLogs((prev) => [...prev, 'Data fetched successfully']);
    } catch (error) {
      setLogs((prev) => [...prev, `Error: ${error}`]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button className='btn btn-primary mb-3' onClick={fetchData} disabled={loading}>
        {loading ? 'Loading...' : 'Fetch Data (With Interceptors)'}
      </button>
      {logs.length > 0 && (
        <div className='alert alert-info mb-3'>
          <strong>Logs:</strong>
          <ul className='mb-0 mt-2'>
            {logs.map((log, idx) => (
              <li key={idx}>{log}</li>
            ))}
          </ul>
        </div>
      )}
      {data && (
        <div className='card'>
          <div className='card-body'>
            <h5>{data.title}</h5>
            <p className='mb-0'>{data.body}</p>
          </div>
        </div>
      )}
      <small className='text-muted mt-2 d-block'>
        Benefits: Centralized request/response handling, easy to add auth/logging, consistent behavior
      </small>
    </div>
  );
};

import { useState } from 'react';

export default Interceptors;
