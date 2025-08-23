import type { ButtonHTMLAttributes, PropsWithChildren } from 'react';
import { twMerge } from 'tailwind-merge';

type Variant = 'text' | 'contained';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
};

const VARIANT_CLASSES: Record<Variant, string> = {
  contained:
    'bg-primary hover:bg-primary-dark disabled:bg-disabled disabled:text-on-disabled',
  text: 'bg-transparent text-primary disabled:text-on-disabled',
};

function Button({
  variant = 'contained',
  className,
  children,
  ...props
}: PropsWithChildren<ButtonProps>) {
  return (
    <button
      className={twMerge(
        VARIANT_CLASSES[variant],
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
