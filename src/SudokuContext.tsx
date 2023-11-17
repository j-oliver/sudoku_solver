import { FC, ReactNode, createContext, useCallback, useState } from 'react';
import { Difficulty, Sudoku } from './types';
import { solveSudoku, createNewSudoku } from './core/sudoku';
import { useTimer } from './useTimer';

type SudokuContextProps = {
  sudoku?: Sudoku;
  initialSudoku?: Sudoku;
  time: string;
  size?: number;
  difficulty?: Difficulty;
  solve: () => void;
  createSudoku: (size: number, difficulty: Difficulty) => void;
  resetSudoku: () => void;
  setNumber: (number: number, rindex: number, cindex: number) => void;
  removeNumber: (rindex: number, cindex: number) => void;
  setDifficulty?: (difficulty: Difficulty) => void;
  setSize?: (size: number) => void;
};

export const SudokuContext = createContext<SudokuContextProps>({
  sudoku: [],
  initialSudoku: [],
  time: '',
  solve: () => {},
  createSudoku: () => {},
  resetSudoku: () => {},
  setNumber: () => {},
  removeNumber: () => {},
});

type Props = {
  children: ReactNode;
};

export const SudokuContextProvider: FC<Props> = ({ children }) => {
  const [difficulty, setDifficulty] = useState<Difficulty>('easy');
  const [size, setSize] = useState(9);
  const [initialSudoku, setInitialSudoku] = useState(
    createNewSudoku(size, difficulty)
  );
  const [sudoku, setSudoku] = useState<Sudoku>();
  const { time, startTimer, stop } = useTimer();

  const setNumber = useCallback(
    (number: number, rindex: number, cindex: number) => {
      const nextGrid = sudoku?.slice();

      nextGrid && (nextGrid[rindex][cindex] = number);

      setSudoku(nextGrid);
    },
    [sudoku]
  );

  const removeNumber = useCallback(
    (rindex: number, cindex: number) => {
      const nextGrid = sudoku?.slice();

      nextGrid && (nextGrid[rindex][cindex] = 0);

      setSudoku(nextGrid);
    },
    [sudoku]
  );

  const solve = useCallback(() => {
    if (!sudoku) return;

    setSudoku(solveSudoku(sudoku));
    stop();
  }, [sudoku, stop]);

  const createSudoku = (size: number, difficulty: Difficulty) => {
    const initialSudoku = createNewSudoku(size, difficulty);
    const sudoku = initialSudoku.map((row: number[]) => row.slice());

    setInitialSudoku(initialSudoku);
    setSudoku(sudoku);
    startTimer();
  };

  const resetSudoku = useCallback(() => {
    const resetSudoku = initialSudoku.map((row: number[]) => row.slice());

    setSudoku(resetSudoku);
  }, [initialSudoku]);

  return (
    <SudokuContext.Provider
      value={{
        sudoku,
        initialSudoku,
        time,
        size,
        difficulty,
        solve,
        createSudoku,
        resetSudoku,
        setNumber,
        removeNumber,
        setSize,
        setDifficulty,
      }}
    >
      {children}
    </SudokuContext.Provider>
  );
};
