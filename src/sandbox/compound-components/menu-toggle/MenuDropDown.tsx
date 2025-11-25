import { Toggle } from '../Toggle';

interface MenuDropdownProps {
  children: React.ReactNode;
}

export default function MenuDropdown({ children }: MenuDropdownProps) {

  return (
    <Toggle.On>
      <div className='menu-dropdown'>{children}</div>
    </Toggle.On>
  );
}
