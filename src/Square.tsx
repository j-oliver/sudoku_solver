import { FC, ReactNode } from 'react';

type Props = {
  squarekey: string;
  value: number;
  initial?: boolean;
  numberpicker?: ReactNode;
  showNumberPicker?: () => void;
  removeNumber?: () => void;
};

export const Square: FC<Props> = ({
  squarekey,
  initial,
  value,
  numberpicker,
  removeNumber,
  showNumberPicker,
}) => {
  const isInitial = initial ? 'bg-gray-400' : '';
  return numberpicker ? (
    numberpicker
  ) : (
    <div
      key={squarekey}
      className={`flex justify-center items-center w-full h-full text-xl bg-gray-200 select-none ${isInitial} border-[1px] border-gray-500`}
      onClick={() => showNumberPicker && showNumberPicker()}
      onContextMenu={event => {
        event.stopPropagation();
        event.preventDefault();
        removeNumber && removeNumber();
      }}
    >
      {value === 0 ? '' : value}
    </div>
  );
};
