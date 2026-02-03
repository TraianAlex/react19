import { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';

const UrlState = () => {
  return (
    <div className='container-fluid'>
      <h1 className='mb-4'>5. URL State</h1>

      <div className='row'>
        <div className='col-md-6'>
          <div className='card border-danger mb-4'>
            <div className='card-header bg-danger text-white'>
              <h5 className='mb-0'>❌ Bad: State in component, lost on refresh</h5>
            </div>
            <div className='card-body'>
              <BadApproach />
            </div>
          </div>
        </div>

        <div className='col-md-6'>
          <div className='card border-success mb-4'>
            <div className='card-header bg-success text-white'>
              <h5 className='mb-0'>✅ Good: State in URL, preserved on refresh</h5>
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
                URL state is best handled through the router whenever the state directly affects 
                what the user sees on the screen. Filters, pagination, selected tabs.. if refreshing 
                the page should preserve it, that's a clear sign it belongs in the URL.
              </p>
              <p>
                This practice is not just about convenience.. it aligns with how browsers naturally 
                work, and it gives users the ability to share, bookmark, and return to the exact 
                same view.
              </p>
            </div>
          </div>

          <div className='card mb-4'>
            <div className='card-header'>
              <h5 className='mb-0'>Code Example</h5>
            </div>
            <div className='card-body'>
              <pre className='bg-light p-3 rounded' style={{ fontSize: '0.875rem' }}>
                <code>{`// ❌ Bad: State in component, lost on refresh
const [selectedTab, setSelectedTab] = useState('profile');
const [page, setPage] = useState(1);

// ✅ Good: State in URL, preserved on refresh
const { tab = 'profile', page = 1 } = useSearchParams();
const navigate = useNavigate();

const handleTabChange = (newTab) => {
  navigate(\`?tab=\${newTab}&page=\${page}\`);
};`}</code>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ❌ Bad: State in component, lost on refresh
const BadApproach = () => {
  const [selectedTab, setSelectedTab] = useState('profile');
  const [page, setPage] = useState(1);

  const tabs = ['profile', 'settings', 'security'];

  return (
    <div>
      <div className='mb-3'>
        <h6>Selected Tab: {selectedTab}</h6>
        <div className='btn-group' role='group'>
          {tabs.map((tab) => (
            <button
              key={tab}
              type='button'
              className={`btn btn-sm ${selectedTab === tab ? 'btn-primary' : 'btn-outline-primary'}`}
              onClick={() => setSelectedTab(tab)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className='mb-3'>
        <h6>Page: {page}</h6>
        <div className='btn-group' role='group'>
          <button
            type='button'
            className='btn btn-sm btn-outline-secondary'
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
          >
            Previous
          </button>
          <button
            type='button'
            className='btn btn-sm btn-outline-secondary'
            onClick={() => setPage((p) => p + 1)}
          >
            Next
          </button>
        </div>
      </div>

      <div className='mt-3'>
        <small className='text-muted'>
          Problems: State lost on refresh, can't bookmark/share specific view,
          browser back/forward doesn't work
        </small>
      </div>
    </div>
  );
};

// ✅ Good: State in URL, preserved on refresh
const GoodApproach = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const tab = searchParams.get('tab') || 'profile';
  const page = parseInt(searchParams.get('page') || '1', 10);

  const tabs = ['profile', 'settings', 'security'];

  const handleTabChange = (newTab: string) => {
    setSearchParams({ tab: newTab, page: page.toString() });
  };

  const handlePageChange = (newPage: number) => {
    setSearchParams({ tab: tab, page: newPage.toString() });
  };

  return (
    <div>
      <div className='mb-3'>
        <h6>Selected Tab: {tab}</h6>
        <div className='btn-group' role='group'>
          {tabs.map((t) => (
            <button
              key={t}
              type='button'
              className={`btn btn-sm ${tab === t ? 'btn-primary' : 'btn-outline-primary'}`}
              onClick={() => handleTabChange(t)}
            >
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className='mb-3'>
        <h6>Page: {page}</h6>
        <div className='btn-group' role='group'>
          <button
            type='button'
            className='btn btn-sm btn-outline-secondary'
            onClick={() => handlePageChange(Math.max(1, page - 1))}
            disabled={page === 1}
          >
            Previous
          </button>
          <button
            type='button'
            className='btn btn-sm btn-outline-secondary'
            onClick={() => handlePageChange(page + 1)}
          >
            Next
          </button>
        </div>
      </div>

      <div className='alert alert-info'>
        <strong>Try it:</strong> Change the tab or page, then refresh the page.
        The state is preserved! You can also bookmark or share this URL.
      </div>

      <div className='mt-3'>
        <small className='text-muted'>
          Benefits: State preserved on refresh, bookmarkable/shareable URLs,
          browser back/forward works, aligns with how browsers naturally work
        </small>
      </div>
    </div>
  );
};

export default UrlState;
