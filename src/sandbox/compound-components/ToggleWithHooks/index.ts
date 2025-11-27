import ToggleButton from './ToggleButton';
import ToggleOn from './ToggleOn';
import ToggleOff from './ToggleOff';
import ToggleDisplay from './ToggleDisplay';
import ToggleWithHooks from './ToggleWithHooks';

const ToggleWithHooksCompounded = Object.assign(ToggleWithHooks, {
  Button: ToggleButton,
  Display: ToggleDisplay,
  On: ToggleOn,
  Off: ToggleOff,
});

export { ToggleWithHooksCompounded as ToggleWithHooks };
