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
  res.header('Access-Control-Allow-Methods', '*');
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
  Photos.find({}, function(err, photos) {
    if (err) {
      throw err;
    } else {
      res.send(photos);
    }
  });
});

app.get('/tags', function(req, res) {
  Taggings.find({}, function(err, photos) {
    if (err) {
      throw err;
    } else {
      res.send(photos);
    }
  });
});

app.delete('/photos/:id', function(req, res) {
  //need to figure out a way to delete the photo from tags that have other tags in other photos, and delete the photos that only had tags from this image.
  const id = req.params.id;
  Photos.deleteOne({ _id: id }, err => {
    if (err) {
      res.send(err);
    } else {
      res.send('Okay');
    }
  });
});

app.post('/photos', (req, res) => {
  const { key, newUrl } = req.body;
  Photos.findOne({ photo: newUrl }, (err, url) => {
    if (url === null) {
      let newPhoto = new Photos({
        key: key,
        photo: newUrl,
        tags: {},
      });
      newPhoto.save(err => {
        if (err) {
          console.log(`${err} unable to save`);
        } else {
          console.log(`YAYYY SAVED!`);
        }
      });
      res.send('Okay');
    } else {
      res.send('Error');
    }
  });
});

app.put('/photos/:id', (req, res) => {
  const { newUrl } = req.body;
  const id = req.params.id;
  Photos.findOne({ _id: id }, (err, image) => {
    if (image === null) {
      throw err;
    } else {
      image.photo = newUrl;
      image.save(err => {
        if (err) {
          console.log(err);
          res.send(err);
        } else {
          console.log(`Updated ${id}`);
          res.json(image);
        }
      });
    }
  });
});

app.post('/tags', (req, res) => {
  const { imageId, gridId, value } = req.body;
  let tagId;
  Taggings.findOne({ tag: value }, function(err, tag) {
    let obj = {};
    obj[imageId] = gridId;
    if (tag === null) {
      let newTag = new Taggings({
        tag: value,
        photo_id: obj,
      });
      newTag.save(err => {
        if (err) {
          console.log(`There was an error ${value} saving new tag.`);
          res.send(err);
        } else {
          console.log(`Saved ${value} successfully`);
        }
      });
      tagId = newTag._id;
    } else {
      tag.photo_id[imageId] = gridId;
      tag.save();
      tagId = tag._id;
    }
  });
  Photos.findOne({ key: imageId }, (err, photo) => {
    if (err) {
      res.send({ status: 505, message: 'Server Down' });
    } else {
      photo.tags[gridId] = tagId;
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

app.post('/tags/:id', (req, res) => {
  let id = req.params.id;
  let { imageKey, gridId } = req.body;
  Taggings.find({ _id: id }, function(err, data) {
    if (err) {
      console.log(`Unable to find tag ${id}.`);
      throw err;
    } else {
      console.log(`deleting ${data.photo_id[imageKey]}`);
      delete data.photo_id[imageKey];
      console.log('deleted');
    }
  });
  Photos.find({ key: imageKey }, (err, data) => {
    if (err) {
      console.log(`Unable to find image with key: ${imageKey}`);
    } else {
      console.log(`deleting ${data.tags[gridId]}`);
      delete data.tags[gridId];
      console.log('deleted');
    }
  });
});

app.listen(port, console.log('Server connected'));
