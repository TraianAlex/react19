import { createContext, useContext } from 'react';
import useToggle from '../../hooks/useToggle';

interface MenuProps {
  children: React.ReactNode;
  onOpen: () => void;
}

const MenuContext = createContext<{ open: boolean; toggleOpen: () => void }>({
  open: false,
  toggleOpen: () => {},
});

export default function Menu({ children, onOpen }: MenuProps) {
  const [open, toggleOpen] = useToggle({
    initialValue: false,
    onToggle: onOpen,
  });

  return (
    <MenuContext.Provider value={{ open, toggleOpen }}>
      <div className='menu' role='menu'>
        {children}
      </div>
    </MenuContext.Provider>
  );
}

export const useMenuContext = () => {
  const context = useContext(MenuContext);
  if (!context) {
    throw new Error('useMenuContext must be used within a MenuProvider');
  }
  return context;
};
