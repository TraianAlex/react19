import { BsStar, BsStarFill } from 'react-icons/bs';

import { Toggle } from './index';

function ToggleDemo() {
  return (
    <Toggle>
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

export default ToggleDemo;
