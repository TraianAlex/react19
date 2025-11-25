import { useContext } from 'react';
import { MenuContext } from './Menu';

interface MenuDropdownProps {
  children: React.ReactNode;
}

export default function MenuDropdown({ children }: MenuDropdownProps) {
  const { open, menuId } = useContext(MenuContext);

  //  aria-hidden={!open}
  return open ? (
    <div className='menu-dropdown' id={menuId}>
      {children}
    </div>
  ) : null;
}
