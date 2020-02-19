import { connect } from 'react-redux';
import { AddNewImageView } from './AddNewImageView';
import { submitNewImage } from '../../actions/actions';

function mapStateToProps(state) {
  return {
    index: state.index,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    submitImage: (key, url) => dispatch(submitNewImage(key, url)),
  };
}

export const NewImageContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(AddNewImageView);
