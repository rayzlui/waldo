import React from 'react';

import './index.css';


class Photo extends React.Component{
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

export default Photo
