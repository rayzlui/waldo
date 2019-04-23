import GridDOM from './GridDOM.js'
import React from 'react'
import {shallow} from 'enzyme'

/* 

    needInputBox:
        - options.gridnum !== options.state.clicked => null
        - options.gridnum === options.state.clicked == input with value, onchange, onkeypress == our inputs + opacity 3

    needOptionsBox:
        - test if gridnum !== state.clicked => null
        - test if gridnum === state.clicked => Options with our inputs (we can just mock inputs because we would have tested the functions were inputting as well)

    buildSquares:
        - test if state !== game ==> everything base except popupbox. we could just mock the function.
            - we only need to test that because we're testing needInput/OptionsBox as well.
        - test if state === game and tags[gridnum] === undefined => click === null, popup == null, highlight == null
        - test if state === game && tags[gridnum] !== undefined => highlight == true, rest is base, popupbox an object.
        - check all these with checking the components.find(Grid).click, highlight etc. 

*/