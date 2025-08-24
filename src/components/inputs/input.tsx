import type { InputHTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
};

function Input({ className, label, ...props }: InputProps) {
  return (
    <div className={twMerge('w-full flex flex-col gap-1', className)}>
      <label className="text-grey px-3">{label}</label>
      <input
        className={twMerge(
          'border-2 border-primary',
          'cursor-pointer rounded-3xl px-3 py-2 font-semibold',
          'transition-all duration-500 disabled:cursor-auto',
          className
        )}
        {...props}
      ></input>
    </div>
  );
}
export default Input;
