import { FC, useContext } from 'react';
import { SudokuContext } from './SudokuContext';
import { Difficulty } from './types';

function capitalize(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

export const InfoBox: FC = () => {
  const { time, size, difficulty } = useContext(SudokuContext);

  const difficultyColors: Record<Difficulty, string> = {
    easy: 'text-difficulty-easy',
    medium: 'text-difficulty-medium',
    hard: 'text-difficulty-hard',
    extreme: 'text-difficulty-extreme',
  };
  return (
    <div className="flex h-full w-full flex-col items-center bg-[#F5F5F5] p-8 shadow-lg">
      <h1 className="mb-4 w-full text-center text-3xl font-bold">Game Info</h1>
      <div className="flex w-full flex-col gap-4">
        <div className="flex w-full items-center justify-between">
          <div className="font-bold">Time</div>
          <div>{time}</div>
        </div>
        <div className="flex w-full items-center justify-between">
          <div className="font-bold">Difficulty</div>
          <div className={difficultyColors[difficulty]}>
            {capitalize(difficulty)}
          </div>
        </div>
        <div className="flex w-full items-center justify-between">
          <div className="font-bold">Size</div>
          <div className="text-blue-600">
            {size * size} x {size * size}
          </div>
        </div>
      </div>
    </div>
  );
};
