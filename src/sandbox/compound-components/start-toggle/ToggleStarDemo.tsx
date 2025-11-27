import { BsStar, BsStarFill } from 'react-icons/bs';
import './ToggleStarDemo.modules.scss';

import { Toggle } from '../Toggle/index';
import { ToggleWithHooks } from '../ToggleWithHooks/index';

function ToggleStarDemo({ onChange }: { onChange: () => void }) {
  return (
    <>
      <div>Star with toggle</div>
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

      <div>Box with display</div>
      <Toggle onToggle={() => console.log('Box1 toggled')}>
        <Toggle.Button>
          <Toggle.Display>
            {(on) => {
              return <div className={`box ${on ? 'filled' : ''}`}></div>;
            }}
          </Toggle.Display>
        </Toggle.Button>
      </Toggle>

      <div>Box with hooks</div>
      <ToggleWithHooks onToggle={() => console.log('Box2 toggled')}>
        <ToggleWithHooks.Button>
          <ToggleWithHooks.Display>
            {(on) => {
              return <div className={`box ${on ? 'filled' : ''}`}></div>;
            }}
          </ToggleWithHooks.Display>
        </ToggleWithHooks.Button>
      </ToggleWithHooks>
    </>
  );
}

export default ToggleStarDemo;
