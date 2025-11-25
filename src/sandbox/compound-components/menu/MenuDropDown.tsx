interface MenuDropdownProps {
  children: React.ReactNode;
  open?: boolean;
}

export default function MenuDropdown({ children, open }: MenuDropdownProps) {
  return open ? <div className='menu-dropdown'>{children}</div> : null;
}
