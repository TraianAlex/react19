import { useState } from 'react';

const CleanJsx = () => {
  return (
    <div className='container-fluid'>
      <h1 className='mb-4'>12. Clean JSX: Avoid Inline Anonymous Functions</h1>
      
      <div className='row'>
        <div className='col-md-6'>
          <div className='card border-danger mb-4'>
            <div className='card-header bg-danger text-white'>
              <h5 className='mb-0'>❌ Bad: Cluttered and hard to debug</h5>
            </div>
            <div className='card-body'>
              <BadApproach />
            </div>
          </div>
        </div>

        <div className='col-md-6'>
          <div className='card border-success mb-4'>
            <div className='card-header bg-success text-white'>
              <h5 className='mb-0'>✅ Good: Clear intent, easy to debug</h5>
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
                Writing clean JSX isn't about following arbitrary rules or stylistic preferences — 
                it is about making the structure and purpose of a component immediately clear to anyone 
                reading it. The goal is that, when a developer takes a glance at JSX, they should easily 
                understand what the component does, without needing to untangle complex inline logic.
              </p>
              <p>
                One practical guideline is to avoid inline anonymous functions, not so much for 
                performance reasons (React handles these quite well now), but because they can hurt 
                readability and make debugging more difficult. Clear, named functions improve both the 
                clarity of your code and the developer experience when troubleshooting.
              </p>
            </div>
          </div>

          <div className='card mb-4'>
            <div className='card-header'>
              <h5 className='mb-0'>Code Example</h5>
            </div>
            <div className='card-body'>
              <pre className='bg-light p-3 rounded' style={{ fontSize: '0.875rem' }}>
                <code>{`// ❌ Bad: Cluttered and hard to debug
<Button 
  onClick={(e) => {
    e.preventDefault();
    if (user.permissions.includes('delete')) {
      setConfirmDialogOpen(true);
    } else {
      showError('Insufficient permissions');
    }
  }}
>
  Delete
</Button>

// ✅ Good: Clear intent, easy to debug
const handleDeleteClick = (e) => {
  e.preventDefault();
  if (user.permissions.includes('delete')) {
    setConfirmDialogOpen(true);
  } else {
    showError('Insufficient permissions');
  }
};

<Button onClick={handleDeleteClick}>Delete</Button>`}</code>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ❌ Bad: Cluttered and hard to debug
const BadApproach = () => {
  const [user, setUser] = useState({ name: 'John', permissions: ['read', 'write'] });
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);

  const showError = (message: string) => {
    alert(`Error: ${message}`);
  };

  return (
    <div>
      <button
        className='btn btn-danger'
        onClick={(e) => {
          e.preventDefault();
          if (user.permissions.includes('delete')) {
            setConfirmDialogOpen(true);
          } else {
            showError('Insufficient permissions');
          }
        }}
      >
        Delete
      </button>
      {confirmDialogOpen && (
        <div className='alert alert-warning mt-3'>
          Are you sure you want to delete?
        </div>
      )}
      <div className='mt-3'>
        <small className='text-muted'>
          Problems: Hard to debug, can't easily test the handler logic,
          makes JSX harder to read, logic mixed with presentation
        </small>
      </div>
    </div>
  );
};

// ✅ Good: Clear intent, easy to debug
const GoodApproach = () => {
  const [user, setUser] = useState({ name: 'John', permissions: ['read', 'write'] });
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);

  const showError = (message: string) => {
    alert(`Error: ${message}`);
  };

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (user.permissions.includes('delete')) {
      setConfirmDialogOpen(true);
    } else {
      showError('Insufficient permissions');
    }
  };

  return (
    <div>
      <button className='btn btn-danger' onClick={handleDeleteClick}>
        Delete
      </button>
      {confirmDialogOpen && (
        <div className='alert alert-warning mt-3'>
          Are you sure you want to delete?
        </div>
      )}
      <div className='mt-3'>
        <small className='text-muted'>
          Benefits: Easy to debug (can set breakpoints), testable handler function,
          cleaner JSX, clear separation of logic and presentation
        </small>
      </div>
    </div>
  );
};

export default CleanJsx;
