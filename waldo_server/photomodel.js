let mongoose = require('mongoose');

let Schema = mongoose.Schema;

let photoSchema = new Schema(
  {
    key: Number,
    photo: String, //this will be a url LINK to a photo online.
    tags: Object,
  },
  { collection: 'Photos' },
);

module.exports = mongoose.model('Photos', photoSchema);
