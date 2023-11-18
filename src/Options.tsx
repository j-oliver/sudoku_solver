import { FC } from 'react';

type Props = {
  createSudoku: () => void;
  solve: () => void;
  reset: () => void;
};

export const Options: FC<Props> = ({ createSudoku, solve, reset }) => {
  return (
    <div className="flex justify-around">
      <div
        className="m-5 my-auto w-[100px] cursor-pointer bg-teal-400 p-3 text-center"
        onClick={createSudoku}
      >
        New Sudoku!
      </div>
      <div
        className="m-5 my-auto w-[100px] cursor-pointer bg-teal-400 p-3 text-center"
        onClick={solve}
      >
        Solve!
      </div>
      <div
        className="m-5 my-auto w-[100px] cursor-pointer bg-teal-400 p-3 text-center"
        onClick={reset}
      >
        Reset
      </div>
    </div>
  );
};
