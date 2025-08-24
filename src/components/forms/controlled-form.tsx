import { Input, Checkbox, GenderPicker } from '@/components/inputs';
import Button from '@/components/button';
import { useState, type FormEvent } from 'react';
import useSubmit from '@/hooks/useSubmit';

function ControlledForm({ onClose }: { onClose: VoidFunction }) {
  const [formState, setFormState] = useState({
    name: '',
    age: '' as number | '',
    email: '',
    gender: '' as 'male' | 'female' | 'other' | '',
    terms: false,
  });
  const submit = useSubmit('controlled');

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    submit(formState);
    setFormState({
      name: '',
      age: '',
      email: '',
      gender: '',
      terms: false,
    });
    onClose();
  };

  return (
    <div>
      <h2 className="font-bold m-2 text-xl">Controlled form</h2>
      <form className="flex flex-col gap-2">
        <Input
          placeholder="Name"
          label="Name"
          value={formState.name}
          onChange={(e) =>
            setFormState((prev) => ({ ...prev, name: e.target.value }))
          }
        />
        <Input
          placeholder="Age"
          label="Age"
          type="number"
          value={formState.age}
          onChange={(e) =>
            setFormState((prev) => {
              const value = e.target.value;
              return { ...prev, age: value === '' ? '' : +value };
            })
          }
        />
        <Input
          placeholder="Email"
          label="Email"
          type="email"
          value={formState.email}
          onChange={(e) =>
            setFormState((prev) => ({ ...prev, email: e.target.value }))
          }
        />
        <GenderPicker />
        <Checkbox
          label="Accept T&C"
          checked={formState.terms}
          onChange={(e) =>
            setFormState((prev) => ({ ...prev, terms: e.target.checked }))
          }
        />
        <div className="flex gap-2 justify-evenly">
          <Button type="submit" onClick={onSubmit}>
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
}

export default ControlledForm;
