import PhotoDOM from './photoDOM.js'
import React from 'react'
import {shallow} from 'enzyme'

/*
    scoreCard tests:
        - check that <p> == options.score
        - check that onClick activates function. See grid test for example.

    createPhotosIndex tests:
        - number of photo components matches display size to make sure we have correct number of photo components
        - individual photo components and their respective photo or url. Look for component.find(Photo).map(x=>x.photo) === data.
        - simulate click for a photo to make sure function that is passed through works.
         
    typeOfPhotoDisplay tests:
        - check display === photo component when option.photo !=== null
        - check mock in display if option.photo === null

 */