import Options from './Option';
import Grid from './Grid';
import React from 'react';
import PropTypes from 'prop-types';

function needInputBox(options) {
  if (options.gridnum === options.state.clicked) {
    return (
      <input
        id="input-popup-box"
        type="text"
        value={options.state.newtag}
        onChange={options.tagInput}
        onKeyPress={options.submitTagForPhoto}
      />
    );
  }
  return null;
}

function needOptionsBox(options) {
  if (options.gridnum === options.state.clicked) {
    //when the div is clicked, it will display the options.
    return (
      <Options
        tags={options.state.tags}
        gridnum={options.gridnum}
        checkTagForGame={options.checkTagForGame}
      />
    );
  }
  return null;
}

function buildSquare(options) {
  //this is basic for tag mode.
  let popupbox = null;
  let click = options.processClick;
  let highlight = null;
  //helpers
  let gridnum = options.gridnum;
  let state = options.state;

  if (state.game) {
    if (state.tags[gridnum] !== undefined) {
      //if we are in game mode, we want to highlight divs that have tags for players to click and guess.
      highlight = true;
      popupbox = options.needOptionsBox({
        gridnum: gridnum,
        state: state,
        checkTagForGame: options.checkTagForGame,
      });
    } else {
      //if there's no tag at the div, we don't want it to be clickable.
      click = null;
    }
  } else {
    //if we're not in game, we want grids to be basic grids until clicked for an input box. aka null popupbox null highlight.
    popupbox = options.needInputBox({
      tagInput: options.tagInput,
      submitTagForPhoto: options.submitTagForPhoto,
      gridnum: gridnum,
      state: state,
    });

    //AT THE START NOTHING HAS A PROCESS CLICK EVENT LISTENER BECAUSE NOTHING IS CLICKED AT THE START.
  }
  return (
    <Grid
      key={gridnum}
      id={gridnum}
      processClick={click}
      popupbox={popupbox}
      highlight={highlight}
    />
  );
}

function buildGrid(options) {
  //Only need to test to make sure grid has 64 objects. Can just mock buildSquare.
  let grid = [];
  for (var i = 0; i < 8; i++) {
    var row = [];
    for (var j = 0; j < 8; j++) {
      var gridnum = 8 * i + j;
      var square = options.func({
        needOptionsBox: needOptionsBox,
        needInputBox: needInputBox,
        gridnum: gridnum,
        state: options.state,
        processClick: options.processClick,
        checkTagForGame: options.checkTagForGame,
        tagInput: options.tagInput,
        submitTagForPhoto: options.submitTagForPhoto,
      });
      row.push(square);
    }
    grid.push(row);
  }
  return grid;
}

class GridDOM extends React.Component {
  /*
        When we're in tag mode, there's two situations:
            - No grid is clicked on, hence nothing highlighted, no popupbox, everything is clickable.
            - One grid is clicked on, said grid is highlighted, with popupbox, everything is still clickable.
        When we're in game mode, there's three situations:
            - There are possible playable grids, one clicked on, hence multiple highlighted, with one popupbox, nothing clickable except highlighted.
            - There are possible playable grids, none clicked on, multiple highlighted, no popupbox, only highlight clickable.
            - No playable grids, hence no highlights, no clickable, no popup
     */

  render() {
    //in game mode, we'll highlight the spots do that do have a tag, all other divs will not be clickable.

    return (
      <div
        className="gridcontainer"
        style={{ position: 'absolute', zIndex: 2, height: 500, width: 800 }}
      >
        {buildGrid({
          func: buildSquare,
          state: this.props.state,
          processClick: this.props.processClick.bind(this),
          checkTagForGame: this.props.checkTagForGame.bind(this),
          tagInput: this.props.tagInput.bind(this),
          submitTagForPhoto: this.props.submitTagForPhoto.bind(this),
        })}
      </div>
    );
  }
}

export { GridDOM, needInputBox, needOptionsBox, buildSquare, buildGrid };

GridDOM.propTypes = {
  state: PropTypes.object,
  processClick: PropTypes.func,
  checkTagForGame: PropTypes.func,
  tagInput: PropTypes.func,
  submitTagForPhoto: PropTypes.func,
};
