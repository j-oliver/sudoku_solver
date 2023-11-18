import { FC, useCallback, useContext, useState } from 'react';
import { SudokuContext } from './SudokuContext';
import { Difficulty, Size } from './types';
import { Button } from './Button';

export const Menu: FC = () => {
  const { createSudoku, start } = useContext(SudokuContext);

  const [nextSize, setNextSize] = useState<Size>(3);
  const [nextDifficulty, setNextDifficulty] = useState<Difficulty>('easy');

  const play = useCallback(() => {
    createSudoku(nextSize, nextDifficulty);
    start();
  }, [createSudoku, nextSize, nextDifficulty, start]);

  return (
    <div className="flex flex-col gap-8 justify-between shadow-lg p-4">
      <h1 className="w-full text-center p-4 text-2xl">New Sudoku</h1>
      <div className="flex flex-col">
        <h2 className="font-bold text-lg mb-4">Difficulty</h2>
        <div className="grid grid-cols-2 gap-4">
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
      <div className="flex flex-col">
        <h2 className="font-bold text-xl">Size</h2>
        <div className="w-full flex items-center justify-center gap-4">
          <Button
            onClick={() => setNextSize(2)}
            className={`${nextSize === 2 && 'bg-blue-600'}`}
          >
            4x4
          </Button>
          <Button
            onClick={() => setNextSize(3)}
            className={`${nextSize === 3 && 'bg-blue-600'}`}
          >
            9x9
          </Button>
          <Button
            onClick={() => setNextSize(4)}
            className={`${nextSize === 4 && 'bg-blue-600'}`}
          >
            16x16
          </Button>
        </div>
      </div>
      <Button onClick={play} className="w-full bg-white">
        Play
      </Button>
    </div>
  );
};
