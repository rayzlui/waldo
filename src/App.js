import React from 'react';
import { Provider } from 'react-redux';
import { configureStore } from './configureStore';
import './App.scss';
import { RootContainer } from './assets/root/RootContainer';

export default function App() {
  let store = configureStore();
  return (
    <Provider store={store}>
      <RootContainer />
    </Provider>
  );
}
