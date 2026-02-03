import { useState, useCallback } from 'react';

// ✅ Good: Well-designed custom hook API
const useToggle = (initialValue = false) => {
  const [value, setValue] = useState(initialValue);

  const toggle = useCallback(() => setValue((v) => !v), []);
  const setTrue = useCallback(() => setValue(true), []);
  const setFalse = useCallback(() => setValue(false), []);

  return [value, { toggle, setTrue, setFalse, setValue }] as const;
};

const CustomHooks = () => {
  return (
    <div className='container-fluid'>
      <h1 className='mb-4'>7. Custom Hooks for Logic Extraction</h1>

      <div className='row'>
        <div className='col-md-8 offset-md-2'>
          <div className='card border-success mb-4'>
            <div className='card-header bg-success text-white'>
              <h5 className='mb-0'>✅ Good: Well-designed custom hook API</h5>
            </div>
            <div className='card-body'>
              <ExampleUsage />
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
                Custom hooks are one of the most powerful tools we have for sharing stateful logic 
                between components. So you can keep this thing in mind:
              </p>
              <p>
                When the same pattern of state or behavior shows up in multiple places, it's a sign 
                to extract that logic into a hook.
              </p>
              <p>
                But extraction alone won't be enough as such. A well-crafted custom hook also has a 
                thoughtful API, that is, it should feel as intuitive and natural to use as React's 
                built-in hooks like useState or useEffect.
              </p>
              <p>
                The goal here is to make complex logic reusable without making usage complicated. 
                When done right, custom hooks help keep components clean and focused while promoting 
                consistency across your codebase.
              </p>
            </div>
          </div>

          <div className='card mb-4'>
            <div className='card-header'>
              <h5 className='mb-0'>Code Example</h5>
            </div>
            <div className='card-body'>
              <pre className='bg-light p-3 rounded' style={{ fontSize: '0.875rem' }}>
                <code>{`// Not just extracting logic, but designing a clean API
const useToggle = (initialValue = false) => {
  const [value, setValue] = useState(initialValue);
  
  const toggle = useCallback(() => setValue(v => !v), []);
  const setTrue = useCallback(() => setValue(true), []);
  const setFalse = useCallback(() => setValue(false), []);
  
  return [value, { toggle, setTrue, setFalse, setValue }];
};

// Usage feels natural and expressive
const [isModalOpen, { toggle: toggleModal, setTrue: openModal }] = useToggle();`}</code>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Usage feels natural and expressive
const ExampleUsage = () => {
  const [isModalOpen, { toggle: toggleModal, setTrue: openModal, setFalse: closeModal }] =
    useToggle(false);
  const [isMenuOpen, { toggle: toggleMenu }] = useToggle(false);
  const [isDarkMode, { toggle: toggleDarkMode }] = useToggle(false);

  return (
    <div>
      <div className='mb-4'>
        <h5>Modal Example</h5>
        <button onClick={toggleModal} className='btn btn-primary me-2'>
          Toggle Modal
        </button>
        <button onClick={openModal} className='btn btn-success me-2'>
          Open Modal
        </button>
        <button onClick={closeModal} className='btn btn-danger'>
          Close Modal
        </button>
        {isModalOpen && (
          <div className='modal show d-block mt-3' style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className='modal-dialog'>
              <div className='modal-content'>
                <div className='modal-header'>
                  <h5 className='modal-title'>Modal</h5>
                  <button type='button' className='btn-close' onClick={closeModal}></button>
                </div>
                <div className='modal-body'>Modal is {isModalOpen ? 'open' : 'closed'}</div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className='mb-4'>
        <h5>Menu Example</h5>
        <button onClick={toggleMenu} className='btn btn-secondary'>
          {isMenuOpen ? 'Close' : 'Open'} Menu
        </button>
        {isMenuOpen && (
          <div className='card mt-3'>
            <div className='card-body'>
              <ul className='list-unstyled mb-0'>
                <li>Menu Item 1</li>
                <li>Menu Item 2</li>
                <li>Menu Item 3</li>
              </ul>
            </div>
          </div>
        )}
      </div>

      <div className='mb-4'>
        <h5>Theme Example</h5>
        <button onClick={toggleDarkMode} className='btn btn-dark'>
          Toggle Dark Mode
        </button>
        <div
          className={`p-3 mt-3 border rounded ${
            isDarkMode ? 'bg-dark text-white' : 'bg-light'
          }`}
        >
          Current theme: {isDarkMode ? 'Dark' : 'Light'}
        </div>
      </div>

      <div className='mt-4'>
        <h6>Hook Implementation:</h6>
        <pre className='bg-light p-3 rounded'>
          <code>{`const useToggle = (initialValue = false) => {
  const [value, setValue] = useState(initialValue);
  
  const toggle = useCallback(() => setValue(v => !v), []);
  const setTrue = useCallback(() => setValue(true), []);
  const setFalse = useCallback(() => setValue(false), []);
  
  return [value, { toggle, setTrue, setFalse, setValue }];
};`}</code>
        </pre>
        <small className='text-muted'>
          Benefits: Natural API similar to useState, multiple ways to control state,
          reusable across components, keeps components clean and focused
        </small>
      </div>
    </div>
  );
};

export default CustomHooks;
