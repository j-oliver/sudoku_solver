import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const About = () => {
  return (
    <div className="flex flex-col gap-4">
      <p>This is a little app to quickly create and solve sudoku puzzles.</p>
      <h1 className="text-lg font-bold">Creating</h1>
      <p>
        You can create a new puzzle by selecting a size and difficulty in the
        menu and then clicking "Play".
      </p>
      <p>
        The difficulties are just controlling how many squares will be
        predefined.
      </p>
      <h1 className="text-lg font-bold">Solving</h1>
      <p>
        You can click on an empty square which will open the number picker. It
        will only show you possible numbers in the current sudoku puzzle for
        this square.
      </p>
      <p>If you want to remove a number you can right click on a square.</p>
      <p>
        <FontAwesomeIcon icon="warning" color="orange" /> Note that for some
        sudokus, there can be multiple solutions
      </p>
      <p>
        <FontAwesomeIcon icon="warning" color="orange" /> Sudokus that are 16x16
        can take a bit of time to be solved. For some of them, it can take up to
        a few minutes.
      </p>
    </div>
  );
};
