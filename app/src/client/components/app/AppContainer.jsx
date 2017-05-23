import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import App from './App';

const mapStateToProps = state => ({
  theme: state.settings.values.theme,
});

const connectApp = connect(mapStateToProps);
export default withRouter(connectApp(App));
