const ApiClient = () => {
  return (
    <div className='container-fluid'>
      <h1 className='mb-4'>23. Centralized API Client</h1>

      <div className='row'>
        <div className='col-md-8'>
          <div className='card border-success mb-4'>
            <div className='card-header bg-success text-white'>
              <h5 className='mb-0'>✅ Good: Centralized API client</h5>
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
                Create a centralized API client with consistent error handling and configuration. 
                This ensures consistency across your application and makes it easier to manage 
                API-related concerns.
              </p>
            </div>
          </div>

          <div className='card mb-4'>
            <div className='card-header'>
              <h5 className='mb-0'>Code Example</h5>
            </div>
            <div className='card-body'>
              <pre className='bg-light p-3 rounded' style={{ fontSize: '0.875rem' }}>
                <code>{`// ✅ Good: Centralized API client
class ApiClient {
  private baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  async request<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const response = await fetch(\`\${this.baseURL}\${endpoint}\`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
    });

    if (!response.ok) {
      throw new ApiError(response.status, await response.text());
    }

    return response.json();
  }
}

const api = new ApiClient(process.env.REACT_APP_API_URL);

// Note: In the actual implementation, we use HttpClient 
// to avoid naming conflict with the component`}</code>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ✅ Good: Centralized API client
class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = 'ApiError';
  }
}

class HttpClient {
  private baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  async request<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const response = await fetch(`${this.baseURL}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
    });

    if (!response.ok) {
      throw new ApiError(response.status, await response.text());
    }

    return response.json();
  }

  async get<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'GET' });
  }

  async post<T>(endpoint: string, data?: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }
}

const api = new HttpClient('https://jsonplaceholder.typicode.com');

const GoodApproach = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchUser = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await api.get('/users/1');
      setUser(data);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch user');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button className='btn btn-primary mb-3' onClick={fetchUser} disabled={loading}>
        {loading ? 'Loading...' : 'Fetch User (Using API Client)'}
      </button>
      {error && <div className='alert alert-danger'>{error}</div>}
      {user && (
        <div className='card'>
          <div className='card-body'>
            <h5>{user.name}</h5>
            <p className='mb-0'>{user.email}</p>
          </div>
        </div>
      )}
      <small className='text-muted mt-2 d-block'>
        Benefits: Consistent error handling, centralized configuration, easier to maintain
      </small>
    </div>
  );
};

import { useState } from 'react';

export default ApiClient;
