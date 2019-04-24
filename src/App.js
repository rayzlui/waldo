import React, { Component } from 'react';
import {gameModeHeader, typeOfPhotoDisplay} from './PhotoDOM'
import {getData, getTagName, submitTagsToServer} from './DataConnect'
import {GridDOM} from './GridDOM'
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

    this.tagsOfSelectedPhotoFromIndex = this.tagsOfSelectedPhotoFromIndex.bind(this)
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
    var code = e.keyCode || e.which
    if (code === 13){
      //this is essentially the submit for newtag.
      var copyTags = this.state.tags
      copyTags[this.state.clicked] = this.state.newtag
      this.setState({tags:copyTags, clicked: null, newtag: ''})

    }
  }


  async  tagsOfSelectedPhotoFromIndex(id){
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
        <GridDOM state = {this.state} checkTagForGame = {this.checkTagForGame.bind(this)} processClick = {this.processClick.bind(this)} submitTagForPhoto = {this.submitTagForPhoto.bind(this)} tagInput = {this.tagInput.bind(this)}/>
    }

    if (this.state.game){
      score = gameModeHeader({score: this.state.score, tagPhotoStatus: this.tagPhotoStatus.bind(this) })
      
      
    }else{
      game = "TAG"
      storeTags = <button onClick= {()=>submitTagsToServer({photoId: this.state.photoId, tags: this.state.tags})}>Save Tags</button>
      score = <h4 onClick = {this.playGame.bind(this)}>Play Guessing Game </h4>
    }


    return(
      <div className = "application">
        <h1>{game} THAT POKEMON</h1>
        <div className = "score-location">
          {score}
        </div>
        <div className = "tag-vs-game-button">
          {button}
        </div>
        <div className = "store-tags-database">
          {storeTags}
        </div>
        

        <div className = "main-container" style = {{position: "relative", paddingTop: 80}}>
          
          <div className = "grid-location">
            {grid}
          </div>

          <div className = "photo-location">
            {typeOfPhotoDisplay({photo: this.state.photo, data: this.state.data, func: this.tagsOfselectedPhotoFromIndex})}
          </div>

        </div>

      </div>
    )
  }

}

export default App;
