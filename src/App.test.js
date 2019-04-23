import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {shallow} from 'enzyme'
import { exportAllDeclaration } from '@babel/types';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('renders state without any issues', () => {
  const wrapper = shallow(<App/>)

  
  console.log(wrapper.state().clicked)
  //need to run it as function not just a property.
  //Can't do wrapper.state, must be wrapper.state()
  //essentially we're doing this:
  var e = {keycode: 13}
  wrapper.submitTagForPhoto(e)
  expect(wrapper.state().clicked).toEqual(null)
})
