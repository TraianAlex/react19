import { Count2 } from './Count2';
import { useStore } from './TodoStore';
import { clearCookies, randomString } from './utils';

export const Footer = () => {
  const [render, setRender] = useStore('render');

  console.log('render Footer, random string');

  return (
    <div style={{ width: '90%', margin: 'auto' }}>
      <hr />
      <Count2 /> Random string: {randomString()}
      <button
        style={{
          border: '1px solid black',
          marginLeft: '10px',
          padding: '0 5px',
        }}
        onClick={() => setRender(!render)}
      >
        Render
      </button>
      <button
        style={{
          border: '1px solid black',
          marginLeft: '10px',
          padding: '0 5px',
        }}
        onClick={() => clearCookies()}
      >
        Clear Cookies
      </button>
    </div>
  );
};
