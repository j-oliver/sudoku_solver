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
    <div className="flex flex-col items-center w-full h-full bg-[#F5F5F5] shadow-lg p-8">
      <h1 className="w-full font-bold text-3xl text-center mb-4">Game Info</h1>
      <div className="w-full flex flex-col gap-4">
        <div className="w-full flex justify-between items-center">
          <div className="font-bold">Time</div>
          <div>{time}</div>
        </div>
        <div className="w-full flex justify-between items-center">
          <div className="font-bold">Difficulty</div>
          <div className={difficultyColors[difficulty]}>
            {capitalize(difficulty)}
          </div>
        </div>
        <div className="w-full flex justify-between items-center">
          <div className="font-bold">Size</div>
          <div className="text-blue-600">
            {size * size} x {size * size}
          </div>
        </div>
      </div>
    </div>
  );
};
