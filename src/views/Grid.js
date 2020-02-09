import React from 'react';
import PropTypes from 'prop-types';
import { OptionsContainer } from '../containers/OptionsContainer';
import { InputBarContainer } from '../containers/InputBarContainer';

export function Grid(props) {
  let { gridId, currentImage, currentGrid, changeGrid, resetGrid } = props;
  if (!currentImage) return null;
  let showing = gridId === currentGrid;
  let clickAction =
    currentGrid === null
      ? () => changeGrid(gridId)
      : currentGrid === gridId
      ? () => null
      : () => resetGrid();
  return (
    <section className={`grid ${gridId}`} key={gridId} onClick={clickAction}>
      <section className={`popupBox-${showing.toString()}`}>
        <OptionsContainer gridId={gridId} />
        <InputBarContainer gridId={gridId} />
      </section>
    </section>
  );
}

export default Grid;

Grid.propTypes = {
  gridId: PropTypes.string,
  currentGrid: PropTypes.number,
  currentImage: PropTypes.object,
  changeGrid: PropTypes.func,
  resetGrid: PropTypes.func,
};
