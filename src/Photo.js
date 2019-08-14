import React from 'react'; 

import './index.css';


class Photo extends React.Component{
//photoDOM only deals with the DOM stuff, we'll have an actual photo
//class that will break down the info from the database (namely the photourl and tags)
  selectPhoto(){
    this.props.selectPhoto(this.props.id)
  }

  render(){
    
    

    return(

      <img src = {this.props.photo} alt = {"ohnoesy i broked"} onClick = {this.selectPhoto.bind(this)} style = {{height: 500/this.props.height , width: 800/this.props.width, display: "inline-block"}} />



    )
  }
}

export default Photo
