import { FC, useContext, useRef } from 'react';
import { useOnClickOutside } from './useOnOutsideClick';
import { SudokuContext } from './SudokuContext';

type Props = {
  availableNumbers: number[];
  enterNumber: (number: number) => void;
  resetNumberPicker: () => void;
};

export const NumberPicker: FC<Props> = ({
  availableNumbers,
  enterNumber,
  resetNumberPicker,
}) => {
  const numberPickerRef = useRef(null);
  const { size } = useContext(SudokuContext);

  const numberpickergrid = new Array(size * size).fill(0).map((_, i) => i + 1);

  useOnClickOutside(numberPickerRef, resetNumberPicker);

  return (
    <div ref={numberPickerRef} className="flex items-center">
      {numberpickergrid.map(number => {
        return availableNumbers.includes(number) ? (
          <div
            key={number}
            className="flex justify-center items-center shadow-lg rounded-md w-10 h-10 border-2 border-gray-600 hover:w-12 hover:h-12  font-bold select-none hover:cursor-pointer hover:text-red-700"
            onClick={() => enterNumber(number)}
          >
            {number.toString(17).toUpperCase()}
          </div>
        ) : (
          <div
            key={number}
            className="flex justify-center items-center shadow-lg rounded-md w-10 h-10 border-2 border-gray-600 hover:w-12 hover:h-12  select-none hover:cursor-pointer opacity-50 hover:text-black"
          >
            {number.toString(17).toUpperCase()}
          </div>
        );
      })}
    </div>
  );
  // }
};
