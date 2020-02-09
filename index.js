import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import PropTypes from 'prop-types';

ReactDOM.render(<App />, document.getElementById('root'));

const testphoto =
  'https://thespinoff.co.nz/wp-content/uploads/2019/02/sam-56.jpg';

class Grid extends React.Component {
  constructor(props) {
    super(props);

    this.processClick = this.processClick.bind(this);
  }

  processClick(e) {
    if (this.props.processClick !== null) {
      this.props.processClick(this.props.id, e);
    }
  }

  render() {
    let click = this.processClick;
    let style = {
      height: 500 / 8 - 2,
      width: 800 / 8 - 2,
      display: 'inline-grid',
      gridGap: 0,
      border: 1,
      position: 'relative',
      zLength: 0,
    };
    if (this.props.game === true) {
      //this is if we're in the game and we're showing the user the possible options to play on.
      style.border = '1px solid purple';
    }
    if (this.props.popupbox !== null) {
      //this is when they click on one of the divs to play on.
      style.border = '1px solid black';
      click = null;
    }
    return (
      <div id={this.props.id} key={this.props.id} style={style} onClick={click}>
        <div className="popupBox" style={{ position: 'absolute', zLength: 1 }}>
          {this.props.popupbox}
        </div>
      </div>
    );
  }
}

Grid.propTypes = {
  popupbox: PropTypes.object,
  id: PropTypes.number,
  game: PropTypes.bool,
  processClick: PropTypes.func,
};

class PhotoDOM extends React.Component {
  //photoDOM only deals with the DOM stuff, we'll have an actual photo
  //class that will break down the info from the database (namely the photourl and tags)

  render() {
    return (
      <div
        className="photocontainer"
        style={{ position: 'absolute', zIndex: -1, height: 500, width: 800 }}
      >
        <img
          src={this.props.photo}
          alt={'ohnoesy i broked'}
          style={{ height: 500, width: 800 }}
        />
      </div>
    );
  }
}

PhotoDOM.propTypes = {
  photo: PropTypes.string,
};

class Application extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      photo: testphoto,
      game: false,
      tags: {},
      newtag: '',
      clicked: null,
      score: 0,
    };
    this.buildGrids = this.buildGrids.bind(this);
    this.processClick = this.processClick.bind(this);
    this.playGame = this.playGame.bind(this);
    this.tagInput = this.tagInput.bind(this);
    this.tagPhoto = this.tagPhoto.bind(this);
  }

  processClick(id, clickdata) {
    //popup box should get the data from the click and produce the popup box there.
    this.setState({ clicked: id });
    //this conflicts with the checkTag because we're clicking on this div inside that div.
  }

  enterPressed(e) {
    let code = e.keyCode || e.which;
    if (code === 13) {
      //this is essentially the submit for newtag.
      let copyTags = this.state.tags;
      copyTags[this.state.clicked] = this.state.newtag;
      this.setState({ tags: copyTags, clicked: null, newtag: '' });
    }
  }

  tagInput(e) {
    this.setState({ newtag: e.target.value });
  }

  checkTag(e) {
    //used to check if selected name is correct.
    let val = e.target.value / 1;
    let score = this.state.score;
    if (val === 1) {
      alert('Correct');

      score += 2;
    } else {
      alert('Incorrect');
    }
    this.setState({ clicked: null, score: score });
  }

  generateSelectOptions(id) {
    //backend will have a database of names we could use to generate.
    let options = [];

    //random decides which select option is going to be the correct one.
    //if we're playing game we should ONLY USE KEYS THAT HAVE VALUES.
    let tagKeys = Object.keys(this.state.tags).map(x => x / 1);

    tagKeys.splice(tagKeys.indexOf(id), 1);

    //remove id from the wrong options to prevent duplicate correct answer.|
    let randomKey;
    let limit = tagKeys.length >= 5 ? 5 : tagKeys.length; //
    let random = Math.floor(Math.random() * limit);
    for (let i = 0; i <= limit; i++) {
      //randomKey gets a random id from the tags
      let tag;
      let val = 0;
      if (i === random) {
        tag = this.state.tags[id];
        val = 1;
        randomKey = id;
      } else {
        randomKey = tagKeys.splice(
          Math.floor((tagKeys.length - 1) * Math.random()),
          1,
        )[0];
        tag = this.state.tags[randomKey];
      }
      options.push(
        <option
          value={val}
          key={randomKey}
          id={randomKey}
          onClick={this.checkTag.bind(this)}
          style={{ fontSize: 14 }}
        >
          {tag}
        </option>,
      );
    }
    return options;
  }

  buildGrids() {
    //in game mode, we'll highlight the spots do that do have a tag, all other divs will not be clickable.
    let grid = [];
    for (let i = 0; i < 8; i++) {
      let row = [];
      for (let j = 0; j < 8; j++) {
        let gridnum = 8 * i + j;
        let popupbox = null;
        let click = this.processClick;
        let game = false;
        if (this.state.game) {
          if (this.state.tags[gridnum] !== undefined) {
            game = true;
            if (gridnum === this.state.clicked) {
              popupbox = (
                <div
                  style={{
                    backgroundColor: 'white',
                    opacity: 2,
                    position: 'absolute',
                    zLength: 100,
                  }}
                >
                  {this.generateSelectOptions(gridnum)}
                </div>
              );
            }
          } else {
            click = null;
          }
        } else {
          if (gridnum === this.state.clicked) {
            popupbox = (
              <input
                type="text"
                value={this.state.newtag}
                onChange={this.tagInput}
                onKeyPress={this.enterPressed.bind(this)}
                style={{ opacity: 3 }}
              />
            );
          }

          //AT THE START NOTHING HAS A PROCESS CLICK EVENT LISTENER BECAUSE NOTHING IS CLICKED AT THE START.
        }
        let square = (
          <Grid
            key={gridnum}
            id={gridnum}
            processClick={click}
            popupbox={popupbox}
            game={game}
          />
        );
        row.push(square);
      }
      grid.push(row);
    }
    grid.join();
    return grid;
  }

  playGame() {
    this.setState({ game: true, clicked: null });
  }

  tagPhoto() {
    this.setState({ game: false, clicked: null });
  }

  render() {
    let score = null;
    let game = "WHAT'S";
    if (this.state.game) {
      score = (
        <div className="scorecard">
          <h2>Score</h2>
          <p>{this.state.score}</p>

          <h4 onClick={this.tagPhoto}>Tag My Own Names!</h4>
        </div>
      );
    } else {
      game = 'TAG';
      score = <h4 onClick={this.playGame}>Play Guessing Game </h4>;
    }

    return (
      <div className="application">
        <h1>{game} THAT POKEMON</h1>
        {score}

        <br />
        <br />
        <br />
        <br />
        <div className="main container" style={{ position: 'relative' }}>
          <div
            className="gridcontainer"
            style={{ position: 'absolute', zIndex: 2, height: 500, width: 800 }}
          >
            {this.buildGrids()}
          </div>
          <PhotoDOM photo={this.state.photo} alt={'uh oh i brokesy'} />
        </div>
      </div>
    );
  }
}

ReactDOM.render(<Application />, document.getElementById('root'));
serviceWorker.unregister();
