import { SudokuGrid } from './SudokuGrid';

import { SudokuContextProvider } from './SudokuContext';
import { Menu } from './Menu';
import { InfoBox } from './InfoBox';

export const App = () => {
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-3xl">Simple Sudoku</h1>
      <SudokuContextProvider>
        <div className="grid gap-8 grid-cols-[1fr,2fr,1fr] grid-rows-[50px,1fr,1fr]">
          <div />
          <div className="flex flex-col items-center">
            <button>Undo</button>
            <button>Redo</button>
          </div>
          <div />
          <div className="row-span-2">
            <Menu />
          </div>
          <div className="row-span-2">
            <SudokuGrid />
          </div>
          <InfoBox />
          <div className="flex flex-col items-center">
            <button>Reset</button>
            <button>Solve</button>
          </div>
        </div>
      </SudokuContextProvider>
    </div>
  );
};
