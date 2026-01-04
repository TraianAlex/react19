import { useEffect, useState, useTransition } from 'react';

export default function Delay({
  delay = 0,
  children,
}: {
  delay?: number;
  children: React.ReactNode;
}) {
  const [isPending, startTransition] = useTransition();
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    setShouldRender(false);

    const timeout = setTimeout(() => {
      // This schedules the expensive content for rendering after a short delay,
      // letting React flush urgent things first (like tab updates).
      startTransition(() => {
        setShouldRender(true);
      });
    }, delay);

    return () => {
      clearTimeout(timeout);
    };
  }, [delay]);

  if (isPending) {
    return (
      <div className='spinner-border text-primary' role='status'>
        <span className='visually-hidden'>Loading...</span>
      </div>
    );
  }

  if (!shouldRender) {
    return null;
  }

  return <>{children}</>;
}
