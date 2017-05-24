import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import {selectSettingsValues} from '../../reducers';
import App from './App';

const mapStateToProps = state => ({
  theme: selectSettingsValues(state).theme,
});

const connectApp = connect(mapStateToProps);
export default withRouter(connectApp(App));
