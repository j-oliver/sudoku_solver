import { ReactNode, FC, HTMLAttributes } from 'react';

interface ButtonProps extends HTMLAttributes<HTMLDivElement> {
  disabled?: boolean;
  children: ReactNode;
}

export const Button: FC<ButtonProps> = ({
  children,
  className,
  disabled,
  ...buttonProps
}) => {
  function onClick(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    if (disabled) return;
    buttonProps.onClick && buttonProps.onClick(event);
  }

  return (
    <div
      {...buttonProps}
      onClick={onClick}
      className={`flex cursor-pointer items-center justify-center rounded-lg border-2 p-2 shadow-md hover:brightness-95 hover:filter ${className}`}
    >
      {children}
    </div>
  );
};
