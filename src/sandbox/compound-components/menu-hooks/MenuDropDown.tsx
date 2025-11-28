import { useMenuContext } from './Menu';

interface MenuDropdownProps {
  children: React.ReactNode;
}

export default function MenuDropdown({ children }: MenuDropdownProps) {
  const { open } = useMenuContext();

  return open ? <div className='menu-dropdown'>{children}</div> : null;
}
