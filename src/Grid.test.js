
import React from 'react'
import Grid from "./Grid.js";
import {shallow} from 'enzyme'

//Test if props.game == true
//Test if props.popup !== null

describe('Grid', () => {
    

    it ('renders a div with purple border when game !== null', () => {
      const component = shallow(<Grid id = {"foo"} game ={true}/>)
      component.find("#foo")
      console.log("testing here, ", component.find("#foo").props().style.border)
      expect(component.find("#foo").props().style.border).toEqual("1px solid purple")

      //use .find
    });

    it ('renders a div with green border when ')

    /*
      - test when game !== null => border == purple
      - test when popupbox !== null => border == green
      - test when both null, click works
      - test when both null border is just 1px
      - test when popupbox !== null => click = null 
      // so we set a function for click (set up an x = 0, function = x+=1, and expect x to equal 0 still) 
      // when we put it in as a prop, but we test that the function was NEVER activated.
     */
  });