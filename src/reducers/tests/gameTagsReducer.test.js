import {
  FETCH_TAG_SUCCESS,
  FETCH_IMAGE_SUCCESS,
} from '../../actions/actionTypes';
import { gameTagsReducer } from '../gameTagsReducer';

describe('gameTagsReducer', () => {
  describe('FETCH_TAG_SUCCESS action', () => {
    it('should return object', () => {
      let mockData = [
        { _id: 13, name: 'pete' },
        { _id: 14, name: 'jorge' },
        { _id: 15, name: 'larry' },
      ];
      let mockAction = { type: FETCH_TAG_SUCCESS, tags: mockData };
      let mockState = { 11: 'norma' };
      let wrapper = gameTagsReducer(mockState, mockAction);
      expect(Object.keys(wrapper)).toEqual(mockData.map(x => x._id.toString()));
      mockData.forEach(x => {
        expect(wrapper[x._id]).toEqual(x);
      });
    });
  });
  describe('FETCH_IMAGE_SUCCESS', () => {
    it('should return state', () => {
      let mockAction = { type: FETCH_IMAGE_SUCCESS };
      let mockState = { 11: 'norma', 12: 'nick', 12: 'paul' };
      let wrapper = gameTagsReducer(mockState, mockAction);
      expect(wrapper).toEqual(mockState);
    });
  });
});
