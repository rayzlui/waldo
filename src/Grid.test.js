
import React from 'react'
import Grid from "./Grid.js";
import {shallow} from 'enzyme'

//Test if props.game == true
//Test if props.popup !== null

describe('Grid', () => {
    

    it ('renders a div with green border', () => {
      const component = shallow(<Grid id = {"foo"} game ={null}/>)
      component.find("#foo")
      console.log("testing here, ", component.find("#foo").props().style.border)
      expect(component.find("#foo").props().style.border).toEqual("1px purple black")

      //use .find
    })
  });