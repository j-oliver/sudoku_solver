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
      className="grid grid-cols-3 justify-around bg-white opacity-95"
    >
      {numberpickergrid.map(number => {
        return availableNumbers.includes(number) ? (
          <div
            key={number}
            className="text-center text-xs select-none hover:cursor-pointer hover:text-red-700"
            onClick={() => enterNumber(number)}
          >
            {number}
          </div>
        ) : (
          <div
            key={number}
            className="text-center text-xs select-none hover:cursor-pointer opacity-50 hover:text-black"
          >
            {number}
          </div>
        );
      })}
    </div>
  );
  // }
};
