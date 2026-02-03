import { useState } from 'react';

const LocalVsGlobalState = () => {
  return (
    <div className='container-fluid'>
      <h1 className='mb-4'>1. Separate Local vs Global State</h1>

      <div className='row'>
        <div className='col-md-6'>
          <div className='card border-danger mb-4'>
            <div className='card-header bg-danger text-white'>
              <h5 className='mb-0'>❌ Bad: Everything in global state</h5>
            </div>
            <div className='card-body'>
              <BadApproach />
            </div>
          </div>
        </div>

        <div className='col-md-6'>
          <div className='card border-success mb-4'>
            <div className='card-header bg-success text-white'>
              <h5 className='mb-0'>✅ Good: Appropriate state placement</h5>
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
                Not all state needs to be global. Use local state for component-specific data and 
                global state only for data shared across multiple components.
              </p>
            </div>
          </div>

          <div className='card mb-4'>
            <div className='card-header'>
              <h5 className='mb-0'>Code Example</h5>
            </div>
            <div className='card-body'>
              <pre className='bg-light p-3 rounded' style={{ fontSize: '0.875rem' }}>
                <code>{`// ❌ Bad: Everything in global state
const App = () => {
  const [globalState, setGlobalState] = useState({
    todos: [],
    inputValue: '', // Only used in one component
    isModalOpen: false, // Only used in one component
  });
};

// ✅ Good: Appropriate state placement
const TodoInput = () => {
  const [inputValue, setInputValue] = useState(''); // Local state
  // ...
};

const App = () => {
  const [todos, setTodos] = useState([]); // Global state
  // ...
};`}</code>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ❌ Bad: Everything in global state
const BadApproach = () => {
  const [globalState, setGlobalState] = useState({
    todos: [] as string[],
    inputValue: '',
    isModalOpen: false,
  });

  return (
    <div>
      <div className='mb-3'>
        <h6>Input (unnecessarily global)</h6>
        <input
          type='text'
          className='form-control'
          value={globalState.inputValue}
          onChange={(e) =>
            setGlobalState({ ...globalState, inputValue: e.target.value })
          }
          placeholder='Input value in global state'
        />
      </div>
      <div className='mb-3'>
        <h6>Modal (unnecessarily global)</h6>
        <button
          className='btn btn-sm btn-primary'
          onClick={() =>
            setGlobalState({ ...globalState, isModalOpen: true })
          }
        >
          Open Modal
        </button>
        {globalState.isModalOpen && (
          <div className='modal show d-block mt-2' style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className='modal-dialog'>
              <div className='modal-content'>
                <div className='modal-body'>
                  Modal state is unnecessarily global
                  <button
                    className='btn btn-sm btn-secondary mt-2'
                    onClick={() =>
                      setGlobalState({ ...globalState, isModalOpen: false })
                    }
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className='mt-3'>
        <small className='text-muted'>
          Problems: Unnecessary coupling, harder to test, less portable components
        </small>
      </div>
    </div>
  );
};

// ✅ Good: Appropriate state placement
const TodoInput = () => {
  const [inputValue, setInputValue] = useState(''); // Local state

  return (
    <div className='mb-3'>
      <h6>Input (properly local)</h6>
      <input
        type='text'
        className='form-control'
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder='Input value properly local'
      />
    </div>
  );
};

const ModalExample = () => {
  const [isModalOpen, setIsModalOpen] = useState(false); // Local state

  return (
    <div className='mb-3'>
      <h6>Modal (properly local)</h6>
      <button className='btn btn-sm btn-primary' onClick={() => setIsModalOpen(true)}>
        Open Modal
      </button>
      {isModalOpen && (
        <div className='modal show d-block mt-2' style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className='modal-dialog'>
            <div className='modal-content'>
              <div className='modal-body'>
                Modal state is properly local
                <button
                  className='btn btn-sm btn-secondary mt-2'
                  onClick={() => setIsModalOpen(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const GoodApproach = () => {
  const [todos, setTodos] = useState<string[]>([]); // Global state

  return (
    <div>
      <TodoInput />
      <ModalExample />
      <div className='mt-3'>
        <small className='text-muted'>
          Benefits: Clear separation, components are portable, easier to test
        </small>
      </div>
    </div>
  );
};

export default LocalVsGlobalState;
