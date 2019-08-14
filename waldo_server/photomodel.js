var mongoose = require('mongoose')

var Schema = mongoose.Schema

var photoSchema = new Schema({
  key: Number,
  photo: String, //this will be a url LINK to a photo online.
  tags: Array //this will be an array of arrays in format [[div${id}, tag${id}],[]]
},{collection: "Photos"})

module.export = mongoose.model("Photos", photoSchema)
