import { FC, useContext, useState } from 'react';

import { Square } from './Square';
import { NumberPicker } from './NumberPicker';
import { getValidNumbersForCell } from './core/sudoku';
import { SudokuContext } from './SudokuContext';
import { Size } from './types';

const gridSizes: Record<Size, string> = {
  2: 'w-[300px] h-[300px] grid-rows-[repeat(4,1fr)] grid-cols-[repeat(4,1fr)]',
  3: 'w-[500px] h-[500px] grid-rows-[repeat(9,1fr)] grid-cols-[repeat(9,1fr)]',
  4: 'w-[700px] h-[700px] grid-rows-[repeat(16,1fr)] grid-cols-[repeat(16,1fr)]',
};
const overlaySizes: Record<Size, string> = {
  2: 'grid-cols-2',
  3: 'grid-cols-3',
  4: 'grid-cols-4',
};

export const SudokuGrid: FC = () => {
  const { sudoku, initialSudoku, size, setNumber } = useContext(SudokuContext);
  const [{ rindex, cindex }, setNumberpicker] = useState({
    rindex: -1,
    cindex: -1,
  });

  const pickNumber = (number: number, rindex: number, cindex: number) => {
    setNumber(number, rindex, cindex);
    setNumberpicker({ rindex: -1, cindex: -1 });
  };

  function resetNumberPicker() {
    setNumberpicker({ rindex: -1, cindex: -1 });
  }

  function cellIsBlocked(rindex: number, cindex: number) {
    return initialSudoku?.[rindex][cindex] !== 0;
  }

  return (
    <div className="flex h-[700px] w-[700px] flex-col items-center justify-center gap-4 bg-slate-50">
      <div className={`grid ${gridSizes[size]} relative border-2 border-black`}>
        <div
          className={`left-0 top-0 grid ${overlaySizes[size]} pointer-events-none absolute h-full w-full`}
        >
          {new Array(size * size).fill(0).map((_, index) => {
            return (
              <div
                key={index}
                className="border-2 border-black text-center text-xl"
              />
            );
          })}
        </div>
        {sudoku?.map((row, r) =>
          row.map((cell, c) => (
            <Square
              squarekey={r + c}
              value={cell}
              initial={cellIsBlocked(r, c)}
              selected={r === rindex && c === cindex}
              removeNumber={() => setNumber(0, r, c)}
              selectSquare={() => setNumberpicker({ rindex: r, cindex: c })}
            />
          )),
        )}
      </div>
      <div className="flex h-12 w-full justify-center p-2">
        {sudoku && rindex !== -1 && cindex !== -1 && (
          <NumberPicker
            availableNumbers={getValidNumbersForCell(rindex, cindex, sudoku)}
            enterNumber={number => pickNumber(number, rindex, cindex)}
            resetNumberPicker={resetNumberPicker}
          />
        )}
      </div>
    </div>
  );
};
