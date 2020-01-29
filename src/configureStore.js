import logger from 'redux-logger';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import { rootReducer } from './reducers/rootReducer';

export function configureStore() {
  let middleWares = [thunk];
  if (process.env.NODE_ENV === 'development') {
    middleWares.push(logger);
  }
  return createStore(rootReducer, applyMiddleware(...middleWares));
}
