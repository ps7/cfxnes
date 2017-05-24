import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import {switchTheme} from '../../actions';
import {selectSettingsValues} from '../../reducers';
import Header from './Header';

const mapStateToProps = state => ({
  theme: selectSettingsValues(state).theme,
});

const mapDispatchToProps = dispatch => ({
  onThemeSwitch: () => dispatch(switchTheme()),
});

const connectHeader = connect(mapStateToProps, mapDispatchToProps);
export default withRouter(connectHeader(Header));
