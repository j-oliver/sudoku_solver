import {
  FC,
  ReactNode,
  Reducer,
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from 'react';
import { Difficulty, Size, Sudoku } from './types';
import { createNewSudoku } from './core/sudoku';
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
  error: string;
  isSolving: boolean;
  abort: () => void;
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
  error: '',
  isSolving: false,
  abort: () => {},
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
  const [initialSudoku, setInitialSudoku] = useState<Sudoku>();
  const [sudokuHistory, dispatch] = useReducer<Reducer<State, Action>>(
    arrayReducer,
    initialState,
  );
  const [isSolving, setIsSolving] = useState(false);
  const [error, setError] = useState('');
  const { time, stop, reset, startTimer } = useTimer();

  const worker: Worker = useMemo(
    () => new Worker(new URL('./core/solve.ts', import.meta.url)),
    [],
  );

  useEffect(() => {
    if (window.Worker) {
      worker.onmessage = (e: MessageEvent<string>) => {
        const response = e.data as unknown as {
          error: string;
          solvedSudoku: Sudoku;
        };
        console.log(e.data);
        if (response.error) {
          setError(response.error);
        } else {
          dispatch({ type: 'OVERWRITE', sudoku: response.solvedSudoku });
          setError('');
          stop();
        }
        setIsSolving(false);
      };
    }
  }, [worker, stop]);

  const abort = useCallback(() => {
    worker.terminate();
    setIsSolving(false);
  }, [worker, setIsSolving]);

  const solve = useCallback(() => {
    if (isSolving) return;
    if (!sudokuHistory.data) return;
    setIsSolving(true);
    worker.postMessage({ sudoku: sudokuHistory.data });
  }, [sudokuHistory, worker, isSolving]);

  const setNumber = (number: number, rindex: number, cindex: number) => {
    dispatch({ type: 'INSERT', num: number, r: rindex, c: cindex });
  };

  const removeNumber = (rindex: number, cindex: number) => {
    dispatch({ type: 'REMOVE', r: rindex, c: cindex });
  };

  // const solve = useCallback(() => {
  //   if (!sudokuHistory.data) return;

  //   setIsSolving(true);
  //   solveSudoku(sudokuHistory.data)
  //     })
  //     .catch(setError)
  //     .finally(() => setIsSolving(false));
  // }, [sudokuHistory, stop]);

  const createSudoku = async (size: Size, difficulty: Difficulty) => {
    const initialSudoku = await createNewSudoku(size, difficulty);
    const sudoku = initialSudoku.map((row: number[]) => row.slice());

    setInitialSudoku(initialSudoku);
    setSize(size);
    setDifficulty(difficulty);
    dispatch({ type: 'RESET' });
    dispatch({ type: 'OVERWRITE', sudoku: sudoku });
    setError('');
  };

  const start = useCallback(() => {
    if (!sudokuHistory.data) return;

    reset();
    startTimer();
  }, [sudokuHistory, reset, startTimer]);

  const resetSudoku = useCallback(() => {
    const resetSudoku = initialSudoku?.map((row: number[]) => row.slice());
    if (resetSudoku) {
      dispatch({ type: 'OVERWRITE', sudoku: resetSudoku });
      startTimer();
      setError('');
    }
  }, [initialSudoku, startTimer]);

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
        error,
        isSolving,
        abort,
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
