import { Input, Checkbox, GenderPicker } from '@/components/inputs';
import Button from '@/components/button';
import useSubmit from '@/hooks/useSubmit';
import type { FormEvent } from 'react';
import type { Gender } from '@/types';

function UncontrolledForm({ onClose }: { onClose: VoidFunction }) {
  const submit = useSubmit('uncontrolled');
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);

    const name = String(fd.get('name') ?? '');
    const ageString = String(fd.get('age') ?? '');
    const age =
      ageString === ''
        ? ''
        : Number.isFinite(Number(ageString))
          ? Number(ageString)
          : '';
    const email = String(fd.get('email') ?? '').trim();
    const gender = (fd.get('gender') ?? '') as Gender | '';
    const terms = fd.get('terms') === 'on';

    submit({
      name,
      age,
      email,
      gender,
      terms,
    });

    e.currentTarget.reset();
    onClose();
  };

  const onReset = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.currentTarget.reset();
  };

  return (
    <div>
      <h2 className="font-bold m-2 text-xl">Uncontrolled form</h2>
      <form
        onSubmit={onSubmit}
        onReset={onReset}
        className="flex flex-col gap-2"
      >
        <Input placeholder="Name" label="Name" name="name" />
        <Input placeholder="Age" label="Age" type="number" name="age" />
        <Input placeholder="Email" label="Email" type="email" name="email" />
        <GenderPicker />
        <Checkbox label="Accept T&C" name="terms" />
        <div className="flex gap-2 justify-evenly">
          <Button type="submit">Submit</Button>
          <Button type="reset">Reset</Button>
        </div>
      </form>
    </div>
  );
}

export default UncontrolledForm;
