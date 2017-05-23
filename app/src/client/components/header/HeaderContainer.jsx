import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import {switchTheme} from '../../actions';
import Header from './Header';

const mapStateToProps = state => ({
  theme: state.settings.values.theme,
});

const mapDispatchToProps = dispatch => ({
  onThemeSwitch: () => dispatch(switchTheme()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));
