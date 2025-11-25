interface MenuItemProps {
  children: React.ReactNode;
}

export default function MenuItem({ children }: MenuItemProps) {
  return <div className='menu-item'>{children}</div>;
}
