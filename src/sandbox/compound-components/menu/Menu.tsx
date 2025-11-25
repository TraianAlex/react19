import { Children, cloneElement, ReactElement, useId, useState } from 'react';

interface MenuProps {
  children: React.ReactNode;
}

export default function Menu({ children }: MenuProps) {
  const [open, setOpen] = useState(false);
  const menuId = useId();

  function toggle() {
    setOpen((prevOpen) => !prevOpen);
  }

  return (
    <div className='menu' role='menu'>
      {Children.map(children, (child) => {
        return cloneElement(child as ReactElement<any>, {
          open,
          toggle,
        });
      })}
      {/* {Children.map(children, (child) => {
        if (!child || typeof child !== 'object' || !('type' in child))
          return child;
        // Only pass open/toggle to components that expect them:
        return cloneElement(child as ReactElement<any>, {
          ...(child.props && typeof child.props === 'object'
            ? child.props
            : {}),
          ...(typeof child.type === 'function' ? { open, toggle } : {}),
        });
      })} */}
    </div>
  );
}
