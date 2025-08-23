import { useState } from 'react';
import { createPortal } from 'react-dom';
import ModalContent from './modal-content';
import Button from '../button';

export default function Portal() {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <Button onClick={() => setShowModal(true)}>
        Show modal using a portal
      </Button>
      {showModal &&
        createPortal(
          <ModalContent onClose={() => setShowModal(false)} />,
          document.body
        )}
    </>
  );
}
