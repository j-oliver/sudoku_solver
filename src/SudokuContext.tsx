import {
  FC,
  ReactNode,
  Reducer,
  createContext,
  useCallback,
  useReducer,
  useState,
} from 'react';
import { Difficulty, Size, Sudoku } from './types';
import { solveSudoku, createNewSudoku } from './core/sudoku';
import { useTimer } from './useTimer';
import {
  Action,
  State,
  arrayReducer,
  initialState,
} from './stateHistoryReducer';

type SudokuContextProps = {
  sudoku?: Sudoku;
  initialSudoku?: Sudoku;
  time: string;
  size: Size;
  difficulty: Difficulty;
  hasNext: boolean;
  hasPrev: boolean;
  start: () => void;
  solve: () => void;
  undo: () => void;
  redo: () => void;
  createSudoku: (size: Size, difficulty: Difficulty) => void;
  resetSudoku: () => void;
  setNumber: (number: number, rindex: number, cindex: number) => void;
  removeNumber: (rindex: number, cindex: number) => void;
  setDifficulty: (difficulty: Difficulty) => void;
  setSize: (size: Size) => void;
};

export const SudokuContext = createContext<SudokuContextProps>({
  sudoku: [],
  initialSudoku: [],
  time: '',
  size: 3,
  difficulty: 'easy',
  hasNext: false,
  hasPrev: false,
  start: () => {},
  solve: () => {},
  undo: () => {},
  redo: () => {},
  createSudoku: () => {},
  resetSudoku: () => {},
  setNumber: () => {},
  removeNumber: () => {},
  setDifficulty: () => {},
  setSize: () => {},
});

type Props = {
  children: ReactNode;
};

export const SudokuContextProvider: FC<Props> = ({ children }) => {
  const [difficulty, setDifficulty] = useState<Difficulty>('easy');
  const [size, setSize] = useState<Size>(3);
  const [initialSudoku, setInitialSudoku] = useState(() =>
    createNewSudoku(size, difficulty)
  );
  const [sudokuHistory, dispatch] = useReducer<Reducer<State, Action>>(
    arrayReducer,
    initialState
  );
  const { time, stop, reset, startTimer } = useTimer();

  const setNumber = (number: number, rindex: number, cindex: number) => {
    dispatch({ type: 'INSERT', num: number, r: rindex, c: cindex });
  };

  const removeNumber = (rindex: number, cindex: number) => {
    dispatch({ type: 'REMOVE', r: rindex, c: cindex });
  };

  const solve = useCallback(() => {
    if (!sudokuHistory.data) return;

    const solvedSudoku = solveSudoku(sudokuHistory.data);

    dispatch({ type: 'OVERWRITE', sudoku: solvedSudoku });
    stop();
  }, [sudokuHistory, stop]);

  const createSudoku = (size: Size, difficulty: Difficulty) => {
    const initialSudoku = createNewSudoku(size, difficulty);
    const sudoku = initialSudoku.map((row: number[]) => row.slice());

    setInitialSudoku(initialSudoku);
    setSize(size);
    setDifficulty(difficulty);
    dispatch({ type: 'RESET' });
    dispatch({ type: 'OVERWRITE', sudoku: sudoku });
  };

  const start = useCallback(() => {
    if (!sudokuHistory.data) return;

    reset();
    startTimer();
  }, [sudokuHistory, reset, startTimer]);

  const resetSudoku = useCallback(() => {
    const resetSudoku = initialSudoku.map((row: number[]) => row.slice());
    dispatch({ type: 'OVERWRITE', sudoku: resetSudoku });
  }, [initialSudoku]);

  const hasNext = sudokuHistory.currentIndex < sudokuHistory.history.length - 1;
  const hasPrev = sudokuHistory.currentIndex > 0;

  return (
    <SudokuContext.Provider
      value={{
        sudoku: sudokuHistory.data,
        initialSudoku,
        time,
        size,
        difficulty,
        hasNext,
        hasPrev,
        start,
        solve,
        undo: () => dispatch({ type: 'UNDO' }),
        redo: () => dispatch({ type: 'REDO' }),
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
