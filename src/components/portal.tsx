import Button from '@components/button';
import { useState } from 'react';
import { createPortal } from 'react-dom';
import ModalContent from '@components/modal-content';
import type { OptionalColumns } from '@/types';

type Props = {
  selectedColumns: Set<OptionalColumns>;
  setSelectedColumns: React.Dispatch<
    React.SetStateAction<Set<OptionalColumns>>
  >;
};

function Portal({ selectedColumns, setSelectedColumns }: Props) {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <Button onClick={() => setShowModal(true)}>Select columns</Button>
      {showModal &&
        createPortal(
          <ModalContent
            onClose={() => setShowModal(false)}
            selectedColumns={selectedColumns}
            setSelectedColumns={setSelectedColumns}
          />,
          document.body
        )}
    </>
  );
}

export default Portal;
