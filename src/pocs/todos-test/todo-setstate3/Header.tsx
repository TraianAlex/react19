import { useTransition } from 'react';
import { dayOfYear, pause, randomColor, randomString } from './utils';
import { State } from './store';
import { useSelector, setSubTitle } from './actions';
import { LoadingSpinner } from '../../../components/LoadingSpinner';

export const Header = () => {
  const title = useSelector<string>((state: State) => state.title);
  const subTitle = useSelector<string>((state: State) => state.subTitle);
  const count1 = useSelector<number>((state: State) => state.count1);

  const [isPendingSubTitle, startTransitionSubTitle] = useTransition();

  const modifSubTitle = () => {
    startTransitionSubTitle(async () => {
      await setSubTitle(randomString());
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
        {isPendingSubTitle ? (
          <LoadingSpinner size='sm' text='Loading subtitle...' />
        ) : (
          <div className='badge bg-secondary text-center mb-2'>
            SubTitle: {subTitle}
          </div>
        )}
        <button
          className='btn btn-outline-primary ms-2'
          onClick={modifSubTitle}
        >
          Modify Subtitle
        </button>
      </div>
    </div>
  );
};
