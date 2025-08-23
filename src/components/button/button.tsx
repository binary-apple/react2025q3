import type { ButtonHTMLAttributes, PropsWithChildren } from 'react';
import { twMerge } from 'tailwind-merge';

function Button({
  className,
  children,
  ...props
}: PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>>) {
  return (
    <button
      className={twMerge(
        'bg-primary hover:bg-primary-dark disabled:bg-disabled disabled:text-on-disabled',
        'cursor-pointer rounded-3xl px-5 py-3 font-bold',
        'transition-all duration-500 disabled:cursor-auto',
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
export default Button;
