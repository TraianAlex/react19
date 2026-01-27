import { useState, createContext, useContext } from 'react';

// ❌ Bad: Everything in global state
interface BadGlobalStore {
  todos: string[];
  modalOpen: boolean; // Only used in one component
  inputValue: string; // Only used in one component
  user: { name: string; email: string } | null;
}

// ✅ Good: Only truly global state is global
interface User {
  name: string;
  email: string;
}

interface ThemeContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};

const GlobalState = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className='container-fluid'>
        <h1 className='mb-4'>3. Global Client State</h1>

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

            <div className='card border-success mb-4'>
              <div className='card-header bg-success text-white'>
                <h5 className='mb-0'>✅ Good: Only truly global state is global</h5>
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
                  Global client state should live in context providers, Zustand, or Redux, but only 
                  when it needs to be global. You might've seen the opposite, where projects where 
                  every piece of state gets lifted into a global store "just in case."
                </p>
                <p>
                  That approach only adds weight. It creates unnecessary coupling, makes components 
                  less portable, and complicates testing. Global state is powerful, but like any 
                  powerful tool, it should be used carefully.
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
const GlobalStore = {
  todos: [],
  modalOpen: false, // Only used in one component
  inputValue: '', // Only used in one component
};

// ✅ Good: Only truly global state is global
const GlobalStore = {
  user: null, // Used across multiple features
  theme: 'light', // Used across entire app
};

// Local state stays local
const Modal = () => {
  const [isOpen, setIsOpen] = useState(false); // Local to Modal
};`}</code>
                </pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ThemeContext.Provider>
  );
};

// ❌ Bad: Everything in global state
const BadApproach = () => {
  // Simulating global store with everything
  const [modalOpen, setModalOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [todos, setTodos] = useState<string[]>([]);

  return (
    <div>
      <div className='mb-3'>
        <h6>Modal (only used here, but in global state)</h6>
        <button onClick={() => setModalOpen(true)} className='btn btn-sm btn-primary'>
          Open Modal
        </button>
        {modalOpen && (
          <div className='modal show d-block' style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className='modal-dialog'>
              <div className='modal-content'>
                <div className='modal-header'>
                  <h5 className='modal-title'>Modal</h5>
                  <button
                    type='button'
                    className='btn-close'
                    onClick={() => setModalOpen(false)}
                  ></button>
                </div>
                <div className='modal-body'>This modal state is unnecessarily global</div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className='mb-3'>
        <h6>Input (only used here, but in global state)</h6>
        <input
          type='text'
          className='form-control'
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder='Input value unnecessarily global'
        />
      </div>

      <div className='mt-3'>
        <small className='text-muted'>
          Problems: Creates unnecessary coupling, makes components less portable,
          complicates testing, harder to reason about state flow
        </small>
      </div>
    </div>
  );
};

// ✅ Good: Only truly global state is global
const GoodApproach = () => {
  const { theme, toggleTheme } = useTheme();
  // Local state stays local
  const [modalOpen, setModalOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');

  return (
    <div>
      <div className='mb-3'>
        <h6>Theme (truly global - used across app)</h6>
        <div className={`p-3 border rounded bg-${theme === 'dark' ? 'dark text-white' : 'light'}`}>
          <p className='mb-2'>Current theme: {theme}</p>
          <button onClick={toggleTheme} className='btn btn-sm btn-primary'>
            Toggle Theme
          </button>
        </div>
      </div>

      <div className='mb-3'>
        <h6>Modal (local state - only used here)</h6>
        <button onClick={() => setModalOpen(true)} className='btn btn-sm btn-primary'>
          Open Modal
        </button>
        {modalOpen && (
          <div className='modal show d-block' style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className='modal-dialog'>
              <div className='modal-content'>
                <div className='modal-header'>
                  <h5 className='modal-title'>Modal</h5>
                  <button
                    type='button'
                    className='btn-close'
                    onClick={() => setModalOpen(false)}
                  ></button>
                </div>
                <div className='modal-body'>This modal state is properly local</div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className='mb-3'>
        <h6>Input (local state - only used here)</h6>
        <input
          type='text'
          className='form-control'
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder='Input value properly local'
        />
      </div>

      <div className='mt-3'>
        <small className='text-muted'>
          Benefits: Clear separation, components are portable, easier to test,
          easier to reason about state flow
        </small>
      </div>
    </div>
  );
};

export default GlobalState;
