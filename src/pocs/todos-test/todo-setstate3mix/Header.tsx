import { useTransition } from 'react';
import { dayOfYear, pause, randomColor, randomString } from './utils';
import { State } from './store';
import { useSelector, setSubTitle } from './actions';

export const Header = () => {
  const title = useSelector<string>((state: State) => state.title);
  const subTitle = useSelector<string>((state: State) => state.subTitle);
  const count1 = useSelector<number>((state: State) => state.count1);
  const [isPending, startTransition] = useTransition();

  const modifSubtitle = async () => {
    startTransition(async () => {
      await pause(1000);
      setSubTitle(randomString());
    });
  };

  console.log('render Header');

  return (
    <div className='d-flex justify-content-between gap-2'>
      <div>
        Title: {title} / Today is the {dayOfYear(new Date())} day
      </div>
      <div>
        <span
          style={{
            backgroundColor: `${randomColor()}`,
            width: '30%',
            marginRight: '10px',
          }}
        >
          Colours: {randomColor()}
        </span>
        <div>Count1: {count1}</div>
      </div>
      <div>
        <div className='badge bg-secondary text-center mb-2'>
          SubTitle: {subTitle}
        </div>
        <button
          className='btn btn-outline-primary ms-2'
          onClick={modifSubtitle}
          disabled={isPending}
        >
          Modify Subtitle
        </button>
      </div>
    </div>
  );
};
