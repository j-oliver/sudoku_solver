import { FC, useRef } from 'react';
import { useOnClickOutside } from './useOnOutsideClick';

type Props = {
  availableNumbers: number[];
  enterNumber: (number: number) => void;
  resetNumberPicker: () => void;
};
const numberpickergrid = [1, 2, 3, 4, 5, 6, 7, 8, 9];

export const NumberPicker: FC<Props> = ({
  availableNumbers,
  enterNumber,
  resetNumberPicker,
}) => {
  const numberPickerRef = useRef(null);

  useOnClickOutside(numberPickerRef, resetNumberPicker);

  return (
    <div
      ref={numberPickerRef}
      className="flex flex-wrap justify-around w-[44px] h-[44px] z-[2] m-[3px] bg-white opacity-95"
    >
      {numberpickergrid.map(number => {
        return availableNumbers.includes(number) ? (
          <span
            key={number}
            className="text-center p-0 w-1/3 h-1/3 text-sm select-none hover:cursor-pointer hover:text-red-700"
            onClick={() => enterNumber(number)}
          >
            {number}
          </span>
        ) : (
          <span
            key={number}
            className="text-center p-0 w-1/3 h-1/3 text-sm select-none hover:cursor-pointer hover:text-red-700 opacity-50 hover:text-black"
          >
            {number}
          </span>
        );
      })}
    </div>
  );
  // }
};
