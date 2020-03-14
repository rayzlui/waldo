import {
  RESET_SCORE,
  UPDATE_SCORE,
  RESET_GRID,
} from '../../actions/actionTypes';
import { gameScoreReducer } from '../gameScoreReducer';

describe('gameScoreReducer', () => {
  describe('RESET_SCORE action', () => {
    it('should return 0', () => {
      let mockAction = { type: RESET_SCORE };
      let mockState = 19;
      let wrapper = gameScoreReducer(mockState, mockAction);
      expect(wrapper).toEqual(0);
    });
  });
  describe('UPDATE_SCORE action', () => {
    it('should return state + 1', () => {
      let mockAction = { type: UPDATE_SCORE };
      let mockState = 12;
      let wrapper = gameScoreReducer(mockState, mockAction);
      expect(wrapper).toEqual(mockState + 1);
    });
  });
  describe('RESET_GRID action', () => {
    it('should return state', () => {
      let mockAction = { type: RESET_GRID };
      let mockState = 13;
      let wrapper = gameScoreReducer(mockState, mockAction);
      expect(wrapper).toEqual(mockState);
    });
  });
});
