import Toggle from './Toggle';
import ToggleButton from './ToggleButton';
import ToggleOn from './ToggleOn';
import ToggleOff from './ToggleOff';
import ToggleDisplay from './ToggleDisplay';

const ToggleCompounded = Object.assign(Toggle, {
  Button: ToggleButton,
  On: ToggleOn,
  Off: ToggleOff,
  Display: ToggleDisplay,
});

export { ToggleCompounded as Toggle };
