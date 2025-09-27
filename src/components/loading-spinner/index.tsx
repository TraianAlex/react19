import { useEffect, useRef, useState } from 'react';

export const LoadingSpinner = () => {
  return (
    <div className='d-flex justify-content-center align-items-center vh-100'>
      <div
        className='spinner-border text-info'
        style={{ width: '5rem', height: '5rem' }}
        role='status'
      >
        <span className='visually-hidden'>Loading...</span>
      </div>
    </div>
  );
};

interface LoaderMessageProps {
  loadingMsg: string;
  doneMsg: string;
  isLoading: boolean;
}

export const LoaderMessage = ({
  loadingMsg,
  doneMsg,
  isLoading,
}: LoaderMessageProps) => {
  const isLoadingPreviousValue = useRef<boolean | null>(null);
  const [showLoadingMessage, setShowLoadingMessage] = useState(false);
  const [showDoneMessage, setShowDoneMessage] = useState(false);

  useEffect(() => {
    let loadingMessageDelay: number | undefined;
    let doneMessageDelay: number | undefined;

    if (isLoading) {
      loadingMessageDelay = setTimeout(() => {
        setShowLoadingMessage(true);
      }, 400);
    } else {
      if (isLoadingPreviousValue.current) {
        setShowDoneMessage(true);
        doneMessageDelay = setTimeout(() => {
          setShowDoneMessage(false);
        }, 300);
      }
    }
    isLoadingPreviousValue.current = isLoading;
    return () => {
      setShowLoadingMessage(false);
      setShowDoneMessage(false);
      clearTimeout(loadingMessageDelay);
      clearTimeout(doneMessageDelay);
    };
  }, [isLoading]);

  return (
    <div aria-live='assertive' aria-atomic='true'>
      {showLoadingMessage && <p className='loading'>{loadingMsg}</p>}
      {showDoneMessage && <p className='visually-hidden'>{doneMsg}</p>}
    </div>
  );
};

export default LoadingSpinner;
