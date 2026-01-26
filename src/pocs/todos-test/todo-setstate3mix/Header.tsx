import {
  Suspense,
  useRef,
  useEffect,
  useTransition,
  useMemo,
  use,
} from 'react';
import { dayOfYear, randomColor } from './utils';
import { State } from './store';
import { useSelector, setSubTitle, initPageInfo, setTitle } from './actions';
import { LoadingSpinner } from '../../../components/LoadingSpinner';

export const Header = () => {
  // const title = useSelector<string>((state: State) => state.title);
  const subTitle = useSelector<string>((state: State) => state.subTitle);
  const count1 = useSelector<number>((state: State) => state.count1);
  const [isPending, startTransition] = useTransition();
  // const [isPendingTitle, startTransitionTitle] = useTransition();

  const titlePromise = useMemo(() => setTitle(), []);

  const mounted = useRef(false);

  useEffect(() => {
    if (mounted.current) return;
    mounted.current = true;
    startTransition(async () => {
      await initPageInfo();
    });
  });

  const modifSubtitle = () => {
    startTransition(async () => {
      await setSubTitle();
    });
  };

  // const modifTitle = () => {
  //   startTransitionTitle(async () => {
  //     await setTitle();
  //   });
  // };

  const subTitlePromise = new Promise<React.ReactElement>((resolve) => {
    resolve(<SubTitle subTitle={subTitle} />);
  });

  // const titlePromise = new Promise<React.ReactElement>((resolve) => {
  //   resolve(<Title title={title} />);
  // });

  console.log('render Header');

  return (
    <div className='d-flex justify-content-between gap-2'>
      <div>
        <Suspense
          fallback={<LoadingSpinner size='sm' text='Loading title...' />}
        >
          <Title titlePromise={titlePromise} />
        </Suspense>
        {/* <button
          className='btn btn-sm btn-outline-primary ms-2'
          onClick={modifTitle}
        >
          Set Title
        </button> */}
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
        <Suspense
          fallback={<LoadingSpinner size='sm' text='Loading subtitle...' />}
        >
          {subTitlePromise}
        </Suspense>
        <button
          className='btn btn-sm btn-outline-primary ms-2'
          onClick={modifSubtitle}
          disabled={isPending}
        >
          Modify Subtitle
        </button>
      </div>
    </div>
  );
};

function Title({ titlePromise }: { titlePromise: Promise<string> }) {
  const title = use(titlePromise);
  return (
    <span>
      Title: {title} / Today is the {dayOfYear(new Date())} day
    </span>
  );
}

function SubTitle({ subTitle }: { subTitle: string }) {
  let startTime = performance.now();
  while (performance.now() - startTime < 1000) {}

  return (
    <div className='badge bg-secondary text-center mb-2'>
      SubTitle: {subTitle}
    </div>
  );
}
