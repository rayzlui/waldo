import Photo from './Photo'
import React from 'react'


function scoreCard(options){
    return (
      <div className = "scorecard">
        <h2>Score</h2>
        <p>{options.score}</p>

        <h4 onClick = {options.tagPhotoStatus}>Tag My Own Names!</h4>
      </div>
    )
  }


function createPhotosIndex(data, func){
    let display = []
    var photos = data
    for (var i = 0; i < photos.length;i++){
      //need an click event listener to select photo.
      display.push(<Photo photo = {photos[i].photo} key = {i} id = {photos[i].key} alt = {"uh oh i brokesy"} selectPhoto = {func} height = {photos.length +1 } width = {photos.length + 1}/>)
    }
    return display
  }

function typeOfPhotoDisplay(options){
    let display
    if (options.photo !== null){
      display = <Photo photo = {options.photo} alt = {"uh oh i brokesy"} height = {1} width = {1}/>
    }else{
      display = createPhotosIndex(options.data, options.func)
    }
    return (
      <div className = "photocontainer" style = {{position: "absolute", zIndex: -1,height: 500, width: 800}}>
        {display}
      </div>
    )
  }

export {scoreCard, typeOfPhotoDisplay}