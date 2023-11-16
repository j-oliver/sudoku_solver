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
        className="bg-teal-400 w-[100px] p-3 m-5 my-auto cursor-pointer text-center"
        onClick={createSudoku}
      >
        New Sudoku!
      </div>
      <div
        className="bg-teal-400 w-[100px] p-3 m-5 my-auto cursor-pointer text-center"
        onClick={solve}
      >
        Solve!
      </div>
      <div
        className="bg-teal-400 w-[100px] p-3 m-5 my-auto cursor-pointer text-center"
        onClick={reset}
      >
        Reset
      </div>
    </div>
  );
};
