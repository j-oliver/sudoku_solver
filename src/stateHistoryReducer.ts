import { Sudoku } from './types';

export type Action =
  | { type: 'OVERWRITE'; sudoku: Sudoku }
  | { type: 'INSERT'; num: number; r: number; c: number }
  | { type: 'REMOVE'; r: number; c: number }
  | { type: 'RESET' }
  | { type: 'UNDO' }
  | { type: 'REDO' };

export interface State {
  data: Sudoku;
  history: Sudoku[];
  currentIndex: number;
}

export const arrayReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'OVERWRITE': {
      const nextHistory = [action.sudoku.map(row => [...row])];
      return { data: action.sudoku, history: nextHistory, currentIndex: 0 };
    }
    case 'RESET': {
      return { ...state, data: [[]], currentIndex: 0 };
    }
    case 'INSERT': {
      const { r, c, num } = action;
      const newArray = state.data.map(row => [...row]);
      newArray[r][c] = num;
      const nextHistory = state.history.slice(0, state.currentIndex + 1);
      return {
        data: newArray,
        history: [...nextHistory, newArray],
        currentIndex: state.currentIndex + 1,
      };
    }
    case 'REMOVE': {
      const { r, c } = action;
      const updatedArray = state.data.map(row => [...row]);
      updatedArray[r][c] = 0;
      const nextHistory = state.history.slice(0, state.currentIndex + 1);
      return {
        data: updatedArray,
        history: [...nextHistory, updatedArray],
        currentIndex: state.currentIndex + 1,
      };
    }
    case 'UNDO': {
      if (state.currentIndex > 0) {
        const undoIndex = state.currentIndex - 1;
        const undoArray = state.history[undoIndex];
        return {
          ...state,
          data: undoArray,
          currentIndex: undoIndex,
        };
      }
      return state;
    }
    case 'REDO': {
      if (state.currentIndex < state.history.length - 1) {
        const redoIndex = state.currentIndex + 1;
        const redoArray = state.history[redoIndex];
        return {
          ...state,
          data: redoArray,
          currentIndex: redoIndex,
        };
      }
      return state;
    }
    default:
      return state;
  }
};

export const initialState: State = {
  data: [[]],
  history: [[]],
  currentIndex: 0,
};
