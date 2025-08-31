import type { ButtonHTMLAttributes, PropsWithChildren } from 'react';
import { twMerge } from 'tailwind-merge';

type Variant = 'text' | 'contained';

type Size = 'medium' | 'small';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  size?: Size;
};

const VARIANT_CLASSES: Record<Variant, string> = {
  contained:
    'bg-primary hover:bg-primary-dark disabled:bg-disabled disabled:text-on-disabled',
  text: 'bg-transparent text-primary disabled:text-on-disabled',
};

const SIZE_CLASSES: Record<Size, string> = {
  medium: 'px-3 py-2 ',
  small: 'p-0',
};

function Button({
  variant = 'contained',
  size = 'medium',
  className,
  children,
  ...props
}: PropsWithChildren<ButtonProps>) {
  return (
    <button
      className={twMerge(
        VARIANT_CLASSES[variant],
        SIZE_CLASSES[size],
        'cursor-pointer rounded-md font-bold',
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
