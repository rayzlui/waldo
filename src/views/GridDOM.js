import React from 'react';
import { GridContainer } from '../containers/GridContainer';

export function GridDOM() {
  /*
        When we're in tag mode, there's two situations:
            - No grid is clicked on, hence nothing highlighted, no popupbox, everything is clickable.
            - One grid is clicked on, said grid is highlighted, with popupbox, everything is still clickable.
        When we're in game mode, there's three situations:
            - There are possible playable grids, one clicked on, hence multiple highlighted, with one popupbox, nothing clickable except highlighted.
            - There are possible playable grids, none clicked on, multiple highlighted, no popupbox, only highlight clickable.
            - No playable grids, hence no highlights, no clickable, no popup
     */
  //in game mode, we'll highlight the spots do that do have a tag, all other divs will not be clickable.

  let grid = [];
  for (let i = 0; i < 8; i++) {
    let row = [];
    for (let j = 0; j < 8; j++) {
      let gridId = 8 * i + j;
      row.push(<GridContainer gridId={gridId} />);
    }
    grid.push(row);
  }

  return <section className="grid__container">{grid}</section>;
}
