var express = require('express')
var mongoose = require('mongoose')

var app = express()
var port = 3001

var mongoDB = 'mongodb://localhost:27017/waldo'
mongoose.connect(mongoDB ,{useNewUrlParser: true}, function(err){
        if (err) return console.log(err)
         console.log('Database connection successful')
       })

//Server Setup
app.use(function(req, res, next) {
         //we need to CORS to allow more than one type of headers, in this
         //situation we needed it to accept content-type for post, so we could set it in the front end.
         res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", " X-Requested-With, Origin, Content-Type, Accept");
  next();
});

app.use(express.json());
app.use(express.urlencoded())

//Schema
var Schema = mongoose.Schema
//this is to track for tag ids.

var tagSchema = new Schema({
  tag: String,
  photo_id: Array
})

var photoSchema = new Schema({
  key: Number,
  photo: String, //this will be a url LINK to a photo online.
  tags: Array //this will be an array of arrays in format [[div${id}, tag${id}],[]]
},{collection: "Photos"})

var Photos = mongoose.model("Photos", photoSchema)
var Taggings = mongoose.model("Taggings", tagSchema)




//Routes
app.get("/",function(req,res){
  //this is the index, we want to send all photos with id's to the front end for the user to "select a photo"
  Photos.find({}, function(err,photos){
        if (err){
             throw err;
         }else{
             res.send(photos);
         }
       })
     })

app.post("/",(req,res)=>{
 let data = req.body
 let photoid = data.id
 let phototags = data.tags
 let newtags = []
 for (let x in phototags) {
   let tagdiv = x
   let tagname = phototags[tagdiv]
   //we want to add an array of [id, div] into the tag database. we want to find that
   //tag or create one if it doesn't exist. However findoneandupdate requires an update section, in our situation,
   //we aren't updating with a new array, we're adding to it.
   Taggings.findOne({tag:tagname}, function(err,tag){
     if (err){
       //if we can't find a tag, then we make a new one.
     }else{
       //if we find the tag, we'll just push an array of [photoid, div.id] into the photo array of the db.
       //we need to set tag id to the correct id so we can reference it in the photos update.
        if (tag === null){
          let newTag = new Taggings({
            tag: tagname,
            photo_id: [[photoid, tagdiv]]
            })
            newtags.push([newTag._id, tagdiv])
            newTag.save(function(err){
            if (err){
                console.log(`There was an error ${tagname} saving new tag.`)

            }else{
              console.log(`Saved ${tagname} successfully`)
            }
          })
        }else{
           var copy = tag.photo_id
           copy.push([photoid, tagdiv])
           tag.photo_id = copy
           tag.save()
           newtags.push([tag._id, tagdiv])
         }
       }
     })
   }
   Photos.findOne({key: photoid}, function(err,photo){

   if (err){
     //if there's an error that means the database is down.
     throw (err)
   }else{
     //we will also push the array of [div.id, tag] into the photo db.
      var copy = photo.tags
      newtags.concat(copy)
      photo.tags = newtags
      photo.save(function(err){
      if (err){
        console.log("Unable to save tags to photo")
      }else{
        console.log("Sucess save to photo")
      }
    })
   }
 })




})




app.get("/tags/:id",(req,res)=>{
  //this will be a way to search for photos with a certain tag. work in progess idea

    var id = req.params.id
    Taggings.find({_id: id},function(err, data){
        if (err){
          console.log("Unable to find tag.")
          throw(err)
        }else{
          res.send(data)
        }
      }
    )
})



app.listen(port, console.log("Server connected"))
