import { FC } from 'react';

type Props = {
  squarekey: string;
  value: number;
  css: string;
  numberpicker?: JSX.Element;
  showNumberPicker?: () => void;
  removeNumber?: () => void;
};

export const Square: FC<Props> = ({
  squarekey,
  css,
  value,
  numberpicker,
  removeNumber,
  showNumberPicker,
}) => {
  const isInitial = css === 'initial' ? 'bg-gray-400' : '';
  return (
    <div key={squarekey} className="relative">
      {numberpicker ? (
        numberpicker
      ) : (
        <div
          className={`text-center text-xl leading-[50px] shadow-md bg-gray-200 w-[50px] h-[50px] select-none ${isInitial}`}
          onClick={() => showNumberPicker && showNumberPicker()}
          onContextMenu={event => {
            event.stopPropagation();
            event.preventDefault();
            removeNumber && removeNumber();
          }}
        >
          {value === 0 ? '' : value}
        </div>
      )}
    </div>
  );
};
