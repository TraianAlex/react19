import { Activity, useState } from 'react';

import { Modal } from './components/Modal';
import { RootProvider } from './context/useEditContactContext';
import { Title } from './components/Title';
import { SubmitButtons } from './components/SubmitButtons';
import { FormInputs } from './components/FormInputs';

const CompoundComponents = () => {
  const contactId = '1';
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div>
        <button
          type='button'
          className='btn btn-primary mb-2'
          onClick={() => setShowModal(true)}
        >
          Open Contact Modal
        </button>
        <Activity mode={showModal ? 'visible' : 'hidden'}>
          <EditContact.RootProvider
            contactId={contactId}
            onClose={() => setShowModal(false)}
          >
            <Modal
              onClose={() => setShowModal(false)}
              title={<EditContact.Title />}
              footer={<EditContact.SubmitButtons />}
            >
              <EditContact.FormInputs />
            </Modal>
          </EditContact.RootProvider>
        </Activity>
      </div>

      <EditContact.RootProvider contactId={contactId}>
        <div className='right-section'>
          <EditContact.Title />
          <EditContact.SubmitButtons />
        </div>
        <div className='content'>
          <EditContact.FormInputs />
        </div>
      </EditContact.RootProvider>
    </>
  );
};

export default CompoundComponents;

// Export as a compound component
export const EditContact = {
  RootProvider,
  Title,
  SubmitButtons,
  FormInputs,
};

// Usage in EditContactPage.jsx
/*
const EditContactPage = () => {
  return (
    <>
      <EditContact.Root contactId={contactId}>
        <div className='right-section'>
          <EditContact.Title />
          <EditContact.SubmitButtons />
        </div>
        <div className='content'>
          <EditContact.FormInputs />
        </div>
      </EditContact.Root>
    </>
  );
};
*/
// Usage in ContactModal.jsx
/*
function ContactModal({ contactId, onClose }) {
  return (
    <EditContact.Root contactId={contactId}>
      <Modal 
        onClose={onClose}
        title={<EditContact.Title />}
        footer={<EditContact.SubmitButtons />}
      >
        <EditContact.FormInputs />
      </Modal>
    </EditContact.Root>
  );
}
*/
