import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import {flow} from 'lodash-es';
import {selectSettingsValues} from '../../reducers';

const mapStateToProps = state => ({
  theme: selectSettingsValues(state).theme,
});

export default flow(connect(mapStateToProps), withRouter);
