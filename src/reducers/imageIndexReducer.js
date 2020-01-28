import { FETCH_IMAGE_SUCCESS } from '../actions/actionTypes';

const initialState = [
  'https://www.muraldecal.com/en/img/fomi030_1-jpg/folder/products-detalle-muestras-grandes/wall-murals-minions.jpg',
];

export function imageIndexReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_IMAGE_SUCCESS:
      return action.data;
    default:
      return state;
  }
}
