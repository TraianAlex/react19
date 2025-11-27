import Menu from "./Menu"
import MenuButton from "./MenuButton"
import MenuDropdown from "./MenuDropDown"
import MenuItem from "./MenuItems"

function MenuDemo() {
  const sports = ["Tennis", "Pickleball", "Racquetball", "Squash"]
  
  return (
    <Menu>
      <MenuButton>Sports (old way)</MenuButton>
      <MenuDropdown>
        {sports.map(sport => (
          <MenuItem key={sport}>{sport}</MenuItem>
        ))}
      </MenuDropdown>
    </Menu>
  )
}

export default MenuDemo;
