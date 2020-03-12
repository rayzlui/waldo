import { savingImageStart, resetGrid, toggleMode } from './actions';
import { SAVING_IMAGE_START, RESET_GRID, TOGGLE_MODE } from './actionTypes';

function basicActionTestHelper(action, actionType) {
  return describe(`${action.name}`, () => {
    it(`should return { type: ${actionType} }`, () => {
      expect(action()).toEqual({ type: actionType });
    });
  });
}

basicActionTestHelper(savingImageStart, SAVING_IMAGE_START);
basicActionTestHelper(resetGrid, RESET_GRID);
basicActionTestHelper(toggleMode, TOGGLE_MODE);