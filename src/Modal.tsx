import { FC, ReactNode, useRef } from 'react';
import { useOnClickOutside } from './useOnOutsideClick';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

type Props = {
  title: string;
  children: ReactNode;
  open: boolean;
  onClose: () => void;
};

export const Modal: FC<Props> = ({ title, open, onClose, children }) => {
  const ref = useRef<HTMLDivElement>(null);

  useOnClickOutside(ref, () => onClose());
  return (
    <div
      className={`${
        open ? 'flex' : 'hidden'
      } fixed left-0 top-0 z-50 h-full w-full items-center justify-center bg-black bg-opacity-70`}
    >
      <div
        ref={ref}
        className="flex w-2/5 flex-col rounded-lg bg-white shadow-lg"
      >
        <div className="relative flex h-28 items-center justify-center rounded-t-lg bg-blue-100 text-2xl">
          <h1 className="text-2xl font-bold">{title}</h1>
          <button
            onClick={onClose}
            className="absolute right-0 top-0 m-4 h-10 w-10 hover:bg-blue-50"
          >
            <FontAwesomeIcon color="gray" icon="times" size="1x" />
          </button>
        </div>
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
};
