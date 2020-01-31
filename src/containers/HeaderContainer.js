import { connect } from 'react-redux';
import { HeaderView } from '../views/HeaderView';

function mapStateToProps(state) {
  return {
    isTagMode: state.isTagMode,
  };
}

function mapDispatchToProps(dispatch) {
  return null;
}

export const HeaderContainer = connect(
  mapStateToProps,
  null,
)(HeaderView);
