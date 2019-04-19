import React from 'react'

class Options extends React.Component{
    constructor(props){
        super(props)
        this.generateSelectOptionsForGame = this.generateSelectOptionsForGame.bind(this)
    }

    generateSelectOptionsForGame(id){
        let options = []
        let tag
        let val
        let randomKey
        //random decides which select option is going to be the correct one.
        //if we're playing game we should ONLY USE KEYS THAT HAVE VALUES.
        let tagKeys = Object.keys(this.props.tags).map(x=>x/1)
        tagKeys.splice(tagKeys.indexOf(id),1)
        //remove id from the wrong options to prevent duplicate correct answer.
    
        let limit = tagKeys.length > 5? 4 : tagKeys.length//
        let random = Math.floor(Math.random()*(limit))
        for (var i = 0; i<=limit;i++){
          //randomKey gets a random id from the tags
    
          //val is true/false. if val == 1, it's the correct option, if val == 0, it's incorrect.
          if (i===random){
            tag = this.props.tags[id]
            val = 1
            randomKey = id
          }else{
            randomKey = tagKeys.splice(Math.floor((tagKeys.length-1)*Math.random()),1)[0]
            tag = this.props.tags[randomKey]
            val = 0
          }
            options.push(<option value = {val} key = {randomKey} id = {randomKey} onClick = {this.props.checkTagForGame} style= {{fontSize: 14}}>{tag}</option>)
    
    
        }
        return options
      }

      render(){
        let options = this.generateSelectOptionsForGame(this.props.gridnum)
        return(
             <div style={{backgroundColor: "white", opacity: 2, position: "absolute", zLength: 100}}>
                {options}
            </div>
          )
      }

}

export default Options