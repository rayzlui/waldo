var mongoose = require('mongoose')

var Schema = mongoose.Schema
var tagSchema = new Schema({
  tag: String,
  photo_id: Array
})

module.export = mongoose.model("Taggings", tagSchema)
