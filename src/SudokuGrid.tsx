import { FC, useCallback, useContext, useState } from 'react';

import { Square } from './Square';
import { NumberPicker } from './NumberPicker';
import { getValidNumbersForCell } from './core/sudoku';
import { SudokuContext } from './SudokuContext';

export const SudokuGrid: FC = () => {
  const [npExists, setNpExists] = useState(false);
  const [numberpicker, setNumberpicker] = useState({ rindex: -1, cindex: -1 });

  const { sudoku, initialSudoku, setNumber } = useContext(SudokuContext);

  const pickNumber = useCallback(
    (number: number, rindex: number, cindex: number) => {
      setNumber(number, rindex, cindex);
      setNpExists(false);
      setNumberpicker({ rindex: -1, cindex: -1 });
    },
    [setNumber]
  );

  function resetNumberPicker() {
    // really hacky
    setNpExists(false);
    setNumberpicker({ rindex: -1, cindex: -1 });
  }

  function showNumberPicker(rindex: number, cindex: number) {
    console.log('showNumberPicker called');
    if (!npExists) {
      console.log('npExists in showNumberPicker is false');
      setNpExists(true);
      setNumberpicker({ rindex, cindex });
    }
  }

  function cellIsBlocked(rindex: number, cindex: number) {
    return initialSudoku?.[rindex][cindex] !== 0;
  }

  function getGrid() {
    return sudoku?.map((row, rindex) => {
      return row.map((cell, cindex) => {
        const key = `${rindex}${cindex}`;
        const availableNumbers = getValidNumbersForCell(rindex, cindex, sudoku);

        const hasNumberPicker =
          numberpicker.rindex === rindex && numberpicker.cindex === cindex;
        const np = hasNumberPicker ? (
          <NumberPicker
            availableNumbers={availableNumbers}
            enterNumber={number => pickNumber(number, rindex, cindex)}
            resetNumberPicker={resetNumberPicker}
          />
        ) : undefined;

        if (cellIsBlocked(rindex, cindex)) {
          return <Square initial squarekey={key} value={cell} />;
        } else {
          return (
            <Square
              squarekey={key}
              value={cell}
              numberpicker={np}
              removeNumber={() => setNumber(0, rindex, cindex)}
              showNumberPicker={() => showNumberPicker(rindex, cindex)}
            />
          );
        }
      });
    });
  }

  return (
    <div className="grid grid-cols-[repeat(9,1fr)] grid-rows-[repeat(9,1fr)] w-[500px] h-[500px] border-2 border-black relative">
      <div className="top-0 left-0 grid grid-cols-3 w-full h-full absolute pointer-events-none">
        {new Array(9).fill(0).map((_, index) => {
          return (
            <div
              key={index}
              className="border-2 border-black text-center text-xl"
            />
          );
        })}
      </div>
      {getGrid()}
    </div>
  );
};
