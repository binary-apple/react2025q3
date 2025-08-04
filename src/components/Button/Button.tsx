import { type ButtonHTMLAttributes, type PropsWithChildren } from 'react';

function Button({
  className,
  children,
  ...props
}: PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>>) {
  return (
    <button
      className={`cursor-pointer bg-primary hover:bg-primary-dark disabled:bg-disabled text-background font-bold py-1 px-3 rounded transition-all duration-500 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
