export default function TabButton({
  action,
  children,
  isActive,
}: {
  action: () => void;
  children: React.ReactNode;
  isActive: boolean;
}) {
  if (isActive) {
    return <b className='me-2'>{children}</b>;
  }
  return (
    <button
      className='btn btn-link me-2'
      onClick={async () => {
        await action();
      }}
    >
      {children}
    </button>
  );
}
