import { useState } from 'react';

export const Status = ({ onEnter }: { onEnter: (value: string) => void }) => {
  const [message, setMessage] = useState('');

  return (
    <div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyUp={(e) => {
          if (e.key === 'Enter') {
            onEnter(message);
            setMessage('');
          }
        }}
      />
    </div>
  );
};
