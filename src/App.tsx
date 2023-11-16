import { SudokuGrid } from './SudokuGrid';
import { Options } from './Options';
import { Settings } from './Settings';

import { useCallback, useState } from 'react';
import { createNewSudoku, solveSudoku } from './core/sudoku';
import { Difficulty } from './types';

export const App = () => {
  const [difficulty, setDifficulty] = useState<Difficulty>('easy');
  const [initialgrid, setInitialGrid] = useState(createNewSudoku('easy'));
  const [grid, setGrid] = useState(
    initialgrid.map((row: number[]) => row.slice())
  );

  const setNumber = useCallback(
    (number: number, rindex: number, cindex: number) => {
      const nextGrid = grid.slice();

      nextGrid[rindex][cindex] = number;

      setGrid(nextGrid);
    },
    [grid]
  );

  const solve = useCallback(() => {
    setGrid(solveSudoku(grid));
  }, [grid]);

  const createSudoku = useCallback(() => {
    const initialgrid = createNewSudoku(difficulty);
    const grid = initialgrid.map((row: number[]) => row.slice());

    setInitialGrid(initialgrid);
    setGrid(grid);
  }, [difficulty]);

  const resetSudoku = useCallback(() => {
    const resetSudoku = initialgrid.map((row: number[]) => row.slice());

    setGrid(resetSudoku);
  }, [initialgrid]);

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-3xl">Simple Sudoku</h1>
      <div className="w-[450px]">
        <SudokuGrid
          initialgrid={initialgrid}
          grid={grid}
          setNumber={setNumber}
        />
        <Options
          solve={solve}
          createSudoku={createSudoku}
          reset={resetSudoku}
        />
        <Settings difficulty={difficulty} setDifficulty={setDifficulty} />
      </div>
    </div>
  );
};
