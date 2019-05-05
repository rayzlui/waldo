import React from 'react'
import Option from './Option.js'
import {shallow} from 'enzyme'

import { isTSAnyKeyword, exportAllDeclaration } from '@babel/types';

/* 
    Since this contains a random generator for correct answer location, 
    we'll use a snapshot to make sure there's a difference between each one.

    Since there is a random generator we'll be testing for the following:
        - There are at most 5 options:
            - We'll test if there are > 5 options and we'll test if there are < 5 options.
        - Test there are no duplicate results aka options.value
        - Test there is only one correct key with (aka one val === 1)
        - Test the correct answer is actually in the options (the value/name of the correct answer.)
        - Make sure click works

*/


describe("Options", ()=>{
    it('should return at most 5 options', ()=>{
        var wrapper1 = shallow(<Option gridnum = {3} tags = {{1:2, 3:4, 5:6, 7:8, 9:10, 11:12}}/>)
        var option1 = wrapper1.find('option')
        expect(option1.length).toEqual(5)
        var wrapper2 = shallow(<Option gridnum = {3} tags = {{1:2, 3:4, 5:6}}/>)
        var option2 = wrapper2.find('option')
        expect(option2.length).toEqual(3)
        var wrapper3 = shallow(<Option gridnum = {3} tags = {{1:2}}/>)
        var option3 = wrapper3.find('option')
        expect(option3.length).toEqual(1)
        var wrapper4 = shallow(<Option gridnum = {3} tags = {{1:2, 3:4, 5:6, 7:8, 9:10, 11:12, 13:14, 15:16, 17:18}}/>)
        var option4 = wrapper4.find('option')
        expect(option4.length).toEqual(5)

    })
    it('should not have duplicate options', ()=>{
        const wrapper = shallow(<Option gridnum = {3} tags = {{1:2, 3:4, 5:6, 7:8, 9:10, 11:12}}/>)
        var options = wrapper.find('option').map(x=>x.debug())
        options.forEach(option=> {
            var removed = options.map(x=>x)
            removed.splice(removed.indexOf(option),1)
            expect(removed).not.toContain(option)
        })
    })

    it('should only have one correct answer and should have a correct answer ', ()=>{
        const wrapper = shallow(<Option gridnum = {3} tags = {{1:2, 3:4, 5:6, 7:8, 9:10, 11:12}}/>)
        var options = wrapper.find('option')
        var values = options.map(x=>x.props().value)
        expect(values.filter(x=>x===1).length).toEqual(1)
    })

    it('should have the right answer with the right value marker (value == 1 and tags[gridnum] should be on the same node)', ()=>{
        var gridnum = 3
        const wrapper = shallow(<Option gridnum = {gridnum} tags = {{1:2, 3:4, 5:6, 7:8, 9:10, 11:12}}/>)
        var options = wrapper.find('option')
        var index = options.map(x=>x.props().value).indexOf(1)
        var randomKey = options.map(x=>x.props().id).indexOf(gridnum)
        expect(index).not.toEqual(-1)
        expect(index).toEqual(randomKey)
    })

    it('should be randomly different each time', ()=>{
        var gridnum = 3
        const wrapper = shallow(<Option gridnum = {gridnum} tags = {{1:2, 3:4, 5:6, 7:8, 9:10, 11:12}}/>)
        expect(wrapper).toMatchSnapshot()
    })

    it('should call function we pass in when clicked', ()=>{
        var gridnum = 3
        var mockFunc = jest.fn()
        const wrapper = shallow(<Option checkTagForGame = {mockFunc}gridnum = {gridnum} tags = {{1:2, 3:4, 5:6, 7:8, 9:10, 11:12}}/>)
        wrapper.find('option').map(x=>x)[0].simulate('click')
        expect(mockFunc).toHaveBeenCalled()
    })



})
