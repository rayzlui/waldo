import { TOGGLE_MODE, FETCH_IMAGE_SUCCESS } from '../../actions/actionTypes';
import { isTagModeReducer } from '../isTagModeReducer';

describe('isTagModeReducer', () => {
  describe('TOGGLE_MODE action', () => {
    it('should return opposite state', () => {
      let mockAction = { type: TOGGLE_MODE };
      let mockState = true;
      let wrapper = isTagModeReducer(mockState, mockAction);
      expect(wrapper).toEqual(!mockState);
    });
  });
  describe('FETCH_IMAGE_SUCCESS', () => {
    it('should return state', () => {
      let mockAction = { type: FETCH_IMAGE_SUCCESS };
      let mockState = true;
      let wrapper = isTagModeReducer(mockState, mockAction);
      expect(wrapper).toEqual(mockState);
    });
  });
});
