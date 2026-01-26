import { Suspense, useTransition } from 'react';
import { dayOfYear, randomColor } from './utils';
import { State } from './store';
import { useSelector, setSubTitle } from './actions';

export const Header = () => {
  const title = useSelector<string>((state: State) => state.title);
  const subTitle = useSelector<string>((state: State) => state.subTitle);
  const count1 = useSelector<number>((state: State) => state.count1);
  const [isPending, startTransition] = useTransition();

  const modifSubtitle = () => {
    startTransition(async () => {
      await setSubTitle();
    });
  };

  const subTitlePromise = new Promise<React.ReactElement>((resolve) => {
    resolve(<SubTitle subTitle={subTitle} />);
  });

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
        <Suspense fallback={<div>Loading...</div>}>{subTitlePromise}</Suspense>
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

function SubTitle({ subTitle }: { subTitle: string }) {
  let startTime = performance.now();
  while (performance.now() - startTime < 1000) {
    // Do nothing for 1 second to emulate extremely slow code
  }

  return (
    <div className='badge bg-secondary text-center mb-2'>
      SubTitle: {subTitle}
    </div>
  );
}
