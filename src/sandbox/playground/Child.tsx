import { useRef, useState } from 'react';

export const Child = ({
  clickParentHandler,
  value,
}: {
  clickParentHandler: () => void;
  value: number;
}) => {
  console.log('Child rendered', value); // 3 clicks values is 4

  const handleClick = () => {
    clickParentHandler();
  };
  return (
    <button onClick={handleClick} className='btn btn-primary'>
      Child button
    </button>
  );
};

export const TabTest = () => {
  const [tab, setTab] = useState('profile');

  return (
    <div>
      <button onClick={() => setTab('profile')}>Profile</button>
      <button onClick={() => setTab('settings')}>Settings</button>

      {tab === 'profile' ? (
        <TextInput title='Profile Input' />
      ) : (
        <>
          <TextInput title='Settings Input' />
          <TextInputWithFocusButton />
        </>
      )}
    </div>
  );
};

function TextInput({ title }: { title: string }) {
  return <input type='text' placeholder={title} />;
}

export const TextInputWithFocusButton = () => {
  // Create a ref to store the input DOM element
  const inputRef = useRef(null);

  function handleClick() {
    // When the button is clicked, focus the input element if it exists
    (inputRef.current as unknown as HTMLInputElement).focus();
  }

  return (
    <div>
      <input ref={inputRef} type='text' placeholder='Type here...' />
      <button onClick={handleClick}>Focus the input</button>
    </div>
  );
};
