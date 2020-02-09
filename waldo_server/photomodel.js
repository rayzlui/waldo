let mongoose = require('mongoose');

let Schema = mongoose.Schema;

let photoSchema = new Schema(
  {
    key: Number,
    photo: String, //this will be a url LINK to a photo online.
    tags: Array, //this will be an array of arrays in format [[div${id}, tag${id}],[]]
  },
  { collection: 'Photos' },
);

module.exports = mongoose.model('Photos', photoSchema);
