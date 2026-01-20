import { dayOfYear, pause, randomColor } from './utils';
import { setSubTitle, useSelector, useStore } from './TodoStore';

export const Header = () => {
  const title = useSelector<string>((state) => state.title);
  const subTitle = useSelector<string>((state) => state.subTitle);
  const count1 = useSelector<number>((state) => state.count1);

  const modifSubtitle = async () => {
    await pause(1000);
    setSubTitle('something else');
  };

  console.log('render Header');

  return (
    <div style={{ width: '90%', margin: 'auto' }}>
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
        Count1: {count1}
      </div>
      <div>
        SubTitle: {subTitle}
        <button
          style={{
            border: '1px solid black',
            marginLeft: '5px',
            padding: ' 0 5px',
          }}
          onClick={modifSubtitle}
        >
          Modify Subtitle
        </button>
      </div>
      <hr />
    </div>
  );
};
