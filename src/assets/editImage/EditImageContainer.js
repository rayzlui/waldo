import { EditImageView } from './EditImageView';
import { connect } from 'react-redux';
import { editImage } from '../../actions/asyncActions';

function mapStateToProps(state) {
  return {
    currentImage: state.index.currentImage,
  };
}

const mapDispatchToProps = {
  editImage: editImage,
};

export const EditImageContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditImageView);
