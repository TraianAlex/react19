import { Toggle } from '../Toggle/index';
import { Menu } from './index';

function MenuToggleBeforeDemo() {
  const sports = ['Home', 'About', 'Contact', 'Blog'];

  return (
    <Toggle>
      <Menu>
        <Toggle.Button>
          <Menu.Button>Menu</Menu.Button>
        </Toggle.Button>
        <Toggle.On>
          <Menu.Dropdown>
            {sports.map((sport) => (
              <Menu.Items key={sport}>{sport}</Menu.Items>
            ))}
          </Menu.Dropdown>
        </Toggle.On>
      </Menu>
    </Toggle>
  );
}

export default MenuToggleBeforeDemo;
