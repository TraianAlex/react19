import { Button } from 'react-bootstrap';

interface MenuButtonProps {
  children: React.ReactNode;
}

export default function MenuButton({ children }: MenuButtonProps) {
  return (
    <Button variant='outline-primary' aria-haspopup='true'>
      {children}
    </Button>
  );
}
