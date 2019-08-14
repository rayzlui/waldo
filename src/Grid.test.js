import React from 'react';
import Grid from './Grid.js';
import { shallow } from 'enzyme';

//Test if props.game == true
//Test if props.popup !== null

describe('Grid', () => {
  /*
      - test when game !== null => border == purple
      - test when popupbox !== null => border == green
    

      - test when both null, click works
      - test when both null border is just 1px
      - test when popupbox !== null => click = null 
     */

  it('renders a div with purple border when highlight !== null', () => {
    let component = shallow(<Grid id={1} highlight={'true'} popupbox={null} />);
    var grid = component.find('#grid-1');
    expect(grid.props().style.border).toEqual('1px solid purple');

    //use .find
  });

  it('renders green border with popupbox !== null', () => {
    let wrapper = shallow(<Grid id={1} popupbox={'something'} />);
    var bar = wrapper.find('#grid-1');
    expect(bar.props().style.border).toEqual('1px solid green');
  });

  it('renders no colored border when popupbox === null && highlight === null', () => {
    let wrapper = shallow(<Grid id={1} highlight={null} popupbox={null} />);
    var bar = wrapper.find('#grid-1');
    expect(bar.props().style.border).toEqual(1);
  });

  it('onClick has a function when highlight + popupbox are null', () => {
    var mockFunction = jest.fn();
    let wrapper = shallow(
      <Grid
        id={1}
        highlight={null}
        popupbox={null}
        processClick={mockFunction}
      />,
    );
    wrapper.find('#grid-1').simulate('click');
    expect(mockFunction).toHaveBeenCalled();
  });

  it('onClick does not have a function when popupbox is not null', () => {
    var mockFunction = jest.fn();
    let wrapper = shallow(
      <Grid
        id={1}
        highlight={null}
        popupbox={'hello'}
        processClick={mockFunction}
      />,
    );
    wrapper.find('#grid-1').simulate('click');
    expect(mockFunction).not.toHaveBeenCalled();
  });

  it('onClick does not have a function when highlight + popupbox are not null', () => {
    var mockFunction = jest.fn();
    let wrapper = shallow(
      <Grid
        id={1}
        highlight={'null'}
        popupbox={'hello'}
        processClick={mockFunction}
      />,
    );
    wrapper.find('#grid-1').simulate('click');
    expect(mockFunction).not.toHaveBeenCalled();
  });

  it('onClick does have a function when highlight is not null + popupbox is null', () => {
    var mockFunction = jest.fn();
    let wrapper = shallow(
      <Grid
        id={1}
        highlight={'null'}
        popupbox={null}
        processClick={mockFunction}
      />,
    );
    wrapper.find('#grid-1').simulate('click');
    expect(mockFunction).toHaveBeenCalled();
  });
});
