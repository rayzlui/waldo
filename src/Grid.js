import React from 'react';


class Grid extends React.Component{

  constructor(props){
    super(props)

    this.processClick = this.processClick.bind(this)
  }

  processClick(){

    if (this.props.processClick !== null){
      this.props.processClick(this.props.id)
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

export default Grid;
