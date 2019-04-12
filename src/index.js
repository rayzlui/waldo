import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA


/*
We need a backend or at least a database to store the associations for the tags and photo. Could be as simple as
Table: Tags
ID|Tags
With ID being the photo, tags being an array of objects that associates a number key that relates to a positional div and a name.
Another idea is if we want a game, we can have a database for names and a database for photos and a database for their connections
thus we can generate random names with the name database and it'll be more challenging.

Goals:
1. Build frontend first. Have a "tag" build (where user can tag photo) and a "game" build where user can guess on photo.
  - Set up how tagging and save it to local for now. Later for backend we'll store it in database.
  - Build "game" portion where clicking on div allows player to play to see options for the "guessing"
  - Building the tagging is likely going to be divs over the photo
    - Should have 8 x 8 across the photo? Depends on photo size.
    - On game if should render random names along with correct name, if correct we'll have an alert saying yes and if not will have try again
    - On tag, we'll have an input box.

  - We want to build:
    1. User calls page, should render options of photos to choose
      - Need to expand photoDOM to check state for received data.
        - If received array, will need to build out divs for small photos.
        - Photos will have click to link to photo. Need status to differentiate index of photos shown and just one photo.
      - On selection, we will not need to call backend again, just need to load it into state.photo.
    2. If error, will load the testphoto
      - Need a status to differentiate between index and id.

2. Backend
  - Learn MongoDB
  - Learn Node.js
  - Learn ExpressJS
  - Set up MongoDB that stores photo with id and tags.
  - Create functions to send data back.
*/

const testphoto = "https://thespinoff.co.nz/wp-content/uploads/2019/02/sam-56.jpg"



class Photo{
  //our data is going to come in as objects already, this may not be necessary.
  //It would be necessary if we were uploading our own photos.
  constructor(options){
    this.image = options.image
    this.tags = options.tags
    this.tagPhotoStatus = this.tagPhotoStatus.bind(this)
  }

  tagPhotoStatus(id, name){
    //depending on which div is clicked will get id to create tag with key = id.
    this.tags[id] = name
  }
}

class Grid extends React.Component{

  constructor(props){
    super(props)

    this.processClick = this.processClick.bind(this)
  }

  processClick(e){

    if (this.props.processClick !== null){
      this.props.processClick(this.props.id,e)
    }
  }

  render(){
    let click = this.processClick
    let style = {height: 500/8-2, width: 800/8-2, display: "inline-grid", gridGap: 0, border: 1, position:"relative", zLength:0}
    if (this.props.game === true){
      //this is if we're in the game and we're showing the user the possible options to play on.
      style.border = "1px solid purple"
    }
    if (this.props.popupbox !== null){
      //this is when they click on one of the divs to play on.
      style.border =  "1px solid black"
      click = null
    }
    return(


        <div id = {this.props.id} key = {this.props.id} style = {style} onClick = {click}>
        <div className = "popupBox" style = {{position: "absolute", zLength: 1}}>{this.props.popupbox}</div>
        </div>

    )
  }
}

class PhotoDOM extends React.Component{
//photoDOM only deals with the DOM stuff, we'll have an actual photo
//class that will break down the info from the database (namely the photourl and tags)
  constructor(props){
    super(props)
    this.selectPhoto = this.selectPhoto.bind(this)
  }

  selectPhoto(){
    this.props.selectPhoto(this.props.id)
  }

  render(){
    let click = null
    if (this.props.height > 1){
      click = this.selectPhoto
    }

    return(

      <img src = {this.props.photo} alt = {"ohnoesy i broked"} onClick = {click} style = {{height: 500/this.props.height , width: 800/this.props.width, display: "inline-block"}} />



    )
  }
}

class Application extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      photo: null,
      game: false,
      tags: {},
      newtag: '',
      clicked: null,
      score: 0,
      data: [],
      receivedData: false,
      photoId: null


    }
    this.buildGrids = this.buildGrids.bind(this)
    this.processClick = this.processClick.bind(this)
    this.playGame = this.playGame.bind(this)
    this.tagInput = this.tagInput.bind(this)
    this.tagPhotoStatus = this.tagPhotoStatus.bind(this)
    this.getData = this.getData.bind(this)
    this.typeOfPhotoDisplay = this.typeOfPhotoDisplay.bind(this)
    this.submitTags = this.submitTags.bind(this)
  }

  async componentWillMount(){
    var data = await this.getData()
    this.setState({data: data, receivedData: true})
  }



  processClick(id, clickdata){
    //popup box should get the data from the click and produce the popup box there.
    this.setState({clicked:id})
    //this conflicts with the checkTag because we're clicking on this div inside that div.
  }

  submitTagForPhoto(e){
    //this is when the
    var code = e.keyCode || e.which
    if (code === 13){
      //this is essentially the submit for newtag.
      var copyTags = this.state.tags
      copyTags[this.state.clicked] = this.state.newtag
      this.setState({tags:copyTags, clicked: null, newtag: ''})
      //will need to post the info back to server here:

    }
  }

  submitTags(){
    fetch("http://localhost:3001", {
        method: "post",
        headers: {
            "Content-Type": "application/json"},
        body: JSON.stringify({
          id: this.state.photoId,
          tags: this.state.tags
          }
        )
      })
      console.log("SUBMIT TAGS RAN.")
  }

  tagInput(e){
    this.setState({newtag: e.target.value})
  }

  checkTag(e){
    //used to check if selected name is correct.
    var val = e.target.value/1
    var score = this.state.score
    if (val === 1){
      alert("Correct")

      score+=2

    }else{
      alert("Incorrect")
    }
    this.setState({clicked: null, score: score})
  }



  generateSelectOptions(id){
    //backend will have a database of names we could use to generate.
    var options = []

    //random decides which select option is going to be the correct one.
    //if we're playing game we should ONLY USE KEYS THAT HAVE VALUES.
    var tagKeys = Object.keys(this.state.tags).map(x=>x/1)

    tagKeys.splice(tagKeys.indexOf(id),1)

    //remove id from the wrong options to prevent duplicate correct answer.|
    let randomKey
    var limit = tagKeys.length >= 5? 5 : tagKeys.length//
    var random = Math.floor(Math.random()*(limit))
    for (var i = 0; i<=limit;i++){
      //randomKey gets a random id from the tags
      let tag
      let val = 0
      if (i===random){

        tag = this.state.tags[id]
        val = 1
        randomKey = id
      }else{
        randomKey = tagKeys.splice(Math.floor((tagKeys.length-1)*Math.random()),1)[0]
        tag = this.state.tags[randomKey]
      }
        options.push(<option value = {val} key = {randomKey} id = {randomKey} onClick = {this.checkTag.bind(this)} style= {{fontSize: 14}}>{tag}</option>)


    }
    return options
  }

  buildGrids(){
    //in game mode, we'll highlight the spots do that do have a tag, all other divs will not be clickable.
    let grid = []
    for (var i = 0; i< 8; i++){
      var row = []
      for (var j = 0; j < 8; j++){
        var gridnum = (8*i)+j
        let popupbox = null
        let click = this.processClick
        let game = false
        if (this.state.game){
          if (this.state.tags[gridnum] !== undefined){
            game = true
            if (gridnum === this.state.clicked){
              popupbox =
                        <div style={{backgroundColor: "white", opacity: 2, position: "absolute", zLength: 100}}>
                          {this.generateSelectOptions(gridnum)}
                        </div>
            }
          }else{
            click = null
          }
        }else{
          if (gridnum === this.state.clicked){
            popupbox = <input type = "text" value = {this.state.newtag} onChange = {this.tagInput} onKeyPress={this.submitTagForPhoto.bind(this)} style ={{opacity:3}}/>
          }

          //AT THE START NOTHING HAS A PROCESS CLICK EVENT LISTENER BECAUSE NOTHING IS CLICKED AT THE START.

        }
        var square = <Grid key = {gridnum} id = {gridnum} processClick = {click} popupbox = {popupbox} game = {game}/>
        row.push(square)
      }
      grid.push(row)
    }
    grid.join()
    return grid
  }

  playGame(){
    this.setState({game: true, clicked:null})

  }

  tagPhotoStatus(){
    this.setState({game: false, clicked: null})
  }



  async getData(){
    var data = await fetch("http://localhost:3001",{mode:"cors"})
    var parsedata = await data.json()
    return parsedata

  }

  selectPhoto(id){
    var selectedPhoto = this.state.data[id].url
    this.setState({
      photo: selectedPhoto,
      photoId: id
    })
  }

  typeOfPhotoDisplay(){
    let display
    if (this.state.photo !== null){
      display = <PhotoDOM photo = {this.state.photo} alt = {"uh oh i brokesy"} height = {1} width = {1}/>
    }else{
      display = []
      var photos = this.state.data
      for (var i = 0; i < photos.length;i++){
        //need an click event listener to select photo.
        display.push(<PhotoDOM photo = {photos[i].url} key = {i} id = {i} alt = {"uh oh i brokesy"} selectPhoto = {this.selectPhoto.bind(this)} height = {photos.length +1 } width = {photos.length + 1}/>)
      }
    }
    return (
      <div className = "photocontainer" style = {{position: "absolute", zIndex: -1,height: 500, width: 800}}>
        {display}
      </div>
    )
  }

  render(){
    let grid = null
    let storeTags = null
    if (this.state.photo !== null){
      //we don't need the grid for the index.
      grid =
      <div className = "gridcontainer" style ={{position: "absolute", zIndex:2, height: 500, width: 800}}>
        {this.buildGrids()}
      </div>
    }
    let score = null
    let game = "WHAT'S"
    if (this.state.game){

      score =
      <div className = "scorecard">
        <h2>Score</h2>
        <p>{this.state.score}</p>

        <h4 onClick = {this.tagPhotoStatus}>Tag My Own Names!</h4>
      </div>
    }else{
      game = "TAG"
      storeTags = <button onClick= {this.submitTags}>Save Tags</button>
      score =
      <h4 onClick = {this.playGame}>Play Guessing Game </h4>
    }





    return(
      <div className = "application">
        <h1>{game} THAT POKEMON</h1>

        {score}
        <div className = "store-tags">
          {storeTags}
        </div>
        <br/>
        <br/>
        <br/>
        <br/>

        <div className = "main-container" style = {{position: "relative"}}>
          {grid}
          {this.typeOfPhotoDisplay()}

        </div>

      </div>
    )
  }
}



ReactDOM.render(<Application />, document.getElementById('root'));
serviceWorker.unregister();
