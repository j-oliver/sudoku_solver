import { FC, ReactNode, MouseEventHandler, Key } from 'react';

type Props = {
  squarekey: Key;
  value: number;
  initial?: boolean;
  numberpicker?: ReactNode;
  selected?: boolean;
  selectSquare?: () => void;
  removeNumber?: () => void;
};

export const Square: FC<Props> = ({
  squarekey,
  initial,
  value,
  selected,
  removeNumber,
  selectSquare,
}) => {
  const isInitial = initial ? 'bg-gray-400 text-gray-800' : 'cursor-pointer';
  const isSelected = selected ? 'bg-green-500' : '';

  const onLeftClick: MouseEventHandler<HTMLDivElement> = () => {
    if (!initial) {
      selectSquare && selectSquare();
    }
  };

  const onRightClick: MouseEventHandler<HTMLDivElement> = event => {
    event.stopPropagation();
    event.preventDefault();
    if (!initial) {
      removeNumber && removeNumber();
    }
  };
  return (
    <div
      key={squarekey}
      className={`flex justify-center items-center w-full h-full text-xl bg-gray-200 select-none ${isInitial} ${isSelected} border-[1px] border-gray-500`}
      onClick={onLeftClick}
      onContextMenu={onRightClick}
    >
      {value === 0 ? '' : value.toString(16).toUpperCase()}
    </div>
  );
};
