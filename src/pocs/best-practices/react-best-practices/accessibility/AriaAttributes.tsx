import { useState } from 'react';

const AriaAttributes = () => {
  return (
    <div className='container-fluid'>
      <h1 className='mb-4'>34. ARIA Attributes</h1>

      <div className='row'>
        <div className='col-md-6'>
          <div className='card border-success mb-4'>
            <div className='card-header bg-success text-white'>
              <h5 className='mb-0'>✅ Good: ARIA for toggle button</h5>
            </div>
            <div className='card-body'>
              <ToggleButtonExample />
            </div>
          </div>
        </div>

        <div className='col-md-6'>
          <div className='card border-success mb-4'>
            <div className='card-header bg-success text-white'>
              <h5 className='mb-0'>✅ Good: ARIA for modal</h5>
            </div>
            <div className='card-body'>
              <ModalExample />
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
                Use ARIA attributes when HTML isn't sufficient to convey meaning to assistive 
                technologies.
              </p>
              <p>
                ARIA Attributes when HTML isn't enough. Use ARIA attributes when HTML isn't sufficient 
                to convey meaning to assistive technologies.
              </p>
            </div>
          </div>

          <div className='card mb-4'>
            <div className='card-header'>
              <h5 className='mb-0'>Code Example</h5>
            </div>
            <div className='card-body'>
              <pre className='bg-light p-3 rounded' style={{ fontSize: '0.875rem' }}>
                <code>{`// ✅ Good: ARIA for toggle button
const ToggleButton = ({ pressed, onToggle, children }) => (
  <button
    type="button"
    aria-pressed={pressed}
    onClick={onToggle}
    className={pressed ? 'button-pressed' : 'button-normal'}
  >
    {children}
  </button>
);

// ✅ Good: ARIA for modal
const Modal = ({ isOpen, onClose, title, children }) => (
  <>
    {isOpen && <div className="modal-backdrop" onClick={onClose} />}
    <div
      className={\`modal \${isOpen ? 'modal-open' : 'modal-hidden'}\`}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className="modal-header">
        <h2 id="modal-title">{title}</h2>
        <button
          type="button"
          aria-label="Close modal"
          onClick={onClose}
        >
          ×
        </button>
      </div>
      <div className="modal-content">
        {children}
      </div>
    </div>
  </>
);`}</code>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ✅ Good: ARIA for toggle button
const ToggleButton = ({
  pressed,
  onToggle,
  children,
}: {
  pressed: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) => {
  return (
    <button
      type='button'
      aria-pressed={pressed}
      onClick={onToggle}
      className={`btn ${pressed ? 'btn-primary' : 'btn-outline-primary'}`}
    >
      {children}
    </button>
  );
};

const ToggleButtonExample = () => {
  const [pressed, setPressed] = useState(false);

  return (
    <div>
      <ToggleButton pressed={pressed} onToggle={() => setPressed(!pressed)}>
        {pressed ? 'Following' : 'Follow'}
      </ToggleButton>
      <div className='mt-3'>
        <small className='text-muted'>
          Screen readers will announce: "{pressed ? 'Following, pressed button' : 'Follow, button'}"
        </small>
      </div>
    </div>
  );
};

// ✅ Good: ARIA for modal
const Modal = ({
  isOpen,
  onClose,
  title,
  children,
}: {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}) => {
  if (!isOpen) return null;

  return (
    <>
      <div
        className='modal-backdrop show'
        onClick={onClose}
        style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
      />
      <div
        className='modal show d-block'
        role='dialog'
        aria-modal='true'
        aria-labelledby='modal-title'
      >
        <div className='modal-dialog'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h2 id='modal-title' className='modal-title h5'>
                {title}
              </h2>
              <button
                type='button'
                className='btn-close'
                aria-label='Close modal'
                onClick={onClose}
              ></button>
            </div>
            <div className='modal-content'>{children}</div>
          </div>
        </div>
      </div>
    </>
  );
};

const ModalExample = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button className='btn btn-primary' onClick={() => setIsOpen(true)}>
        Open Modal
      </button>
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title='Example Modal'
      >
        <div className='modal-body'>
          <p>This modal uses proper ARIA attributes:</p>
          <ul>
            <li>
              <code>role="dialog"</code> - Identifies as dialog
            </li>
            <li>
              <code>aria-modal="true"</code> - Indicates modal behavior
            </li>
            <li>
              <code>aria-labelledby</code> - Links to title
            </li>
            <li>
              <code>aria-label</code> - Labels close button
            </li>
          </ul>
        </div>
      </Modal>
    </div>
  );
};

export default AriaAttributes;
