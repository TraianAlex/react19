import { dayOfYear, pause, randomColor } from './utils';
import { setSubTitle, useStore } from './TodoStore';

export const Header = () => {
  const title = useStore('title');
  const subTitle = useStore('subTitle');
  const count = useStore('count');

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
        Count1: {count}
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
