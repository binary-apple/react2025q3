import type { InputHTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
};

function Checkbox({ className, label, ...props }: InputProps) {
  return (
    <div className={twMerge('w-full flex gap-3 px-3', className)}>
      <label className="group relative flex items-center gap-2 cursor-pointer select-none">
        <input type="checkbox" className="peer absolute h-0 w-0" {...props} />

        <span
          className={twMerge(
            'relative h-6 w-6 rounded border-2 border-foreground bg-white',
            'peer-checked:bg-primary group-hover:bg-grey',
            'after:absolute after:rotate-45 after:h-4 after:w-0.5',
            'after:bottom-0.5 after:right-1.5',
            'before:absolute before:-rotate-45 before:h-2.5 before:w-0.5',
            'before:bottom-0.5 before:left-1',
            'peer-checked:after:bg-foreground peer-checked:before:bg-foreground'
          )}
        ></span>
        <span className="font-semibold group-hover:text-grey ">{label}</span>
      </label>
    </div>
  );
}
export default Checkbox;
