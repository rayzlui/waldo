import React, { Component } from 'react';

import Grid from './Grid'
import Options from './Option'
import {scoreCard, typeOfPhotoDisplay} from './PhotoDOM'
import {getData, getTagName} from './asyncfunc'
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
    var data = await getData()

    if (typeof(data)==='string'){
      this.setState({photo: data})
    }else{

      this.setState({data: data, receivedData:true})
    }

  }



  submitTagForPhoto(e){
    //this is when the
    var code = e.keyCode || e.which
    if (code === 13){
      //this is essentially the submit for newtag.
      var copyTags = this.state.tags
      copyTags[this.state.clicked] = this.state.newtag
      this.setState({tags:copyTags, clicked: null, newtag: ''})

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



  

  buildGrids(){
    //in game mode, we'll highlight the spots do that do have a tag, all other divs will not be clickable.
    let grid = []
    for (var i = 0; i< 8; i++){
      var row = []
      for (var j = 0; j < 8; j++){

        var gridnum = (8*i)+j
        let popupbox = null
        let click = this.processClick.bind(this)
        let game = null

        if (this.state.game){

          if (this.state.tags[gridnum] !== undefined){
            //if we are in game mode, we want to highlight divs that have tags for players to click and guess.
            game = true
            if (gridnum === this.state.clicked){
              //when the div is clicked, it will display the options.
              popupbox = <Options tags = {this.state.tags} gridnum = {gridnum} checkTagForGame = {this.checkTagForGame.bind(this)}/>
                        
            }
          }else{
            //if there's no tag at the div, we don't want it to be clickable.
            click = null

          }

        }else{
          //if we're not in game, we want grids to be invisible until clicked for an input box.
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
    return (
      <div className = "gridcontainer" style ={{position: "absolute", zIndex:2, height: 500, width: 800}}>
        {grid}
      </div>
    )
  }

  async  selectedPhotoFromIndex(id){
    var data = this.state.data[id]
    var selectedPhoto = data.photo
    var tags = data.tags
    var newtags = {}
    for (var i = 0; i < tags.length; i++){
      var div = tags[i][1]/1 //make it a number.
      var tagId = tags[i][0]
      var tagname = await getTagName(tagId)

      newtags[div] = await tagname

    }

    await this.setState({
      photo: selectedPhoto,
      photoId: id,
      tags: newtags
    })
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
      grid = this.buildGrids()
    }

    if (this.state.game){
      score = scoreCard({score: this.state.score, tagPhotoStatus: this.tagPhotoStatus.bind(this)})

    }else{
      game = "TAG"
      storeTags = <button onClick= {this.submitTagsToServer.bind(this)}>Save Tags</button>
      score = <h4 onClick = {this.playGame.bind(this)}>Play Guessing Game </h4>
    }


    return(
      <div className = "application">
        <h1>{game} THAT POKEMON</h1>

        {score}
        {button}
        <div className = "store-tags">
          {storeTags}
        </div>
        

        <div className = "main-container" style = {{position: "relative", paddingTop: 80}}>
          {grid}
          {typeOfPhotoDisplay({photo:this.state.photo, data:this.state.data, func: this.selectedPhotoFromIndex.bind(this)})}

        </div>

      </div>
    )
  }

}

export default App;
