import {
  scoreCard,
  createPhotosIndex,
  changeToTagButton,
  typeOfPhotoDisplay,
} from './photoDOM.js';
import { shallow } from 'enzyme';

/*
    gameHeader tests:
        - check that <p> == options.score (test scoreCard function)
        - check that onClick activates function. See grid test for example. (test changeToTagButton function)
        
    
        createPhotosIndex tests:
        - number of photo components matches display size to make sure we have correct number of photo components

         
    typeOfPhotoDisplay tests:
        - check display === photo component when option.photo !=== null
        - check mock in display if option.photo === null
 */

describe('scoreCard', () => {
  it('p has the same value as options.score', () => {
    let val = 10;

    let wrapper = shallow(scoreCard({ score: val }));
    let p = wrapper.find('#scorecard').props().children;
    expect(p).toEqual(val);
  });
});

describe('changeToTagButton', () => {
  it('runs a function when clicked', () => {
    let mockFunction = jest.fn();
    let wrapper = shallow(changeToTagButton({ tagPhotoStatus: mockFunction }));
    wrapper.find('#change-tag-button').simulate('click');
    expect(mockFunction).toHaveBeenCalled();
  });
});

describe('createPhotosIndex', () => {
  it('should return an array the same length as the data passed in', () => {
    let data = [1, 2, 3, 4, 5, 6];
    let wrapper = createPhotosIndex(data, null);
    expect(wrapper.length).toEqual(data.length);
  });

  it('should run a function when clicked.', () => {
    let data = [1, 2, 3, 4, 5, 6];
    let mockFunc = jest.fn();
    let wrapper = createPhotosIndex(data, mockFunc);

    wrapper.forEach(x => {
      let photo = shallow(x);
      photo.simulate('click');
    });
    expect(mockFunc).toHaveBeenCalledTimes(data.length);
  });
});

describe('typeOfPhotoDisplay', () => {
  it('should return one photo if options.photo !== null', () => {
    let wrapper = shallow(typeOfPhotoDisplay({ photo: 'yes' }));
    let photos = wrapper.find('Photo');
    expect(photos.length).toEqual(1);
  });

  it('should return more than one photo if options.photo == null && options.data > 2', () => {
    let data = [1, 2, 3, 4, 5, 6];
    let wrapper = shallow(typeOfPhotoDisplay({ photo: null, data: data }));
    let photos = wrapper.find('Photo');
    expect(photos.length).toEqual(data.length);
  });
});
