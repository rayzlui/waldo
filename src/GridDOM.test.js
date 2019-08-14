import {
  needInputBox,
  needOptionsBox,
  buildSquare,
  buildGrid,
} from './GridDOM.js';
import { shallow } from 'enzyme';

/* 

    needInputBox:
        - options.gridnum !== options.state.clicked => null
        - options.gridnum === options.state.clicked == input with value, onchange, onkeypress == our inputs + opacity 3

    needOptionsBox:
        - test if gridnum !== state.clicked => null
        - test if gridnum === state.clicked => Options with our inputs (we can just mock inputs because we would have tested the functions were inputting as well)

    buildSquares:
        - test if state !== game ==> everything base except popupbox. we could just mock the function.
            - we only need to test that because we're testing needInput/OptionsBox as well.
        - test if state === game and tags[gridnum] === undefined => click === null, popup == null, highlight == null
        - test if state === game && tags[gridnum] !== undefined => highlight == true, rest is base, popupbox an object.
        - check all these with checking the components.find(Grid).click, highlight etc. 

*/

describe('needInputBox', () => {
  it('should return an null if gridnum !== state.clicked', () => {
    let wrapper = needInputBox({ gridnum: 8, state: { clicked: 10 } });
    expect(wrapper).toEqual(null);
  });

  it('should return an input box if gridnum === state.clicked', () => {
    let wrapper = shallow(
      needInputBox({ gridnum: 10, state: { clicked: 10 } }),
    );
    var input = wrapper.find('input');
    expect(input).not.toEqual(undefined);
  });

  it('should pass option functions into input when gridnum === state.clicked', () => {
    var foo = jest.fn();
    var bar = jest.fn();
    let wrapper = shallow(
      needInputBox({
        gridnum: 11,
        state: { clicked: 11, newtag: 'epsum' },
        tagInput: foo,
        submitTagForPhoto: bar,
      }),
    );
    var input = wrapper.find('input').props();
    expect(input.value).toEqual('epsum');
    wrapper.simulate('change', { target: { value: 'loren epsum' } });
    expect(foo).toHaveBeenCalled();
    wrapper.simulate('keypress', { target: { key: 'loren entrepsum' } });
    expect(bar).toHaveBeenCalled();
  });
});

describe('needOptionsBox', () => {
  it('should return null when gridnum !== state.clicked', () => {
    let wrapper = needOptionsBox({ gridnum: 10, state: { clicked: 15 } });
    expect(wrapper).toEqual(null);
  });
  it('should return an Options Component when gridnum === state.clicked', () => {
    let wrapper = shallow(
      needOptionsBox({
        gridnum: 10,
        state: { clicked: 10, tags: [{ 1: 1 }, { 2: 2 }, { 3: 3 }] },
      }),
    );

    expect(wrapper).not.toEqual(null);
    //this shows that there is an option component. will throw an error if option === undefined or null.
  });
});

describe('buildSqaure', () => {
  //we're not testing the needOptions/needInput boxes here
  //we just want to test to make sure each situation gets the right function and correct click + calls.
  it('should return Grid component with popup2 if state.game === null, if popupbox !== null click should not work.', () => {
    var popup1 = jest.fn(x => 5);
    var popup2 = jest.fn(x => 3);
    var mock1 = jest.fn();
    let wrapper = shallow(
      buildSquare({
        needInputBox: popup2,
        processClick: mock1,
        needOptionsBox: popup1,
        gridnum: 4,
        state: { game: null, tags: [1, 2, 3] },
      }),
    );
    //buildSquare makes a Grid component so we need to access the popup value as the children of the children of the Grid component.
    expect(wrapper.props().children.props.children).toEqual(popup2());
    wrapper.simulate('click');
    expect(mock1).not.toHaveBeenCalled();

    //this doesn't have a click because it's null in Grid. Grid turns click = null when popupbox !== null
  });

  it('should return Grid component with popup2 if state.game === null, if popupbox === null click should work.', () => {
    var popup1 = jest.fn(x => 5);
    var popup2 = jest.fn(x => null);
    var mock1 = jest.fn();
    let wrapper = shallow(
      buildSquare({
        needInputBox: popup2,
        processClick: mock1,
        needOptionsBox: popup1,
        gridnum: 4,
        state: { game: null, tags: [1, 2, 3] },
      }),
    );
    //buildSquare makes a Grid component so we need to access the popup value as the children of the children of the Grid component.
    expect(wrapper.props().children.props.children).toEqual(null);
    wrapper.simulate('click');
    expect(mock1).toHaveBeenCalled();
  });

  it('should return Grid component with null popup and null click if state.game !== null && state.tags[gridnum] === undefined', () => {
    var popup1 = jest.fn(x => 5);
    var popup2 = jest.fn(x => 3);
    var mock1 = jest.fn(x => 10);
    let wrapper = shallow(
      buildSquare({
        needInputBox: popup2,
        needOptionsBox: popup1,
        processClick: mock1,
        gridnum: 4,
        state: { game: 4, tags: [0, 1, 2] },
      }),
    );
    expect(wrapper.props().children.props.children).toEqual(null);

    wrapper.simulate('click');
    expect(mock1).not.toHaveBeenCalled();
  });

  it('should return Grid component with null if state.game !== null && state.tags[gridnum] !== undefined, popup1 !== null', () => {
    var popup1 = jest.fn(x => 5);
    var popup2 = jest.fn(x => 3);
    var mock1 = jest.fn();
    let wrapper = shallow(
      buildSquare({
        needInputBox: popup2,
        needOptionsBox: popup1,
        processClick: mock1,
        gridnum: 4,
        state: { game: 4, tags: [0, 1, 2, 3, 4] },
      }),
    );
    expect(wrapper.props().children.props.children).toEqual(popup1());
    wrapper.simulate('click');
    expect(mock1).not.toHaveBeenCalled();
  });

  it('should return Grid component with null if state.game !== null && state.tags[gridnum] !== undefined, popup1 !== null', () => {
    var popup1 = jest.fn(x => null);
    var popup2 = jest.fn(x => 3);
    var mock1 = jest.fn();
    let wrapper = shallow(
      buildSquare({
        needInputBox: popup2,
        needOptionsBox: popup1,
        processClick: mock1,
        gridnum: 4,
        state: { game: 4, tags: [0, 1, 2, 3, 4] },
      }),
    );
    expect(wrapper.props().children.props.children).toEqual(popup1());
    wrapper.simulate('click');
    expect(mock1).toHaveBeenCalled();
  });
});

describe('buildGrid', () => {
  it('should return 64 grids', () => {
    let grid = buildGrid({
      func: () => {
        'hello';
      },
    });
    expect(grid.length).toEqual(8);
    grid.forEach(x => expect(x.length).toEqual(8));
  });
});
