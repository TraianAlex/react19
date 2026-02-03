import { useState, useEffect, useRef } from 'react';

const FocusTrap = () => {
  return (
    <div className='container-fluid'>
      <h1 className='mb-4'>36. Focus Trap Hook</h1>

      <div className='row'>
        <div className='col-md-8 offset-md-2'>
          <div className='card border-success mb-4'>
            <div className='card-header bg-success text-white'>
              <h5 className='mb-0'>✅ Good: Reusable focus trap hook</h5>
            </div>
            <div className='card-body'>
              <FocusTrapExample />
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
                Create reusable focus management hooks for components that need to trap focus.
              </p>
              <p>
                Custom Focus Hook for reusable focus management. Create reusable focus management 
                hooks for components that need to trap focus.
              </p>
            </div>
          </div>

          <div className='card mb-4'>
            <div className='card-header'>
              <h5 className='mb-0'>Code Example</h5>
            </div>
            <div className='card-body'>
              <pre className='bg-light p-3 rounded' style={{ fontSize: '0.875rem' }}>
                <code>{`const useFocusTrap = (isActive) => {
  const containerRef = useRef();
  
  useEffect(() => {
    if (!isActive) return;
    
    const container = containerRef.current;
    if (!container) return;
    
    const focusableElements = container.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];
    
    const handleTabKey = (e) => {
      if (e.key !== 'Tab') return;
      
      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          lastElement.focus();
          e.preventDefault();
        }
      } else {
        if (document.activeElement === lastElement) {
          firstElement.focus();
          e.preventDefault();
        }
      }
    };
    
    container.addEventListener('keydown', handleTabKey);
    return () => container.removeEventListener('keydown', handleTabKey);
  }, [isActive]);
  
  return containerRef;
};`}</code>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const useFocusTrap = (isActive: boolean) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isActive) return;

    const container = containerRef.current;
    if (!container) return;

    const focusableElements = container.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );

    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      if (e.shiftKey) {
        // Shift + Tab
        if (document.activeElement === firstElement) {
          lastElement.focus();
          e.preventDefault();
        }
      } else {
        // Tab
        if (document.activeElement === lastElement) {
          firstElement.focus();
          e.preventDefault();
        }
      }
    };

    container.addEventListener('keydown', handleTabKey);
    return () => container.removeEventListener('keydown', handleTabKey);
  }, [isActive]);

  return containerRef;
};

const FocusTrapExample = () => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useFocusTrap(isOpen);

  useEffect(() => {
    if (isOpen) {
      const container = containerRef.current;
      if (container) {
        const firstFocusable = container.querySelector(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        ) as HTMLElement;
        firstFocusable?.focus();
      }
    }
  }, [isOpen, containerRef]);

  return (
    <div>
      <button className='btn btn-primary mb-3' onClick={() => setIsOpen(true)}>
        Open Focus Trap Modal
      </button>
      <p className='text-muted'>
        When the modal opens, focus is trapped inside it. Try pressing Tab to cycle through
        the buttons - focus will loop back to the beginning when you reach the end.
      </p>

      {isOpen && (
        <div
          className='modal show d-block'
          style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
        >
          <div className='modal-dialog'>
            <div className='modal-content' ref={containerRef}>
              <div className='modal-header'>
                <h5 className='modal-title'>Focus Trap Example</h5>
                <button
                  type='button'
                  className='btn-close'
                  onClick={() => setIsOpen(false)}
                  aria-label='Close'
                ></button>
              </div>
              <div className='modal-body'>
                <p>Focus is trapped inside this modal.</p>
                <p className='text-muted small'>
                  Press Tab to move forward, Shift+Tab to move backward. Focus will cycle
                  through the buttons and won't escape the modal.
                </p>
              </div>
              <div className='modal-footer'>
                <button className='btn btn-secondary' onClick={() => setIsOpen(false)}>
                  Cancel
                </button>
                <button className='btn btn-primary' onClick={() => setIsOpen(false)}>
                  Save Changes
                </button>
                <button className='btn btn-danger' onClick={() => setIsOpen(false)}>
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className='mt-3'>
        <small className='text-muted'>
          <strong>Benefits:</strong>
          <ul className='mb-0 mt-2'>
            <li>Focus stays within the modal</li>
            <li>Tab cycles through focusable elements</li>
            <li>Reusable hook for any component</li>
            <li>Improves keyboard navigation experience</li>
          </ul>
        </small>
      </div>
    </div>
  );
};

export default FocusTrap;
