interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  text?: string;
}

export function LoadingSpinner({
  size = 'md',
  text = 'Loading...',
}: LoadingSpinnerProps) {
  const sizeClass = {
    sm: 'spinner-border-sm',
    md: '',
    lg: 'spinner-border-lg',
  }[size];

  return (
    <div className='d-flex align-items-center justify-content-center p-3'>
      <div
        className={`spinner-border text-primary me-2 ${sizeClass}`}
        role='status'
      >
        <span className='visually-hidden'>Loading...</span>
      </div>
      <span className='text-muted'>{text}</span>
    </div>
  );
}
