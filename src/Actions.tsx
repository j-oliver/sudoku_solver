import { useContext } from 'react';
import { SudokuContext } from './SudokuContext';
import { Button } from './Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRotateLeft, faRotateRight } from '@fortawesome/free-solid-svg-icons';

export const Actions = () => {
  const { resetSudoku, solve, undo, redo, hasNext, hasPrev } =
    useContext(SudokuContext);
  return (
    <div className="flex flex-col items-center justify-between gap-4">
      <div className="flex w-full flex-1 items-center justify-center gap-8">
        <Button
          onClick={undo}
          disabled={!hasPrev}
          className={`h-20 w-20 rounded-none border-none p-4 ${
            hasPrev && 'hover:bg-slate-100'
          } shadow-none`}
        >
          {hasPrev ? (
            <FontAwesomeIcon icon={faRotateLeft} size="2xl" />
          ) : (
            <FontAwesomeIcon icon={faRotateLeft} color="gray" size="2xl" />
          )}
        </Button>
        <Button
          onClick={redo}
          disabled={!hasNext}
          className={`h-20 w-20 rounded-none border-none p-4 ${
            hasNext && 'hover:bg-slate-100'
          } shadow-none`}
        >
          {hasNext ? (
            <FontAwesomeIcon icon={faRotateRight} size="2xl" />
          ) : (
            <FontAwesomeIcon icon={faRotateRight} color="gray" size="2xl" />
          )}
        </Button>
      </div>
      <Button onClick={resetSudoku} className="w-full bg-gray-300 p-8">
        Reset
      </Button>
      <Button onClick={solve} className="w-full bg-orange-500 p-8">
        Solve
      </Button>
    </div>
  );
};
