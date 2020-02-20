import { connect } from 'react-redux';
import { HeaderView } from './HeaderView';

function mapStateToProps(state) {
  return {
    isTagMode: state.isTagMode,
  };
}

export const HeaderContainer = connect(mapStateToProps)(HeaderView);
