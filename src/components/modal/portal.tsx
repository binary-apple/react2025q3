import { useState, type PropsWithChildren } from 'react';
import { createPortal } from 'react-dom';
import ModalContent from './modal-content';
import Button from '../button';

export default function Portal({ children }: PropsWithChildren) {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <Button onClick={() => setShowModal(true)}>
        Show modal using a portal
      </Button>
      {showModal &&
        createPortal(
          <ModalContent onClose={() => setShowModal(false)}>
            {children}
          </ModalContent>,
          document.body
        )}
    </>
  );
}
