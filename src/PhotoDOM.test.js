import PhotoDOM, { scoreCard, createPhotosIndex, changeToTagButton, typeOfPhotoDisplay} from './photoDOM.js'
import React from 'react'
import {shallow} from 'enzyme'
import { exportAllDeclaration } from '@babel/types';

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

 describe("scoreCard", ()=>{
     it('p has the same value as options.score', ()=>{
        var val = 10
        
        const wrapper = shallow(scoreCard({score: val}))
        var p = wrapper.find("#scorecard").props().children
        expect(p).toEqual(val)
     });
 });

 describe("changeToTagButton", ()=>{
     it ('runs a function when clicked', () => {
         var mockFunction = jest.fn()
         const wrapper = shallow(changeToTagButton({tagPhotoStatus: mockFunction}))
         wrapper.find("#change-tag-button").simulate('click')
         expect(mockFunction).toHaveBeenCalled()
     })
 })

 describe('createPhotosIndex', ()=> {
     it('should return an array the same length as the data passed in', ()=>{
        var data = [1,2,3,4,5,6]
        const wrapper = createPhotosIndex(data,null)
        expect(wrapper.length).toEqual(data.length)
     })

     it('should run a function when clicked.', ()=>{
        var data = [1,2,3,4,5,6]
        var mockFunc = jest.fn()
        const wrapper = createPhotosIndex(data,mockFunc)
        
        wrapper.forEach(x=> {
            var photo = shallow(x)
            photo.simulate('click')
        })
        expect(mockFunc).toHaveBeenCalledTimes(data.length)
     })

 })

 describe('typeOfPhotoDisplay', ()=>{
     it('should return one photo if options.photo !== null', ()=> {
         const wrapper = shallow(typeOfPhotoDisplay({photo: "yes"}))
         var photos = wrapper.find('Photo')
         expect(photos.length).toEqual(1)
     })  

     it('should return more than one photo if options.photo == null && options.data > 2', ()=> {
        var data = [1,2,3,4,5,6]
        const wrapper = shallow(typeOfPhotoDisplay({photo: null, data: data}))
        var photos = wrapper.find('Photo')
        expect(photos.length).toEqual(data.length)
    })  
 })