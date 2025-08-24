import Button from '@/components/button';
import { ControlledForm, UncontrolledForm } from '@/components/forms';
import FormDataList from '@/components/forms-data';
import Portal from '@/components/modal/portal';
import { useState, type ReactNode } from 'react';

function MainPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState<ReactNode>(null);
  return (
    <div className="flex flex-col gap-3">
      <header>
        <h1 className="my-3 text-2xl font-bold">Forms</h1>
        <div className="flex gap-3">
          <Button
            onClick={() => {
              setForm(<ControlledForm />);
              setIsOpen(true);
            }}
          >
            Controlled form
          </Button>
          <Button
            onClick={() => {
              setForm(<UncontrolledForm />);
              setIsOpen(true);
            }}
          >
            Uncontrolled form
          </Button>
        </div>
      </header>
      <main>
        <FormDataList />
        <Portal isOpen={isOpen} onClose={() => setIsOpen(false)}>
          {form}
        </Portal>
      </main>
    </div>
  );
}

export default MainPage;
