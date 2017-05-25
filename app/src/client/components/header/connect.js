import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import {flow} from 'lodash-es';
import {switchTheme} from '../../actions';
import {selectSettingsValues} from '../../reducers';

const mapStateToProps = state => ({
  theme: selectSettingsValues(state).theme,
});

const mapDispatchToProps = dispatch => ({
  onThemeSwitch: () => dispatch(switchTheme()),
});

export default flow(connect(mapStateToProps, mapDispatchToProps), withRouter);
