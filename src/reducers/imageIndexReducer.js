import { FETCH_IMAGE_SUCCESS } from '../actions/actionTypes';

const initialState = [
  {
    tags: [
      ['5e2b8a7f053daa085dfd6904', '17'],
      ['5cb6c63f4a885951900ae0fd', '19'],
      ['5e2b8a7f053daa085dfd6905', '22'],
      ['5e2b8a7f053daa085dfd6906', '34'],
    ],
    _id: '5cb6c6094f41f3516e2fc4f4',
    key: 2,
    photo:
      'https://www.muraldecal.com/en/img/fomi030_1-jpg/folder/products-detalle-muestras-grandes/wall-murals-minions.jpg',
    __v: 2,
  },
];

export function imageIndexReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_IMAGE_SUCCESS:
      return action.data;
    default:
      return state;
  }
}
