import Button from '@/components/button';
import type { PropsWithChildren } from 'react';

function ModalContent({
  onClose,
  children,
}: PropsWithChildren<{
  onClose: VoidFunction;
}>) {
  return (
    <div
      role="dialog"
      aria-modal="true"
      onClick={(e) => e.stopPropagation()}
      className="absolute bg-background z-10 left-1/2 -translate-x-1/2 w-1/2 h-1/2 border-2 border-primary rounded-xl shadow-lg shadow-primary/70"
    >
      <div className="relative flex flex-col gap-2 justify-evenly items-center w-full h-full">
        <Button
          onClick={onClose}
          variant="text"
          className="absolute top-0 right-0"
        >
          <span aria-hidden className="text-4xl leading-none">
            &times;
          </span>
        </Button>
        {children}
      </div>
    </div>
  );
}

export default ModalContent;
