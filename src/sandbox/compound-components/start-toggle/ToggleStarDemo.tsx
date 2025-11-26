import { BsStar, BsStarFill } from 'react-icons/bs';
import './ToggleStarDemo.modules.scss';

import { Toggle } from '../Toggle/index';

function ToggleStarDemo({ onChange }: { onChange: () => void }) {
  return (
    <>
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

      <Toggle>
        <Toggle.Button>
          <Toggle.Display>
            {(on) => {
              return <div className={`box ${on ? 'filled' : ''}`}></div>;
            }}
          </Toggle.Display>
        </Toggle.Button>
      </Toggle>
    </>
  );
}

export default ToggleStarDemo;
