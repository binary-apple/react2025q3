import type { PropsWithChildren } from 'react';
import { createPortal } from 'react-dom';
import ModalContent from './modal-content';

export default function Portal({
  isOpen,
  onClose,
  children,
}: PropsWithChildren<{ isOpen: boolean; onClose: VoidFunction }>) {
  return (
    <>
      {isOpen &&
        createPortal(
          <ModalContent onClose={() => onClose()}>{children}</ModalContent>,
          document.body
        )}
    </>
  );
}
