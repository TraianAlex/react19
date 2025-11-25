import { Button } from 'react-bootstrap';
import { Toggle } from '../Toggle';

interface MenuButtonProps {
  children: React.ReactNode;
}

export default function MenuButton({ children }: MenuButtonProps) {
  return (
    <Toggle.Button>
      <Button variant='outline-primary' aria-haspopup='true'>
        {children}
      </Button>
    </Toggle.Button>
  );
}
