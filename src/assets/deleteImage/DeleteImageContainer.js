import { connect } from 'react-redux';
import { DeleteImageButton } from './DeleteImageView';
import { deleteImage } from '../../actions/actions';

function mapStateToProps(state) {
  return {
    currentImage: state.index.currentImage,
  };
}

const mapDispatchToProps = {
  deleteImage: deleteImage,
};

export const DeleteImageContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(DeleteImageButton);
