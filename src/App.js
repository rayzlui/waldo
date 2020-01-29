import React from 'react';
import { Provider } from 'react-redux';
import { configureStore } from './configureStore';
import { RootView } from './views/RootView';
import './App.scss';

export default function App() {
  let store = configureStore();
  return (
    <Provider store={store}>
      <RootView />
    </Provider>
  );
}
