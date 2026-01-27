import { createContext, useContext, useState, ReactNode } from 'react';

// ❌ Bad: Monolithic Modal with tons of props
interface BadModalProps {
  isOpen: boolean;
  title: string;
  content: string;
  primaryButton: string;
  secondaryButton: string;
  onPrimaryClick: () => void;
  onSecondaryClick: () => void;
}

const BadModal = ({
  isOpen,
  title,
  content,
  primaryButton,
  secondaryButton,
  onPrimaryClick,
  onSecondaryClick,
}: BadModalProps) => {
  if (!isOpen) return null;

  return (
    <div className='modal show d-block' style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className='modal-dialog'>
        <div className='modal-content'>
          <div className='modal-header'>
            <h5 className='modal-title'>{title}</h5>
          </div>
          <div className='modal-body'>{content}</div>
          <div className='modal-footer'>
            <button className='btn btn-secondary' onClick={onSecondaryClick}>
              {secondaryButton}
            </button>
            <button className='btn btn-danger' onClick={onPrimaryClick}>
              {primaryButton}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Example usage of BadModal
const BadModalExample = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button className='btn btn-primary mb-3' onClick={() => setIsOpen(true)}>
        Open Modal
      </button>
      <BadModal
        isOpen={isOpen}
        title='Confirm Delete'
        content='Are you sure?'
        primaryButton='Delete'
        secondaryButton='Cancel'
        onPrimaryClick={() => {
          alert('Deleted!');
          setIsOpen(false);
        }}
        onSecondaryClick={() => {
          alert('Cancelled!');
          setIsOpen(false);
        }}
      />
      <div className='mt-3'>
        <small className='text-muted'>
          Problems: Requires many props, less flexible, harder to customize layout,
          button actions must handle closing manually
        </small>
      </div>
    </div>
  );
};

const CompoundComponents = () => {
  return (
    <div className='container-fluid'>
      <h1 className='mb-4'>16. Compound Components</h1>

      <div className='row'>
        <div className='col-md-6'>
          <div className='card border-danger mb-4'>
            <div className='card-header bg-danger text-white'>
              <h5 className='mb-0'>❌ Bad: Monolithic Modal with tons of props</h5>
            </div>
            <div className='card-body'>
              <BadModalExample />
            </div>
          </div>
        </div>

        <div className='col-md-6'>
          <div className='card border-success mb-4'>
            <div className='card-header bg-success text-white'>
              <h5 className='mb-0'>✅ Good: Compound components provide flexibility</h5>
            </div>
            <div className='card-body'>
              <GoodModalExample />
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
                Use compound components for complex UI patterns that need to work together. Provides 
                flexibility and clarity.
              </p>
              <p>
                Compound Components for complex UI patterns that need to work together. Instead of a 
                monolithic Modal with tons of props, compound components provide flexibility and clarity.
              </p>
            </div>
          </div>

          <div className='card mb-4'>
            <div className='card-header'>
              <h5 className='mb-0'>Code Example</h5>
            </div>
            <div className='card-body'>
              <pre className='bg-light p-3 rounded' style={{ fontSize: '0.875rem' }}>
                <code>{`// Instead of a monolithic Modal with tons of props
<Modal 
  title="Confirm Delete"
  content="Are you sure?"
  primaryButton="Delete"
  secondaryButton="Cancel"
  onPrimaryClick={handleDelete}
  onSecondaryClick={handleCancel}
/>

// Compound components provide flexibility and clarity
<Modal isOpen={isModalOpen} onClose={handleClose}>
  <Modal.Header>
    <Modal.Title>Confirm Delete</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    <p>Are you sure you want to delete this item?</p>
  </Modal.Body>
  <Modal.Footer>
    <Button variant="danger" onClick={handleDelete}>Delete</Button>
    <Button variant="secondary" onClick={handleCancel}>Cancel</Button>
  </Modal.Footer>
</Modal>`}</code>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ✅ Good: Compound components provide flexibility
interface ModalContextType {
  isOpen: boolean;
  onClose: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

const useModalContext = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('Modal components must be used within Modal');
  }
  return context;
};

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const Modal = ({ isOpen, onClose, children }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <ModalContext.Provider value={{ isOpen, onClose }}>
      <div className='modal show d-block' style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
        <div className='modal-dialog'>
          <div className='modal-content'>{children}</div>
        </div>
      </div>
    </ModalContext.Provider>
  );
};

const ModalHeader = ({ children }: { children: ReactNode }) => {
  return <div className='modal-header'>{children}</div>;
};

const ModalTitle = ({ children }: { children: ReactNode }) => {
  return <h5 className='modal-title'>{children}</h5>;
};

const ModalBody = ({ children }: { children: ReactNode }) => {
  return <div className='modal-body'>{children}</div>;
};

const ModalFooter = ({ children }: { children: ReactNode }) => {
  return <div className='modal-footer'>{children}</div>;
};

const ModalCloseButton = () => {
  const { onClose } = useModalContext();
  return (
    <button
      type='button'
      className='btn-close'
      onClick={onClose}
      aria-label='Close'
    ></button>
  );
};

// Attach sub-components to Modal
Modal.Header = ModalHeader;
Modal.Title = ModalTitle;
Modal.Body = ModalBody;
Modal.Footer = ModalFooter;
Modal.CloseButton = ModalCloseButton;

// Example usage
const GoodModalExample = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button className='btn btn-primary mb-3' onClick={() => setIsOpen(true)}>
        Open Modal
      </button>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <Modal.Header>
          <Modal.Title>Confirm Delete</Modal.Title>
          <Modal.CloseButton />
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to delete this item?</p>
        </Modal.Body>
        <Modal.Footer>
          <button className='btn btn-secondary' onClick={() => setIsOpen(false)}>
            Cancel
          </button>
          <button
            className='btn btn-danger'
            onClick={() => {
              alert('Deleted!');
              setIsOpen(false);
            }}
          >
            Delete
          </button>
        </Modal.Footer>
      </Modal>
      <div className='mt-3'>
        <small className='text-muted'>
          Benefits: Flexible composition, clear structure, reusable sub-components,
          easier to customize and extend
        </small>
      </div>
    </div>
  );
};

export default CompoundComponents;
