import { FC, useCallback, useContext, useState } from 'react';
import { SudokuContext } from './SudokuContext';
import { Difficulty, Size } from './types';
import { Button } from './Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const Menu: FC = () => {
  const { createSudoku, start, sudoku } = useContext(SudokuContext);

  const [nextSize, setNextSize] = useState<Size>(3);
  const [nextDifficulty, setNextDifficulty] = useState<Difficulty>('easy');
  const [askForConfirm, setAskForConfirm] = useState(false);

  const play = useCallback(() => {
    createSudoku(nextSize, nextDifficulty);
    setAskForConfirm(false);
    start();
  }, [createSudoku, nextSize, nextDifficulty, start]);

  const confirm = useCallback(() => {
    console.log(sudoku);
    sudoku && sudoku.length === 1 ? play() : setAskForConfirm(true);
  }, [play, sudoku]);

  return (
    <div className="flex w-full flex-col gap-4 bg-[#f5f5f5] shadow-lg">
      <h1 className="w-full p-4 text-center text-2xl font-bold">New Sudoku</h1>
      <div className="flex flex-col p-4">
        <div className="flex w-full items-center justify-between text-sm">
          <h2 className="text-xl">Size</h2>
          <div className="flex gap-4">
            <Button
              onClick={() => setNextSize(2)}
              className={`${
                nextSize === 2 && 'bg-blue-600 text-white'
              } border-blue-600 text-blue-600`}
            >
              4x4
            </Button>
            <Button
              onClick={() => setNextSize(3)}
              className={`${
                nextSize === 3 && 'bg-blue-600 text-white'
              } border-blue-600 text-blue-600`}
            >
              9x9
            </Button>
            <Button
              onClick={() => setNextSize(4)}
              className={`${
                nextSize === 4 && 'bg-blue-600 text-white'
              } border-blue-600 text-blue-600`}
            >
              16x16
            </Button>
          </div>
        </div>
      </div>
      <div className="flex flex-col p-4">
        <h2 className="mb-4 text-lg">Difficulty</h2>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <Button
            onClick={() => setNextDifficulty('easy')}
            className={`${
              nextDifficulty === 'easy' && 'bg-difficulty-easy text-white'
            } border-difficulty-easy text-difficulty-easy`}
          >
            Easy
          </Button>
          <Button
            onClick={() => setNextDifficulty('medium')}
            className={`${
              nextDifficulty === 'medium' && 'bg-difficulty-medium text-white'
            } border-difficulty-medium text-difficulty-medium`}
          >
            Medium
          </Button>
          <Button
            onClick={() => setNextDifficulty('hard')}
            className={`${
              nextDifficulty === 'hard' && 'bg-difficulty-hard text-white'
            } border-difficulty-hard text-difficulty-hard`}
          >
            Hard
          </Button>
          <Button
            onClick={() => setNextDifficulty('extreme')}
            className={`${
              nextDifficulty === 'extreme' && 'bg-difficulty-extreme text-white'
            } border-difficulty-extreme text-difficulty-extreme`}
          >
            Extreme
          </Button>
        </div>
      </div>
      {askForConfirm ? (
        <div className="flex items-center justify-between gap-4 p-4 ">
          <div>Replace current game ?</div>
          <div className="flex gap-2">
            <Button onClick={play} className="bg-orange-500">
              Yes
            </Button>
            <Button
              onClick={() => setAskForConfirm(false)}
              className="bg-white"
            >
              No
            </Button>
          </div>
        </div>
      ) : (
        <div className="p-4">
          <Button onClick={confirm} className="w-full bg-white">
            <FontAwesomeIcon icon="table-cells" className="mr-2" />
            Play
          </Button>
        </div>
      )}
    </div>
  );
};
