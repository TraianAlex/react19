interface MenuDropdownProps {
  children: React.ReactNode;
  open?: boolean;
  menuId?: string;
}

// aria-hidden={!open}
export default function MenuDropdown({
  children,
  open,
  menuId,
}: MenuDropdownProps) {
  return open ? (
    <div className='menu-dropdown' id={menuId}>
      {children}
    </div>
  ) : null;
}
