import { connect } from 'react-redux';
import { DeleteImageButton } from './DeleteImageView';
import { deleteImage } from '../../actions/actions';

function mapStateToProps(state) {
  return {
    currentImage: state.currentImage,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    deleteImage: id => dispatch(deleteImage(id)),
  };
}

export const DeleteImageContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(DeleteImageButton);
