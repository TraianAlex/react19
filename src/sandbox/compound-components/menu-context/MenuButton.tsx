import { Button } from 'react-bootstrap';
import { useContext } from 'react';
import { MenuContext } from './Menu';

interface MenuButtonProps {
  children: React.ReactNode;
}

export default function MenuButton({ children }: MenuButtonProps) {
  const { toggle, open, menuId } = useContext(MenuContext);

  return (
    <Button
      variant='outline-primary'
      onClick={toggle}
      aria-expanded={open}
      aria-haspopup='true'
      aria-controls={menuId}
    >
      {children}
    </Button>
  );
}
