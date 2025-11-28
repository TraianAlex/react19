import { Menu } from './index';

function MenuHooksDemo() {
  const sports = ['Tennis', 'Pickleball', 'Racquetball', 'Squash'];

  return (
    <Menu onOpen={() => console.log('Menu Toggled')}>
      <Menu.Button>Sports (hooks)</Menu.Button>
      <Menu.Dropdown>
        {sports.map((sport) => (
          <Menu.Items key={sport}>{sport}</Menu.Items>
        ))}
      </Menu.Dropdown>
    </Menu>
  );
}

export default MenuHooksDemo;
