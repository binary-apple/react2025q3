import { useEffect, type PropsWithChildren } from 'react';
import { createPortal } from 'react-dom';
import ModalContent from './modal-content';

export default function Portal({
  isOpen,
  onClose,
  children,
}: PropsWithChildren<{ isOpen: boolean; onClose: VoidFunction }>) {
  useEffect(() => {
    if (!isOpen) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', onKey);

    const prevOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', onKey);
      document.documentElement.style.overflow = prevOverflow;
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <>
      {createPortal(
        <div
          className="fixed inset-0 z-50 grid place-items-center bg-background/70"
          onClick={onClose}
        >
          <ModalContent onClose={() => onClose()}>{children}</ModalContent>
        </div>,
        document.body
      )}
    </>
  );
}
