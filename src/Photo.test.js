
import React from 'react'
import Photo from "./Photo.js";  
import {shallow} from 'enzyme'

describe("Photo", ()=>{
    it("should display 'ohnoesy i broked' when no prop.photo is entered", () => {
        const component = shallow(<Photo/>)

        expect(component).toMatchSnapshot();
    });

    it("should display 'imgurl' when prop.photo = 'imgurl'", () => {
        const component = shallow(<Photo photo = {"imgurl"}/>);
        var photo = component.find('img')
        
        //check that img.src = imgurl
        expect(photo.props().src).toEqual("imgurl")
    });

    //check img.onclick = click
    it("should have click action when props.height == 2", ()=>{
        var mockFunction = jest.fn()
        const wrapper = shallow(<Photo height = {2} selectPhoto = {mockFunction}/>)
        var photo = wrapper.find('img').simulate('click')
        expect(mockFunction).toBeCalled()
    })

    //check img.onclick = null
    it("should not have click action when props.height == 1", ()=>{
        var  mockFunction = jest.fn()
        const wrapper = shallow(<Photo height = {1} selectPhoto = {mockFunction}/>)
        wrapper.find('img').simulate('click')
        expect(mockFunction).not.toBeCalled()    
    })

    //check height = 500
    it("should have height 500px when props.height == 1", ()=>{
        
        const wrapper = shallow(<Photo height = {1}/>)
        var photo = wrapper.find('img')
        expect(photo.props().style.height).toEqual(500)
    })

    //check height = 500/x

    it("should have height 250px when props.height == 2", ()=>{
        const wrapper = shallow(<Photo height = {2}/>)
        var photo = wrapper.find('img')
        expect(photo.props().style.height).toEqual(250)
    })

    //check width = 800
    it("should have height 800px when props.width == 1", ()=>{
        const wrapper = shallow(<Photo width = {1}/>)
        var photo = wrapper.find('img')
        expect(photo.props().style.width).toEqual(800)
    })

    //check width = 800/x
    it("should have height 400px when props.width == 2", ()=>{
        const wrapper = shallow(<Photo width = {2}/>)
        var photo = wrapper.find('img')
        expect(photo.props().style.width).toEqual(400)
    })

    
})