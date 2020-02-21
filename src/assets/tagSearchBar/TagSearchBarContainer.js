import { viewTags, searchTagNames } from '../../actions/actions';
import { connect } from 'react-redux';
import { TagSearchBarView } from './TagSearchBar';

function mapDispatchToProps(dispatch) {
  return {
    searchTag: tag => {
      dispatch(searchTagNames(tag));
      dispatch(viewTags());
    },
  };
}

export const TagSearchBarContainer = connect(
  null,
  mapDispatchToProps,
)(TagSearchBarView);
