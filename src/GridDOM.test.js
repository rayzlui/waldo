import GridDOM from './GridDOM.js'
import React from 'react'
import {shallow} from 'enzyme'

/* 

    Need to break this down into more managable pieces first.
    Test what renders when: 
     - prop.state.game === null + clicked => there's an input tag.
     - prop.state.game === null, no clicked => popupbox == null
     - number of state.tag === component.find(where.game == true)
     - 


*/