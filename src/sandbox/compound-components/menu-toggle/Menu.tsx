import { Toggle } from '../Toggle';

interface MenuProps {
  children: React.ReactNode;
  onOpen?: () => void;
}

export default function Menu({ children, onOpen }: MenuProps) {
  return (
    <Toggle onToggle={onOpen}>
      <div className='menu' role='menu'>
        {children}
      </div>
    </Toggle>
  );
}
