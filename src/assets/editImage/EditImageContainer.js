import { editImage } from '../../actions/actions';
import { EditImageView } from './EditImageView';
import { connect } from 'react-redux';

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
