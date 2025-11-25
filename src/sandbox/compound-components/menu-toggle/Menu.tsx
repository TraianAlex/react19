import { Toggle } from '../Toggle';

interface MenuProps {
  children: React.ReactNode;
}

export default function Menu({ children }: MenuProps) {
  return (
    <Toggle>
      <div className='menu' role='menu'>
        {children}
      </div>
    </Toggle>
  );
}
