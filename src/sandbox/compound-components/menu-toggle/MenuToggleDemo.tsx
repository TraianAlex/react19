import { Menu } from './index';

function MenuToggleDemo() {
  const sports = ['Tennis', 'Pickleball', 'Racquetball', 'Squash'];

  return (
    <Menu>
      <Menu.Button>Sports</Menu.Button>
      <Menu.Dropdown>
        {sports.map((sport) => (
          <Menu.Items key={sport}>{sport}</Menu.Items>
        ))}
      </Menu.Dropdown>
    </Menu>
  );
}

export default MenuToggleDemo;
