import { useCallback, useReducer, useState } from 'react';
import { Status } from './Status';
import { Content } from './Content';
import { Sidebar } from './Sidebar';
import { AppProvider } from './appContext';
import { useDarkMode } from './useDarkMode';
import { usePicture } from './usePicture';
import { useNetwork } from './useNetwork';
import { useStorage } from './useStorage';
import { useComplete } from './useComplete';

const reducer = (state: any, action: any) => {
  switch (action.type) {
    case 'buttonClick':
      return { ...state, count: state.count + 1 };
    case 'setUsername':
      return { ...state, username: action.value };
    default:
      return state;
  }
};
const Test = () => {
  const [messages, setMessages] = useState(['test1', 'test2', 'test3']);
  const [state, dispatch] = useReducer(reducer, { count: 0, username: '' });
  const isDarkMode = useDarkMode();

  const [date, setDate] = useState('2026-05-31');
  // const picture = usePicture(date);
  const {
    data: picture,
    error,
    loading,
  } = useNetwork({
    url: `https://picsum.photos/seed/${encodeURIComponent(date)}/300/200`,
  });

  const [count, setCount] = useStorage('count', 0);

  const completeCallback = useCallback((data: any) => console.log(data), []);
  useComplete(completeCallback);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount((prev: number) => prev + 1)}>Increment</button>
      <div>
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        <img
          src={picture.url}
          alt={picture.title}
          width={300}
          height={200}
          style={{ objectFit: 'cover', display: 'block' }}
        />
        <p>{picture.title}</p>
        <p>{picture.explanation}</p>
      </div>
      <hr />
      <AppProvider>
        <Content />
        <Sidebar />
      </AppProvider>
      <hr />
      <div
        style={{
          height: 100,
          width: 100,
          color: isDarkMode ? 'white' : 'black',
          backgroundColor: isDarkMode ? 'black' : 'white',
        }}
      >
        Some content
      </div>
      <hr />
      <button onClick={() => dispatch({ type: 'buttonClick' })}>Click me</button>
      <p>Count: {state.count}</p>
      <input
        type="text"
        value={state.username}
        onChange={(e) => dispatch({ type: 'setUsername', value: e.target.value })}
      />
      <p>Username: {state.username}</p>
      <hr />
      <ul>
        <Status onEnter={(value: string) => setMessages([value, ...messages])} />
        {messages.map((message: string) => (
          <li key={message}>{message}</li>
        ))}
      </ul>
    </div>
  );
};

export default Test;
