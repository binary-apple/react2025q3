import { Input, Checkbox, GenderPicker } from '@/components/inputs';
import Button from '@/components/button';
import { useState, type FormEvent } from 'react';
import useSubmit from '@/hooks/useSubmit';

function ControlledForm() {
  const [formState, setFormState] = useState({
    name: '',
    age: '' as number | '',
    email: '',
    gender: '' as 'male' | 'female' | 'other' | '',
    terms: false,
  });
  const submit = useSubmit(formState, 'controlled');

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    submit();
    console.log(formState);
  };

  const onReset = (e: FormEvent) => {
    e.preventDefault();
    setFormState({
      name: '',
      age: '',
      email: '',
      gender: '',
      terms: false,
    });
  };

  return (
    <div>
      <h2 className="font-bold m-2 text-xl">Controlled form</h2>
      <form className="flex flex-col gap-2">
        <Input placeholder="Name" label="Name" />
        <Input placeholder="Age" label="Age" type="number" />
        <Input placeholder="Email" label="Email" type="email" />
        <GenderPicker />
        <Checkbox label="Accept T&C" />
        <div className="flex gap-2 justify-evenly">
          <Button type="submit" onClick={onSubmit}>
            Submit
          </Button>
          <Button type="reset" onClick={onReset}>
            Reset
          </Button>
        </div>
      </form>
    </div>
  );
}

export default ControlledForm;
