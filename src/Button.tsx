import { ButtonHTMLAttributes, ReactNode, FC } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

export const Button: FC<ButtonProps> = ({
  children,
  className,
  ...buttonProps
}) => {
  const cssClass = `shadow-md p-2 border-2 rounded-lg hover:filter hover:brightness-95 ${className}`;

  return (
    <button {...buttonProps} className={cssClass}>
      {children}
    </button>
  );
};
