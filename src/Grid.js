import React from 'react';
import PropTypes from 'prop-types';

class Grid extends React.Component {
  processClick() {
    if (this.props.processClick !== null) {
      this.props.processClick(this.props.id);
    }
  }

  render() {
    let click = this.processClick.bind(this);
    let style = {
      height: 500 / 8 - 2,
      width: 800 / 8 - 2,
      display: 'inline-grid',
      gridGap: 0,
      border: 1,
      position: 'relative',
      zLength: 0,
    };
    if (this.props.highlight !== null) {
      //this is if we're in the game and we're showing the user the possible options to play on.
      style.border = '1px solid purple';
    }
    //there's no else in game vs popupbox because:
    //popupbox is for both for the options for the game and input for te tagging

    if (this.props.popupbox !== null) {
      //this is when they click on one of the divs to play on.
      style.border = '1px solid green';
      click = null; //if there is a popupbox, we want our click to activate in the popup box and not in this div.
    }

    return (
      <div
        id={'grid-' + this.props.id}
        key={this.props.id}
        style={style}
        onClick={click}
      >
        <div className="popupBox" style={{ position: 'absolute', zLength: 1 }}>
          {this.props.popupbox}
        </div>
      </div>
    );
  }
}

export default Grid;

Grid.propTypes = {
  processClick: PropTypes.func,
  id: PropTypes.number,
  highlight: PropTypes.bool,
  popupbox: PropTypes.object,
};
