import { createContext, useId, useState } from 'react';

interface MenuProps {
  children: React.ReactNode;
}

export const MenuContext = createContext({
  open: false,
  toggle: () => {},
  menuId: '',
});

export default function Menu({ children }: MenuProps) {
  const [open, setOpen] = useState(false);
  const menuId = useId();

  function toggle() {
    setOpen((prevOpen) => !prevOpen);
  }

  return (
    <div className='menu' role='menu'>
      <MenuContext.Provider value={{ open, toggle, menuId }}>
        <div className='menu'>{children}</div>
      </MenuContext.Provider>
    </div>
  );
}
