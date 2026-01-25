import { Count2 } from './Count2';
import { useStore } from './actions';
import { clearCookies, randomString } from './utils';

export const Footer = () => {
  const [render, setRender] = useStore('render');

  console.log('render Footer, random string');

  return (
    <footer className='text-center'>
      <hr />
      <Count2 />
      <div className='badge bg-secondary text-center'>Random string: {randomString()}</div>
      <button className='btn btn-outline-primary ms-2'
        onClick={() => setRender(!render)}
      >
        Render
      </button>
      <button className='btn btn-outline-primary ms-2'
        onClick={() => clearCookies()}
      >
        Clear Cookies
      </button>
      <hr />
      <a href='https://github.com/TraianAlex/react19/tree/main/src/pocs/todos-test/todo-setstate3mix' target='_blank' rel='noopener noreferrer'>Custom external store repository</a>
    </footer>
  );
};
