import { connect } from 'react-redux';
import { DeleteImageButton } from './DeleteImageView';
import { deleteImage } from '../../actions/asyncActions';

function mapStateToProps(state) {
  return {
    currentImage: state.index.currentImage,
    isViewingTags: state.isViewingTags,
  };
}

const mapDispatchToProps = {
  deleteImage: deleteImage,
};

export const DeleteImageContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(DeleteImageButton);
