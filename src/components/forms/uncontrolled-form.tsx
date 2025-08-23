import { Input } from '@/components/inputs';
import Button from '@/components/button';

function UncontrolledForm() {
  return (
    <div>
      <h2 className="font-bold m-2 text-xl">Uncontrolled form</h2>
      <form className="flex flex-col gap-2">
        <Input placeholder="Name" label="Name" />
        <Input placeholder="Age" label="Age" type="number" />
        <Input placeholder="Email" label="Email" type="email" />
        <div className="flex gap-2 justify-evenly">
          <Button type="submit">Submit</Button>
          <Button type="reset">Reset</Button>
        </div>
      </form>
    </div>
  );
}

export default UncontrolledForm;
