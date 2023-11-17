import { FC, useContext } from 'react';
import { SudokuContext } from './SudokuContext';

export const InfoBox: FC = () => {
  const { time, size, difficulty } = useContext(SudokuContext);
  return (
    <div className="flex flex-col items-center w-full h-full bg-[#F5F5F5] shadow-lg p-8">
      <h1 className="w-full font-bold text-3xl text-center mb-4">Game Info</h1>
      <div className="w-full">
        <div className="w-full flex justify-between items-center">
          <div className="font-bold">Time</div>
          <div>{time}</div>
        </div>
        <div className="w-full flex justify-between items-center">
          <div className="font-bold">Difficulty</div>
          <div>{difficulty}</div>
        </div>
        <div className="w-full flex justify-between items-center">
          <div className="font-bold">Size</div>
          <div>{size}</div>
        </div>
      </div>
    </div>
  );
};
