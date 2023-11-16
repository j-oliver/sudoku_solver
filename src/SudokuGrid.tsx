import { FC, useCallback, useState } from 'react';

import { Square } from './Square';
import { NumberPicker } from './NumberPicker';
import { getValidNumbersForCell } from './core/sudoku';
import { Sudoku } from './types';

type Props = {
  initialgrid: Sudoku;
  grid: Sudoku;
  setNumber: (number: number, rindex: number, cindex: number) => void;
};

export const SudokuGrid: FC<Props> = ({ initialgrid, grid, setNumber }) => {
  const [npExists, setNpExists] = useState(false);
  const [numberpicker, setNumberpicker] = useState({ rindex: -1, cindex: -1 });

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
    return initialgrid[rindex][cindex] !== 0;
  }

  function getGrid() {
    return grid.map((row, rindex) => {
      return row.map((cell, cindex) => {
        const key = `${rindex}${cindex}`;
        const availableNumbers = getValidNumbersForCell(rindex, cindex, grid);

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
          return <Square css="initial" squarekey={key} value={cell} />;
        } else {
          return (
            <Square
              squarekey={key}
              value={cell}
              css={''}
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
    <div className="grid grid-cols-9 w-[450px] h-[450px] border-2">
      {getGrid()}
    </div>
  );
};
