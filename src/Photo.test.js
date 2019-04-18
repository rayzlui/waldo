
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

        expect(component).toMatchSnapshot();
    });

    it('should not have click function when height > 1', ()=> {
        const component = shallow(<Photo height = {2}/>)

        expect(component).toMatchSnapshot()
    })

    it('should have click function when height == 1', ()=> {
        const component = shallow(<Photo height = {1}/>)

        expect(component).toMatchSnapshot()
    })

    it('should not have click function when width > 1', ()=> {
        const component = shallow(<Photo width = {2}/>)

        expect(component).toMatchSnapshot()
    })

    it('should have click function when height == 1', ()=> {
        const component = shallow(<Photo width = {1}/>)

        expect(component).toMatchSnapshot()
    })
})