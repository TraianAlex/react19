import { useEffect } from 'react';

interface ModalProps {
  onClose: () => void;
  title: React.ReactNode;
  footer: React.ReactNode;
  children: React.ReactNode;
}

export const Modal = ({ onClose, title, footer, children }: ModalProps) => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  return (
    <div className='modal-overlay' onClick={onClose}>
      <div className='modal-content' onClick={(e) => e.stopPropagation()}>
        <div className='modal-header'>
          <h2 className='modal-title'>{title}</h2>
          <button className='btn-close' onClick={onClose}>
            <span className='visually-hidden'>Close</span>
          </button>
        </div>
        <div className='modal-body'>{children}</div>
        <div className='modal-footer'>{footer}</div>
      </div>
    </div>
  );
};
