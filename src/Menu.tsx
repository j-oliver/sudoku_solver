import { FC } from 'react';

export const Menu: FC = () => {
  return (
    <div className="flex flex-col gap-8 justify-between">
      <h1 className="w-full text-center p-4 text-2xl">New Sudoku</h1>
      <div className="flex flex-col">
        <h2 className="font-bold text-xl">Difficulty</h2>
        <div className="grid grid-cols-2">
          <button className="bg-difficulty-easy">Easy</button>
          <button className="bg-difficulty-medium">Medium</button>
          <button className="bg-difficulty-hard">Hard</button>
          <button className="bg-difficulty-extreme">Extreme</button>
        </div>
      </div>
      <div className="flex flex-col">
        <h2 className="font-bold text-xl">Size</h2>
        <div className="w-full flex items-center justify-center">
          <button>4x4</button>
          <button>9x9</button>
          <button>16x16</button>
        </div>
      </div>
      <button>Play</button>
    </div>
  );
};
