import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA

/*
We need a backend or at least a database to store the associations for the tags and photo. Could be as simple as
Table: Tags
ID|Tags
With ID being the photo, tags being an array of objects that associates a number key that relates to a positional div and a name.
Another idea is if we want a game, we can have a database for names and a database for photos and a database for their connections
thus we can generate random names with the name database and it'll be more challenging.

Goals:
1. Build frontend first. Have a "tag" build (where user can tag photo) and a "game" build where user can guess on photo.
  - Set up how tagging and save it to local for now. Later for backend we'll store it in database.
  - Build "game" portion where clicking on div allows player to play to see options for the "guessing"
  - Building the tagging is likely going to be divs over the photo
    - Should have 8 x 8 across the photo? Depends on photo size.
    - On game if should render random names along with correct name, if correct we'll have an alert saying yes and if not will have try again
    - On tag, we'll have an input box.

  - We want to build:
    1. User calls page, should render options of photos to choose
      - Need to expand photoDOM to check state for received data.
        - If received array, will need to build out divs for small photos.
        - Photos will have click to link to photo. Need status to differentiate index of photos shown and just one photo.
      - On selection, we will not need to call backend again, just need to load it into state.photo.
    2. If error, will load the testphoto
      - Need a status to differentiate between index and id.

2. Backend
  - Learn MongoDB
  - Learn Node.js
  - Learn ExpressJS
  - Set up MongoDB that stores photo with id and tags.
  - Create functions to send data back.
*/

serviceWorker.unregister();
