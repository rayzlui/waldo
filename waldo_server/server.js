let express = require('express');
let mongoose = require('mongoose');
let Taggings = require('./taggingModel.js');
let Photos = require('./photoModel.js');

let app = express();
let port = 3001;

let mongoDB = 'mongodb://localhost:27017/waldo';
mongoose.connect(mongoDB, { useNewUrlParser: true }, function(err) {
  if (err) return console.log(err);
  console.log('Database connection successful');
});

//Server Setup
app.use(function(req, res, next) {
  //we need to CORS to allow more than one type of headers, in this
  //situation we needed it to accept content-type for post, so we could set it in the front end.
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    ' X-Requested-With, Origin, Content-Type, Accept',
  );
  next();
});

app.use(express.json());
app.use(express.urlencoded());

//Routes
app.get('/', function(req, res) {
  //this is the index, we want to send all photos with id's to the front end for the user to "select a photo"
  Photos.find({}, function(err, photos) {
    if (err) {
      throw err;
    } else {
      res.send(photos);
    }
  });
});

app.get('/tags', function(req, res) {
  //this is the index, we want to send all photos with id's to the front end for the user to "select a photo"
  Taggings.find({}, function(err, photos) {
    if (err) {
      throw err;
    } else {
      res.send(photos);
    }
  });
});

app.post('/photo', (req, res) => {
  const { key, newUrl } = req.body;
  Photos.findOne({ photo: newUrl }, (err, url) => {
    if (url === null) {
      let newPhoto = new Photos({
        key: key,
        photo: newUrl,
        tags: [],
      });
      newPhoto.save(err => {
        if (err) {
          console.log(`${err} unable to save`);
        } else {
          console.log(`YAYYY SAVED!`);
        }
      });
      res.send('Okay')
    } else {
      res.send('Error');
    }
  });
});

app.post('/tag', (req, res) => {
  const { imageId, gridId, value } = req.body;
  let newTags = [];
  //we want to add an array of [id, div] into the tag database. we want to find that
  //tag or create one if it doesn't exist. However findoneandupdate requires an update section, in our situation,
  //we aren't updating with a new array, we're adding to it.
  Taggings.findOne({ tag: value }, function(err, tag) {
    if (tag === null) {
      let newTag = new Taggings({
        tag: value,
        photo_id: [[imageId, gridId]],
      });
      newTags = [newTag._id, gridId];
      newTag.save(err => {
        if (err) {
          console.log(`There was an error ${value} saving new tag.`);
          res.send(err);
        } else {
          console.log(`Saved ${value} successfully`);
        }
      });
    } else {
      let copy = tag.photo_id;
      copy.push([imageId, gridId]);
      tag.photo_id = copy;
      tag.save();
      newTags = [tag._id, gridId];
    }
  });
  Photos.findOne({ key: imageId }, (err, photo) => {
    if (err) {
      //if there's an error that means the database is down.
      res.send({ status: 505, message: 'Server Down' });
    } else {
      //we will also push the array of [div.id, tag] into the photo db.
      let copy = photo.tags.slice();
      copy.push(newTags);
      photo.tags = newTags;
      photo.save(function(err) {
        if (err) {
          console.log('Unable to save tags to photo');
          res.send(err);
        } else {
          console.log('Sucess save to photo');
        }
      });
    }
  });
  res.send('ok');
});

app.get('/tags/:id', (req, res) => {
  //this isn't meant to be a view page, this only returns the data from Taggings model with the id: id. The id was tied to the a Photo model instance and is then displayed in the photo view.
  //idea was to get all taggins, we'll just have to create a tags instance and a view for it.
  let id = req.params.id;
  Taggings.find({ _id: id }, function(err, data) {
    if (err) {
      console.log('Unable to find tag.');
      throw err;
    } else {
      res.send(data);
    }
  });
});

app.listen(port, console.log('Server connected'));
