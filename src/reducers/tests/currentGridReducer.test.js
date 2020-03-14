import { currentGridReducer } from '../currentGridReducer';
import {
  CHANGE_GRID,
  FETCH_IMAGE_SUCCESS,
  RESET_GRID,
} from '../../actions/actionTypes';

describe('currentGridReducer', () => {
  describe('action CHANGE_GRID', () => {
    it('should return action gridID', () => {
      let mockAction = { type: CHANGE_GRID, gridId: 16 };
      let mockState = null;
      let wrapper = currentGridReducer(mockState, mockAction);
      expect(wrapper).toEqual(mockAction.gridId);
    });
  });
  describe('action RESET_GRID', () => {
    it('should return null', () => {
      let mockAction = { type: RESET_GRID };
      let mockState = 17;
      let wrapper = currentGridReducer(mockState, mockAction);
      expect(wrapper).toEqual(null);
    });
  });
  describe('action FETCH_IMAGE_SUCCESS', () => {
    it('should return state', () => {
      let mockAction = { type: FETCH_IMAGE_SUCCESS };
      let mockState = 19;
      let wrapper = currentGridReducer(mockState, mockAction);
      expect(wrapper).toEqual(mockState);
    });
  });
});
