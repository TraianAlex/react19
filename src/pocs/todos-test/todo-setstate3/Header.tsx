import { dayOfYear, pause, randomColor, randomString } from './utils';
import { setSubTitle, useSelector } from './TodoStore';

export const Header = () => {
  const title = useSelector<string>((state) => state.title);
  const subTitle = useSelector<string>((state) => state.subTitle);
  const count1 = useSelector<number>((state) => state.count1);

  const modifSubtitle = async () => {
    await pause(1000);
    setSubTitle(randomString());
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
        <div className='badge bg-secondary text-center mb-2'>SubTitle: {subTitle}</div>
        <button className='btn btn-outline-primary ms-2'
          onClick={modifSubtitle}
        >
          Modify Subtitle
        </button>
      </div>
    </div>
  );
};
