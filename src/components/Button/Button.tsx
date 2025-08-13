import { type ButtonHTMLAttributes, type PropsWithChildren } from 'react';

function Button({
  className,
  children,
  ...props
}: PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>>) {
  return (
    <button
      className={`bg-primary hover:bg-primary-dark disabled:bg-disabled text-background cursor-pointer rounded px-3 py-1 font-bold transition-all duration-500 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
