import { editImage } from '../actions/actions';
import { EditImageView } from '../views/EditImageView';
import { connect } from 'react-redux';

function mapStateToProps(state) {
  return {
    currentImage: state.currentImage,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    editImage: (id, url) => dispatch(editImage(id, url)),
  };
}

export const EditImageContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditImageView);
