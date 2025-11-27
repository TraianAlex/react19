import MenuDemo from './menu-context/MenuDemo';
import MenuDemoContext from './menu-context/MenuDemo';
import MenuToggleBeforeDemo from './menu-toggle-before/MenuToggleBeforeDemo';
import MenuToggleDemo from './menu-toggle/MenuToggleDemo';
import ToggleStarDemo from './start-toggle/ToggleStarDemo';

export default function CompoundComponentsDemo() {
  return (
    <div>
      <div className='d-flex gap-2'>
        <MenuDemo />
        <MenuDemoContext />
        <MenuToggleBeforeDemo />
        <MenuToggleDemo />
      </div>
      <ToggleStarDemo onChange={() => 'persist it'} />
    </div>
  );
}
