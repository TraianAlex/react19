import Modal from 'react-modal';
import { Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useSetState } from '../../hooks/useSetState';

Modal.setAppElement('#root');

export default function AddModal({ isOpen, onAdd, onClose }: { isOpen: boolean, onAdd: (cardText: string) => void, onClose: () => void }) {
  const [{ cardText, isDone }, setState] = useSetState({
    cardText: '',
    isDone: false,
  });

  const handleClickAdd = () => {
    if (!cardText || cardText.length > 300) {
      toast('Max 300 chars!');
      return;
    }
    onAdd(cardText);
    setState({ isDone: true });
  };

  if (isDone) {
    setTimeout(() => onClose(), 2000);
  }

  return (
    <Modal
      isOpen={isOpen}
      shouldFocusAfterRender={true}
      shouldReturnFocusAfterClose={true}
      ariaHideApp={true}
      style={{
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
          width: '250px',
          height: '270px',
        },
      }}
      contentLabel="Add Card Modal"
    >
      {isDone && (
        <div>
          <h2>
            Done{' '}
            <span role="img" aria-label="check">
              ✅
            </span>
          </h2>
          <Button
            className="mt-4 bg-dark text-white p-1 w-100 align-content-center"
            style={{ fontSize: 18 }}
            onClick={onClose}
          >
            Close
          </Button>
        </div>
      )}

      {!isDone && (
        <>
          <h4>Add a new card</h4>

          <div
            style={{
              fontSize: 14,
              fontWeight: 700,
            }}
          >
            Card text
          </div>
          <input
            type="text"
            className="form-control-plaintext"
            autoFocus
            style={{
              border: '1px solid #333',
              width: '100%',
              margin: '0 auto',
              fontSize: 17,
              padding: 4,
              marginTop: 5,
            }}
            value={cardText}
            onChange={(ev) => setState({ cardText: ev.target.value })}
          />

          <Button
            className="mt-4 bg-dark text-white p-1 w-100 align-content-center"
            style={{ fontSize: 18 }}
            onClick={handleClickAdd}
          >
            Add
          </Button>
          <Button
            className="mt-2 bg-dark text-white p-1 w-100 align-content-center"
            style={{ fontSize: 18 }}
            onClick={onClose}
          >
            Cancel
          </Button>
        </>
      )}
    </Modal>
  );
}
