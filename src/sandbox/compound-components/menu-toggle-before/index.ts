import Menu from './Menu';
import MenuButton from './MenuButton';
import MenuDropdown from './MenuDropDown';
import MenuItems from './MenuItems';

const MenuCompounded = Object.assign(Menu, {
  Button: MenuButton,
  Dropdown: MenuDropdown,
  Items: MenuItems,
});

export { MenuCompounded as Menu };
