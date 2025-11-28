import { Button } from 'react-bootstrap';
import { useMenuContext } from './Menu';

interface MenuButtonProps {
  children: React.ReactNode;
}

export default function MenuButton({ children }: MenuButtonProps) {
  const { toggleOpen } = useMenuContext();

  return (
    <Button variant='outline-primary' aria-haspopup='true' onClick={toggleOpen}>
      {children}
    </Button>
  );
}
