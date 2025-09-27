import { useContext } from 'react';

import { ThemeContext } from '../../contexts/ThemeContext';

export const withTheme = (Component: any) => {
  const Func = (props: any) => {
    const { darkTheme, toggleTheme } = useContext(ThemeContext);
  
    return (
      <Component {...props} darkTheme={darkTheme} toggleTheme={toggleTheme} />
    );
  };
  return Func;
};
