import React, { Component } from 'react';

import Photo from './Photo'
import Grid from './Grid'
import './App.css';

class App extends Component {

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
    this.getData = this.getData.bind(this)
    this.typeOfPhotoDisplay = this.typeOfPhotoDisplay.bind(this)
  }

  processClick(id){
    this.setState({clicked:id})
  }

  tagInput(e){
    this.setState({newtag: e.target.value})
  }

  playGame(){
    this.setState({game: true, clicked:null})
  }

  tagPhotoStatus(){
    this.setState({game: false, clicked: null})
  }

  async componentWillMount(){
    var data = await this.getData()
    if (typeof(data) === Array){
      this.setState({data: data, receivedData:true})
    }else{
      this.setState({photo:data})
    }

  }

  async getData(){
    var data
    try {
      var parsedata = await fetch("http://localhost:3001",{mode:"cors"})
      data = await parsedata.json()

    } catch(err){
      alert("Unable to access server, please play with Minions for the time being.")

      var defaultphoto = "https://www.muraldecal.com/en/img/fomi030_1-jpg/folder/products-detalle-muestras-grandes/wall-murals-minions.jpg"
      data = defaultphoto
    }
    return data
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

  submitTagsToServer(){
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


  checkTagForGame(e){
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



  generateSelectOptionsForGame(id){
    let options = []
    let randomKey
    //random decides which select option is going to be the correct one.
    //if we're playing game we should ONLY USE KEYS THAT HAVE VALUES.
    let tagKeys = Object.keys(this.state.tags).map(x=>x/1)
    tagKeys.splice(tagKeys.indexOf(id),1)
    //remove id from the wrong options to prevent duplicate correct answer.

    let limit = tagKeys.length >= 5? 5 : tagKeys.length//
    let random = Math.floor(Math.random()*(limit))
    for (var i = 0; i<=limit;i++){
      //randomKey gets a random id from the tags
      let tag
      let val = 0
      //val is true/false. if val == 1, it's the correct option, if val == 0, it's incorrect.
      if (i===random){
        tag = this.state.tags[id]
        val = 1
        randomKey = id
      }else{
        randomKey = tagKeys.splice(Math.floor((tagKeys.length-1)*Math.random()),1)[0]
        tag = this.state.tags[randomKey]
      }
        options.push(<option value = {val} key = {randomKey} id = {randomKey} onClick = {this.checkTagForGame.bind(this)} style= {{fontSize: 14}}>{tag}</option>)


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
        let click = this.processClick.bind(this)
        let game = false
        if (this.state.game){
          if (this.state.tags[gridnum] !== undefined){
            game = true
            if (gridnum === this.state.clicked){
              popupbox =
                        <div style={{backgroundColor: "white", opacity: 2, position: "absolute", zLength: 100}}>
                          {this.generateSelectOptionsForGame(gridnum)}
                        </div>
            }
          }else{
            click = null
          }
        }else{
          if (gridnum === this.state.clicked){
            popupbox = <input type = "text" value = {this.state.newtag} onChange = {this.tagInput.bind(this)} onKeyPress={this.submitTagForPhoto.bind(this)} style ={{opacity:3}}/>
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
      display = <Photo photo = {this.state.photo} alt = {"uh oh i brokesy"} height = {1} width = {1}/>
    }else{
      display = []
      var photos = this.state.data
      for (var i = 0; i < photos.length;i++){
        //need an click event listener to select photo.
        display.push(<Photo photo = {photos[i].url} key = {i} id = {i} alt = {"uh oh i brokesy"} selectPhoto = {this.selectPhoto.bind(this)} height = {photos.length +1 } width = {photos.length + 1}/>)
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
    let button = null
    let storeTags = null
    let score = null
    let game = "WHAT'S"

    if (this.state.photo !== null){
      //we don't need the grid for the index.
      button = null
      grid =
      <div className = "gridcontainer" style ={{position: "absolute", zIndex:2, height: 500, width: 800}}>
        {this.buildGrids()}
      </div>
    }

    if (this.state.game){
      score =
      <div className = "scorecard">
        <h2>Score</h2>
        <p>{this.state.score}</p>

        <h4 onClick = {this.tagPhotoStatus.bind(this)}>Tag My Own Names!</h4>
      </div>
    }else{
      game = "TAG"
      storeTags = <button onClick= {this.submitTagsToServer.bind(this)}>Save Tags</button>
      score =
      <h4 onClick = {this.playGame.bind(this)}>Play Guessing Game </h4>
    }


    return(
      <div className = "application">
        <h1>{game} THAT POKEMON</h1>

        {score}
        {button}
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

export default App;
