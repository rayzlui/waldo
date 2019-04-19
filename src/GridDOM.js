import Options from './Option'
import Grid from './Grid'
import React from 'react'

 class GridDOM extends React.Component{

    render(){
        //in game mode, we'll highlight the spots do that do have a tag, all other divs will not be clickable.
        let grid = []
        for (var i = 0; i< 8; i++){
        var row = []
            for (var j = 0; j < 8; j++){

                var gridnum = (8*i)+j
                let popupbox = null
                let click = this.props.processClick.bind(this)
                let game = null

                if (this.props.state.game){

                    if (this.props.state.tags[gridnum] !== undefined){
                        //if we are in game mode, we want to highlight divs that have tags for players to click and guess.
                        game = true
                        if (gridnum === this.props.state.clicked){
                        //when the div is clicked, it will display the options.
                        popupbox = <Options tags = {this.props.state.tags} gridnum = {gridnum} checkTagForGame = {this.props.checkTagForGame.bind(this)}/>
                                    
                        }
                    }else{
                        //if there's no tag at the div, we don't want it to be clickable.
                        click = null

                    }

                }else{
                //if we're not in game, we want grids to be invisible until clicked for an input box.
                    if (gridnum === this.props.state.clicked){
                        popupbox = <input type = "text" value = {this.props.state.newtag} onChange = {this.props.tagInput} onKeyPress={this.props.submitTagForPhoto} style ={{opacity:3}}/>
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
  }

export default GridDOM