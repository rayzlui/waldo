let mongoose = require('mongoose');

let Schema = mongoose.Schema;
let tagSchema = new Schema({
  tag: String,
  photo_id: Object,
});
module.exports = mongoose.model('Taggings', tagSchema);
