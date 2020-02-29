import React from 'react';
import { HeaderContainer } from '../headerSection/HeaderContainer';
import { ChangeButtonContainer } from '../changeButton/ChangeButtonContainer';
import { NetworkErrorContainer } from '../networkError/NetworkErrorContainer';
import PropTypes from 'prop-types';
import { SaveTagContainer } from '../saveTag/SaveTagContainer';
import { ImageViewDisplay } from './ImageViewDisplay';
import { TagViewsContainer } from '../tagsView/TagsViewContainer';
import { TagSearchBarContainer } from '../tagSearchBar/TagSearchBarContainer';
import { ViewTagsButtonContainer } from '../toggleTagView/ViewTagsButtonContainer';

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
        <TagSearchBarContainer />
        <ViewTagsButtonContainer />
        <ChangeButtonContainer />
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
