import { useTransition } from 'react';

export default function TabButton({
  action,
  children,
  isActive,
}: {
  action: () => void;
  children: React.ReactNode;
  isActive: boolean;
}) {
  const [isPending, startTransition] = useTransition();

  if (isActive) {
    return <b className='me-2'>{children}</b>;
  }
  if (isPending) {
    return <b className='text-secondary'>{children}</b>;
  }
  return (
    <button
      className='btn btn-link me-2'
      onClick={() => {
        startTransition(async () => {
          await action();
        });
      }}
    >
      {children}
    </button>
  );
}
