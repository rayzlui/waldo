//We need a way to store in the situations:
//Photo -> Divs with Tags
//Tags -> Photos that have the tag and the div it located at. So tags should be in the format:
//id | photos
//1  |[[4,6], [2,5]] where the array of photos[x][0] stores the photo id
//and photo[x][1] stores div where the tag is located.

//we're using react, so we're not rendering views
//we're just working as an api, either giving data or receiving it.
import { connect, Schema, model } from 'mongoose';

let mongoDB = 'mongodb://localhost:27017/waldo';
connect(
  mongoDB,
  { useNewUrlParser: true },
  function(err) {
    if (err) return console.log(err);
    console.log('Database connection successful');
  },
);

//this is to track for tag ids.

let photoSchema = new Schema(
  {
    key: Number,
    photo: String, //this will be a url LINK to a photo online.
    tags: Array, //this will be an array of arrays in format [[div${id}, tag${id}],[]]
  },
  { collection: 'Photos' },
);

let Photos = model('Photos', photoSchema);

let testdata = [
  {
    key: 0,
    photo: 'https://thespinoff.co.nz/wp-content/uploads/2019/02/sam-56.jpg',
    tags: [],
  },
  {
    key: 1,
    photo:
      'https://cdn.vox-cdn.com/thumbor/TV4u64TH6dYwgDus-UVZdRVTuMs=/0x0:1196x672/1200x800/filters:focal(538x185:728x375)/cdn.vox-cdn.com/uploads/chorus_image/image/56499775/Screen_Shot_2017_09_02_at_9.51.09_PM.0.png',
    tags: [],
  },
  {
    key: 2,
    photo:
      'https://www.muraldecal.com/en/img/fomi030_1-jpg/folder/products-detalle-muestras-grandes/wall-murals-minions.jpg',
    tags: [],
  },
];

testdata.forEach(data => {
  let photo = new Photos({
    key: data.key,
    photo: data.photo,
    tags: data.tags,
  });
  photo.save();
});
