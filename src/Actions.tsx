import { useContext } from 'react';
import { SudokuContext } from './SudokuContext';
import { Button } from './Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRotateLeft, faRotateRight } from '@fortawesome/free-solid-svg-icons';

export const Actions = () => {
  const { resetSudoku, solve, undo, redo, hasNext, hasPrev } =
    useContext(SudokuContext);
  return (
    <div className="flex flex-col justify-between items-center gap-4">
      <div className="flex-1 flex justify-center items-center w-full gap-8">
        <Button
          onClick={undo}
          disabled={!hasPrev}
          className={`p-4 w-20 h-20 border-none rounded-none ${
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
          className={`p-4 w-20 h-20 border-none rounded-none ${
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
      <Button onClick={resetSudoku} className="bg-gray-300 w-full p-8">
        Reset
      </Button>
      <Button onClick={solve} className="bg-orange-500 w-full p-8">
        Solve
      </Button>
    </div>
  );
};
