import { Suspense, use, useMemo, useState } from 'react';
import { Button } from 'react-bootstrap';
import {
  getFetcheddataWithCache,
  revalidate,
  saveSomethingWithCache,
  type SaveSomethingResult,
} from './actions/save-name';

function SimpleActionExampleContent() {
  const [result, setResult] = useState<SaveSomethingResult | null>(null);

  const fetchPromise = useMemo(() => {
    return getFetcheddataWithCache();
  }, []);

  const fetchedData = use(fetchPromise);

  const handleRevalidate = () => {
    revalidate();
    setResult(null);
  };

  const handleResult = async () => {
    const savedResult = await saveSomethingWithCache();
    setResult(savedResult);
  };

  return (
    <>
      <h3 className='mt-4'>Simple Action Example Page</h3>
      <SubmitButton onResult={handleResult} />
      <Button className='ms-3' onClick={handleRevalidate}>
        Revalidate
      </Button>
      <p>
        Result:{' '}
        {JSON.stringify(result ?? fetchedData)}
      </p>
    </>
  );
}
export function SimpleActionExample() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SimpleActionExampleContent />
    </Suspense>
  );
}

type SubmitButtonProps = {
  onResult?: () => Promise<void> | void;
};

export const SubmitButton = ({ onResult }: SubmitButtonProps) => {
  const onClick = async () => {
    // await saveSomething('POST Some data from client');
    await onResult?.();
  };
  return <Button onClick={onClick}>Click Me to trigger action</Button>;
};
