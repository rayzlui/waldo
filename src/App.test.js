import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { mount } from 'enzyme';

/*

  Change state around and check what renders.
 */

it('renders without crashing', () => {
  let div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('renders state without any issues', async () => {
  let wrapper = mount(<App />);
  //await console.log(wrapper.instance())
  //await console.log(wrapper.debug())
  await wrapper.instance().retrieveData();
  await console.log(wrapper.state());
  let grid = wrapper.find('#grid-2');
  console.log(grid.debug());

  //need to run it as function not just a property.
  //Can't do wrapper.state, must be wrapper.state()
  //essentially we're doing this:
});

/*
  - to test processCLICK we can search a grid component by it's ID and simulate click and expect state.clicked === id)

  - test tagInput by looking for tag-pop-up box and simulate change
  - test submitTagForPhoto by looking for tag-pop-up box and simming enter being entered.

  - test tagPhotoStatus by looking for "change-tag-button" and simulate click
  - check when state.game === null for TAG, playgameButton

  - test playGame by looking for play-game-button and simming click
  - check when state.game !=== null for header, tag button
  

  - test checkTagForGame by looking for a options id and simming clcik.

  - check when state.photo !== null for gridDOM

  

*/
