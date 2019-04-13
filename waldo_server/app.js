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

var testdata = [
  {id: 4, url: "https://thespinoff.co.nz/wp-content/uploads/2019/02/sam-56.jpg", tags: [4 , 5, 6, 3]},
  {id: 3, url: "https://cdn.vox-cdn.com/thumbor/TV4u64TH6dYwgDus-UVZdRVTuMs=/0x0:1196x672/1200x800/filters:focal(538x185:728x375)/cdn.vox-cdn.com/uploads/chorus_image/image/56499775/Screen_Shot_2017_09_02_at_9.51.09_PM.0.png", tags: [2]},
  {id: 2, url: "https://www.muraldecal.com/en/img/fomi030_1-jpg/folder/products-detalle-muestras-grandes/wall-murals-minions.jpg", tags: [2]}

]

app.use(function(req, res, next) {
  //we need to CORS to allow more than one type of headers, in this
  //situation we needed it to accept content-type for post, so we could set it in the front end.
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", " X-Requested-With, Origin, Content-Type, Accept");
  next();
});

app.use(express.json());
app.use(express.urlencoded())

app.get("/",(req,res)=>{
  //this is the index, we want to send all photos with id's to the front end for the user to "select a photo"
  res.send(testdata)
})

app.get("/tags",(req,res)=>{
  //this will be a way to search for photos with a certain tag. work in progess idea.
})

app.post("/",(req,res)=>{
  var data = req.body
  //data is the object we sent from frontend. we will recieve in format {id: tags:}}
  //id will be Number, an id for photo, tags will be an array of tags (in string format)
  //we want to find or create tags first. so we'll have to check tag database for the tag.
    //if the database has the tag, we'll simply add the id to the tags ids
    //if it does not we'll create a tag and add id for photo.
  //then we add the id of the tag into the tags for the photo.
  
})


app.listen(port, console.log("Server connected"))
