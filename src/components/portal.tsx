import Button from '@components/button';
import { useState } from 'react';
import { createPortal } from 'react-dom';
import ModalContent from './modal-content';

function Portal() {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <Button onClick={() => setShowModal(true)}>Select columns</Button>
      {showModal &&
        createPortal(
          <ModalContent onClose={() => setShowModal(false)} />,
          document.body
        )}
    </>
  );
}

export default Portal;
