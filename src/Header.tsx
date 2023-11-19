import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import logo from './assets/olibyte_logo.svg';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import { FC } from 'react';

type Props = {
  onInfoClick: () => void;
};

export const Header: FC<Props> = ({ onInfoClick }) => {
  return (
    <div className="flex w-full items-center justify-between p-8">
      <a href="https://janrollmann.de">
        <div className="flex h-16 w-16 items-center justify-center bg-orange-500">
          <img src={logo} alt="logo" className="p-4" />
        </div>
      </a>
      <h1 className="text-4xl"> Simple Sudoku Solver </h1>
      <div
        className="flex h-14 w-14 cursor-pointer items-center justify-center rounded-full hover:bg-[#f5f5f5]"
        onClick={onInfoClick}
      >
        <FontAwesomeIcon icon={faQuestionCircle} size="2x" />
      </div>
    </div>
  );
};
