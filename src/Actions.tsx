import { useContext } from 'react';
import { SudokuContext } from './SudokuContext';
import { Button } from './Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRotateLeft, faRotateRight } from '@fortawesome/free-solid-svg-icons';

export const Actions = () => {
  const {
    resetSudoku,
    solve,
    undo,
    redo,
    abort,
    hasNext,
    hasPrev,
    error,
    isSolving,
    sudoku,
  } = useContext(SudokuContext);

  const disabled = isSolving || !sudoku || sudoku.length === 1;
  const solveButtonClass = disabled
    ? 'bg-orange-300 hover:brightness-100'
    : 'bg-orange-500';

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex w-full items-center justify-center gap-8">
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
      <Button
        onClick={solve}
        className={`flex w-full items-center justify-center gap-4 p-8 font-bold ${solveButtonClass}`}
        disabled={disabled}
      >
        {isSolving ? (
          <div className="flex items-center gap-4">
            <div>
              <FontAwesomeIcon icon="gear" size="2x" className="animate-spin" />
            </div>
            <div>Solving...</div>
            <Button
              onClick={event => {
                event.stopPropagation();
                abort();
              }}
              className="z-10 bg-red-950 text-white hover:bg-red-800"
            >
              Cancel
            </Button>
          </div>
        ) : (
          'Solve'
        )}
      </Button>
      {error && (
        <div className="flex w-full items-center justify-center text-red-500">
          {error}
        </div>
      )}
    </div>
  );
};
