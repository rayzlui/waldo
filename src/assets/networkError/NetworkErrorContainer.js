import { connect } from 'react-redux';
import { retrieveImageIndex, retrieveAllTags } from '../../actions/actions';
import { NetworkError } from './NetworkErrorView';

function mapStateToProps(state) {
  return {
    error: state.error,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    requestData: () => {
      dispatch(retrieveImageIndex());
      dispatch(retrieveAllTags());
    },
  };
}

export const NetworkErrorContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(NetworkError);
