import { useState, useEffect, useRef } from 'react';

const FocusManagement = () => {
  return (
    <div className='container-fluid'>
      <h1 className='mb-4'>35. Focus Management</h1>

      <div className='row'>
        <div className='col-md-8 offset-md-2'>
          <div className='card border-success mb-4'>
            <div className='card-header bg-success text-white'>
              <h5 className='mb-0'>✅ Good: Proper focus management</h5>
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
                Building interactions that work well with keyboards, not just mice or touch, is 
                essential for accessibility. This means carefully managing focus, offering skip 
                links to help users bypass repeated content, and making sure all interactive elements 
                can be reached using the keyboard alone.
              </p>
              <p>
                Focus management is especially important in components like modals. When a modal opens, 
                focus should move into it, and when it closes, focus should return to where it was 
                before. This keeps keyboard users oriented and prevents them from getting lost in the UI.
              </p>
            </div>
          </div>

          <div className='card mb-4'>
            <div className='card-header'>
              <h5 className='mb-0'>Code Example</h5>
            </div>
            <div className='card-body'>
              <pre className='bg-light p-3 rounded' style={{ fontSize: '0.875rem' }}>
                <code>{`const Modal = ({ isOpen, onClose, children }) => {
  const modalRef = useRef();
  
  useEffect(() => {
    if (isOpen) {
      const previousFocus = document.activeElement;
      
      // Focus first focusable element in modal
      const firstFocusable = modalRef.current?.querySelector(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      firstFocusable?.focus();
      
      // Return focus when modal closes
      return () => {
        previousFocus?.focus();
      };
    }
  }, [isOpen]);
  
  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };
  
  if (!isOpen) return null;
  
  return (
    <div
      ref={modalRef}
      role="dialog"
      aria-modal="true"
      onKeyDown={handleKeyDown}
      className="modal"
    >
      {children}
    </div>
  );
};`}</code>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Modal = ({
  isOpen,
  onClose,
  children,
}: {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      const previousFocus = document.activeElement as HTMLElement;

      // Focus first focusable element in modal
      const firstFocusable = modalRef.current?.querySelector(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      ) as HTMLElement;
      firstFocusable?.focus();

      // Return focus when modal closes
      return () => {
        previousFocus?.focus();
      };
    }
  }, [isOpen]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      ref={modalRef}
      role='dialog'
      aria-modal='true'
      onKeyDown={handleKeyDown}
      className='modal show d-block'
      style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
    >
      <div className='modal-dialog'>
        <div className='modal-content'>{children}</div>
      </div>
    </div>
  );
};

const ModalExample = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button className='btn btn-primary mb-3' onClick={() => setIsOpen(true)}>
        Open Modal
      </button>
      <p className='text-muted'>
        When the modal opens, focus moves to the first focusable element inside it.
        Press Escape to close. When it closes, focus returns to the button.
      </p>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <div className='modal-header'>
          <h5 className='modal-title'>Focus Management Example</h5>
          <button
            type='button'
            className='btn-close'
            onClick={() => setIsOpen(false)}
            aria-label='Close'
          ></button>
        </div>
        <div className='modal-body'>
          <p>Focus is automatically moved here when the modal opens.</p>
          <input
            type='text'
            className='form-control mb-3'
            placeholder='First focusable element'
            autoFocus
          />
          <button className='btn btn-primary me-2' onClick={() => setIsOpen(false)}>
            Save
          </button>
          <button className='btn btn-secondary' onClick={() => setIsOpen(false)}>
            Cancel
          </button>
        </div>
      </Modal>
      <div className='mt-3'>
        <small className='text-muted'>
          <strong>Benefits:</strong>
          <ul className='mb-0 mt-2'>
            <li>Focus moves into modal when it opens</li>
            <li>Focus returns to trigger element when modal closes</li>
            <li>Escape key closes the modal</li>
            <li>Keyboard users stay oriented</li>
          </ul>
        </small>
      </div>
    </div>
  );
};

export default FocusManagement;
