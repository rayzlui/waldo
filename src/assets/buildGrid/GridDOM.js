import React from 'react';
import { GridContainer } from '../gridSection/GridContainer';

export function GridDOM() {
  let grid = [];
  for (let i = 0; i < 8; i++) {
    let row = [];
    for (let j = 0; j < 8; j++) {
      let gridId = 8 * i + j;
      row.push(<GridContainer key={'grid' + i + j} gridId={gridId} />);
    }
    grid.push(row);
  }

  return <section className="grid__container">{grid}</section>;
}
