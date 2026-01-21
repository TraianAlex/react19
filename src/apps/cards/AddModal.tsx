import { useState } from 'react';
import Modal from 'react-modal';
import { Button } from 'react-bootstrap';

Modal.setAppElement('#root');

interface AddModalProps {
  isOpen: boolean;
  onAdd: (text: string) => void;
  onClose: () => void;
}

export default function AddModal({ isOpen, onAdd, onClose }: AddModalProps) {
  const [cardText, setCardText] = useState('');

  const handleSubmit = () => {
    if (cardText.trim()) {
      onAdd(cardText.trim());
      setCardText('');
      onClose();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      shouldFocusAfterRender={true}
      shouldReturnFocusAfterClose={true}
      ariaHideApp={true}
      style={{
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          transform: 'translate(-50%, -50%)',
          width: '300px',
          padding: '20px',
        },
      }}
      contentLabel="Add Card"
    >
      <h4>Add a new card</h4>
      <input
        type="text"
        value={cardText}
        onChange={(e) => setCardText(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
        autoFocus
        style={{
          width: '100%',
          padding: '8px',
          marginTop: '10px',
          marginBottom: '10px',
          fontSize: '16px',
          border: '1px solid #333',
          borderRadius: '4px',
        }}
        placeholder="Enter card text..."
      />
      <div style={{ display: 'flex', gap: '10px' }}>
        <Button onClick={handleSubmit} className="btn btn-primary" style={{ flex: 1 }}>
          Add
        </Button>
        <Button onClick={onClose} className="btn btn-secondary" style={{ flex: 1 }}>
          Cancel
        </Button>
      </div>
    </Modal>
  );
}
