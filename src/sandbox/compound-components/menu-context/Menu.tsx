import { createContext, useContext, useId, useState } from 'react';

interface MenuProps {
  children: React.ReactNode;
}

const MenuContext = createContext({
  open: false,
  toggle: () => {},
  menuId: '',
});

export const useMenuContext = () => {
  const context = useContext(MenuContext);
  if (!context) {
    throw new Error('useMenuContext must be used within a MenuProvider');
  }
  return context;
};

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
