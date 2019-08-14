import Photo from './Photo';
import React from 'react';

function scoreCard(options) {
  return <p id="scorecard">{options.score}</p>;
}

function changeToTagButton(options) {
  return (
    <h4 id="change-tag-button" onClick={options.tagPhotoStatus}>
      Tag My Own Names!
    </h4>
  );
}

function gameModeHeader(options) {
  return (
    <div className="scorecard-change-to-tag-buttons">
      <div id="score-card">
        Score
        {scoreCard({ score: options.score })}
      </div>
      <div id="change-to-tag-button">
        {changeToTagButton({ tagPhotoStatus: options.tagPhotoStatus })}
      </div>
    </div>
  );
}

function createPhotosIndex(data, func) {
  let display = [];
  var photos = data;
  for (var i = 0; i < photos.length; i++) {
    //need an click event listener to select photo.
    display.push(
      <Photo
        photo={photos[i].photo}
        key={i}
        id={photos[i].key}
        alt={'uh oh i brokesy'}
        selectPhoto={func}
        height={photos.length + 1}
        width={photos.length + 1}
      />,
    );
  }
  return display;
}

function typeOfPhotoDisplay(options) {
  let display;
  if (options.photo !== null) {
    display = (
      <Photo
        photo={options.photo}
        alt={'uh oh i brokesy'}
        selectPhoto={null}
        height={1}
        width={1}
      />
    );
  } else {
    display = createPhotosIndex(options.data, options.func);
  }
  return (
    <div
      className="photocontainer"
      style={{ position: 'absolute', zIndex: -1, height: 500, width: 800 }}
    >
      {display}
    </div>
  );
}

export {
  gameModeHeader,
  typeOfPhotoDisplay,
  createPhotosIndex,
  scoreCard,
  changeToTagButton,
};
