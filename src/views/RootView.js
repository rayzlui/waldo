import React from 'react';
import { HeaderContainer } from '../containers/HeaderContainer';
import { ChangeButtonContainer } from '../containers/ChangeButtonContainer';
import { ImageIndexContainer } from '../containers/ImageIndexContainer';
import { NetworkErrorContainer } from '../containers/NetworkErrorContainer';
import PropTypes from 'prop-types';
import { SaveTagContainer } from '../containers/SaveTagContainer';
import { ImageViewDisplay } from './ImageViewDisplay';
import { TagViewsContainer } from '../containers/TagsViewContainer';
import { TagSearchBarContainer } from '../containers/TagSearchBarContainer';
import { ViewTagsButtonContainer } from '../containers/ViewTagsButtonContainer';
import { NewImageContainer } from '../containers/NewImageContainer';

export function RootView(props) {
  const { resetGrid, isViewingTags } = props;
  return (
    <div className="container">
      <section className="messages">
        <SaveTagContainer />
        <NetworkErrorContainer />
      </section>

      <section className="menu__section" onClick={() => resetGrid()}>
        <header>
          <HeaderContainer />
        </header>
        <NewImageContainer />
        <TagSearchBarContainer />
        <ViewTagsButtonContainer />
        <ChangeButtonContainer />
        <ImageIndexContainer />
      </section>

      <ImageViewDisplay isViewingTags={isViewingTags} />
      <TagViewsContainer />
    </div>
  );
}

RootView.propTypes = {
  resetGrid: PropTypes.func,
  viewAllTags: PropTypes.func,
  isViewingTags: PropTypes.bool,
};
