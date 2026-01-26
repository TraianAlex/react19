import { memo, Suspense, use, useState } from 'react';
import { dayOfYear, randomColor } from './utils';
import { State } from './store';
import { useSelector, setSubTitle, setTitle } from './actions';
import { LoadingSpinner } from '../../../components/LoadingSpinner';
import { sleep } from '../../../shared/utils/utils';

export const Header = () => {
  const count1 = useSelector<number>((state: State) => state.count1);

  const [titlePromise, setTitlePromise] = useState<Promise<string>>(() =>
    setTitle(),
  );
  const [subTitlePromise, setSubTitlePromise] = useState<Promise<string>>(() =>
    setSubTitle(),
  );

  const modifSubtitle = () => {
    setSubTitlePromise(setSubTitle());
  };

  const modifTitle = () => {
    setTitlePromise(setTitle());
  };

  console.log('render Header');

  return (
    <div className='d-flex justify-content-between gap-2'>
      <div>
        <Suspense
          fallback={<LoadingSpinner size='sm' text='Loading title...' />}
        >
          <Title titlePromise={titlePromise} />
        </Suspense>
        <button
          className='btn btn-sm btn-outline-primary ms-2'
          onClick={modifTitle}
        >
          Set Title
        </button>
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
          <SubTitle subTitlePromise={subTitlePromise} />
        </Suspense>
        <button
          className='btn btn-sm btn-outline-primary ms-2'
          onClick={modifSubtitle}
        >
          Modify Subtitle
        </button>
      </div>
    </div>
  );
};

const Title = memo(function Title({
  titlePromise,
}: {
  titlePromise: Promise<string>;
}) {
  const title = use(titlePromise);
  sleep(1000);

  return (
    <span>
      Title: {title} / Today is the {dayOfYear(new Date())} day
    </span>
  );
});

const SubTitle = memo(function SubTitle({
  subTitlePromise,
}: {
  subTitlePromise: Promise<string>;
}) {
  const subTitle = use(subTitlePromise);
  sleep(1000);

  return (
    <div className='badge bg-secondary text-center mb-2'>
      SubTitle: {subTitle}
    </div>
  );
});
