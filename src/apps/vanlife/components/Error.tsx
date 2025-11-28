import { useRouteError } from 'react-router-dom';

export default function Error() {
  const error = useRouteError();

  return (
    <>
      <h1>Error: {(error as any).message}</h1>
      <pre>
        {(error as any).status} - {(error as any).statusText}
      </pre>
    </>
  );
}
