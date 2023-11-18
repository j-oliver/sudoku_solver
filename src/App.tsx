import { SudokuGrid } from './SudokuGrid';

import { SudokuContextProvider } from './SudokuContext';
import { Menu } from './Menu';
import { InfoBox } from './InfoBox';
import { Header } from './Header';
import { Actions } from './Actions';

export const App = () => {
  return (
    <div className="flex flex-col items-center p-4">
      <Header />
      <SudokuContextProvider>
        <div className="grid gap-8 grid-cols-[1fr,2fr,1fr] grid-rows-[1fr,1fr]">
          <div className="row-span-2">
            <Menu />
          </div>
          <div className="row-span-2">
            <SudokuGrid />
          </div>
          <InfoBox />
          <Actions />
        </div>
      </SudokuContextProvider>
    </div>
  );
};
