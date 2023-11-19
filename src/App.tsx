import { SudokuGrid } from './SudokuGrid';

import { SudokuContextProvider } from './SudokuContext';
import { Menu } from './Menu';
import { InfoBox } from './InfoBox';
import { Header } from './Header';
import { Actions } from './Actions';
import { useState } from 'react';
import { Modal } from './Modal';
import { Footer } from './Footer';
import { About } from './About';

export const App = () => {
  const [showInfo, setShowInfo] = useState(false);

  return (
    <div className="grid min-h-screen grid-rows-[auto,1fr,auto] flex-col items-center">
      <Header onInfoClick={() => setShowInfo(true)} />
      <SudokuContextProvider>
        <div className="grid grid-cols-[1fr,2fr,1fr] grid-rows-[auto,1fr] justify-center gap-8 justify-self-center px-4">
          <div className="row-span-2">
            <Menu />
          </div>
          <div className="row-span-2 flex items-center justify-center">
            <SudokuGrid />
          </div>
          <InfoBox />
          <Actions />
        </div>
      </SudokuContextProvider>
      <Footer />
      <Modal title="About" open={showInfo} onClose={() => setShowInfo(false)}>
        <About />
      </Modal>
    </div>
  );
};
