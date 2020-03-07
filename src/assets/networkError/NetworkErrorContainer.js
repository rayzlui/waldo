import { connect } from 'react-redux';
import { NetworkError } from './NetworkErrorView';
import {
  retrieveImageIndex,
  retrieveAllTags,
} from '../../actions/asyncActions';

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
