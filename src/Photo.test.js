
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
        
        //check that img.src = imgurl
    });

    //check img.onclick = click
    //check img.onclick = null
    //check height = 500
    //check height = 500/x
    //check width = 800
    //check width = 800/x

    
})