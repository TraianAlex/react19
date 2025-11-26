import { BsStar, BsStarFill } from 'react-icons/bs';

import { Toggle } from '../Toggle/index';

function ToggleStarDemo({ onChange }: { onChange?: (on: boolean) => void }) {
  return (
    <Toggle onToggle={onChange}>
      <Toggle.Button>
        <Toggle.On>
          <BsStarFill className='star filled' />
        </Toggle.On>
        <Toggle.Off>
          <BsStar className='star' />
        </Toggle.Off>
      </Toggle.Button>
    </Toggle>
  );
}

export default ToggleStarDemo;
