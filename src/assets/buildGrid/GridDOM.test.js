import { shallow } from 'enzyme'
import React from 'react'
import { GridDOM } from './GridDOM'
import { GridContainer } from '../gridSection/GridContainer'


describe('GridDOM', () => {
  it('should render correctly', () => {
    const wrapper = shallow(<GridDOM />)
    let elements = wrapper.find(GridContainer)
    expect(elements.length).toEqual(64)
  })
})