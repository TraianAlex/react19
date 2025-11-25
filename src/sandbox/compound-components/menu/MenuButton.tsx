import { Button } from 'react-bootstrap';

interface MenuButtonProps {
  children: React.ReactNode;
  toggle?: () => void;
}

export default function MenuButton({ children, toggle }: MenuButtonProps) {
  return <Button variant='outline-primary' onClick={toggle}>{children}</Button>;
}
