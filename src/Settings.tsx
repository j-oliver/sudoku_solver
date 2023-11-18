import { FC } from 'react';
import { Difficulty } from './types';

type Props = {
  difficulty: Difficulty;
  setDifficulty: (difficulty: Difficulty) => void;
};

function capitalize(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

const allDifficulties: Difficulty[] = ['easy', 'medium', 'hard', 'extreme'];

export const Settings: FC<Props> = ({ difficulty, setDifficulty }) => {
  return (
    <div className="flex w-[225px] flex-wrap justify-around">
      {allDifficulties.map(d => {
        const selected = difficulty === d ? 'bg-green-500' : '';
        return (
          <div
            key={d}
            className={`m-1 w-[80px] cursor-pointer border-2 border-solid border-black p-1 text-center ${selected}`}
            onClick={() => setDifficulty(d)}
          >
            {capitalize(d)}
          </div>
        );
      })}
    </div>
  );
};
