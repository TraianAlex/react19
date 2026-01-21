import { memo } from 'react';
import { Button } from 'react-bootstrap';

interface AddButtonProps {
  onClick: () => void;
}

export const AddButton = memo<AddButtonProps>(({ onClick }) => {
  return (
    <Button
      onClick={onClick}
      className="rounded-circle bg-dark text-white"
      style={{
        height: 100,
        width: 100,
        position: 'absolute',
        bottom: 140,
        right: 100,
        fontSize: 20,
        cursor: 'pointer',
      }}
    >
      Add
    </Button>
  );
});
