const express = require('express')
const mongoose = require('mongoose')
const app = express()
const port = 3001

mongoose.connect('mongodb://localhost/my_db')

var photoSchema = mongoose.Schema({
  photo: String, //this will be a url LINK to a photo online.
  tags: Array //this will be an array of tag ids.
})

var tagSchema = mongoose.Schema({
  tag: String,
  photo_id: Array
})

var Photo = mongoose.model("Photo", photoSchema)
var Tag = mongoose.model("Tag", tagSchema)

//we're using react, so we're not rendering views
//we're just working as an api, either giving data or receiving it.

const testdata = [
  {id: 4, url: "https://thespinoff.co.nz/wp-content/uploads/2019/02/sam-56.jpg", tags: [4 , 5, 6, 3]},
  {id: 3, url: "https://thespinoff.co.nz/wp-content/uploads/2019/02/sam-56.jpg", tags: [2]}

]

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", " X-Requested-With");
  next();
});

app.get("/",(req,res)=>{
  //this is the index, we want to send all photos with id's to the front end for the user to "select a photo"
  res.send(testdata)
})


app.listen(port, console.log("Server connected"))
