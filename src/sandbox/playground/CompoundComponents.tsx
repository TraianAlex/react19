import { useState } from 'react';

import { Modal } from '../compound-components/components/Modal';
import { Root } from '../compound-components/context/useEditContactContext';
import { Title } from '../compound-components/components/Title';
import { SubmitButtons } from '../compound-components/components/SubmitButtons';
import { FormInputs } from '../compound-components/components/FormInputs';

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
        {showModal && (
          <EditContact.Root contactId={contactId}>
            <Modal
              onClose={() => setShowModal(false)}
              title={<EditContact.Title />}
              footer={<EditContact.SubmitButtons />}
            >
              <EditContact.FormInputs />
            </Modal>
          </EditContact.Root>
        )}
      </div>

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

export default CompoundComponents;

// Export as a compound component
export const EditContact = {
  Root,
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
