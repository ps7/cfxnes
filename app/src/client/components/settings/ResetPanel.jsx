import React from 'react';
import {connect} from 'react-redux';
import {Button, Icon, Panel} from '../common';
import {resetSettings} from '../../actions';
import {OpState} from '../../constants';

class ResetPanel extends React.Component {

  static id = 'reset';

  static propTypes = {
    resetState: React.PropTypes.string,
    collapsed: React.PropTypes.bool,
    onHeaderClick: React.PropTypes.func,
    dispatch: React.PropTypes.func.isRequired,
  };

  static defaultProps = {
    resetState: null,
    collapsed: false,
    onHeaderClick: false,
  }

  handleResetSettings = () => {
    this.props.dispatch(resetSettings());
  }

  renderResetButton() {
    const {resetState} = this.props;
    if (resetState === OpState.STARTED) {
      const icon = <Icon name="circle-o-notch" spin/>;
      return <Button icon={icon} caption="Resetting settings..." disabled/>;
    }
    if (resetState === OpState.SUCCESS) {
      return <Button icon="check" caption="Done" disabled/>;
    }
    if (resetState === OpState.ERROR) {
      return <Button icon="exclamation-triangle" caption="Reset failed" disabled/>;
    }
    return <Button caption="Reset settings" onClick={this.handleResetSettings}/>;
  }

  render() {
    const {collapsed, onHeaderClick} = this.props;
    return (
      <Panel type={ResetPanel.id} icon="trash-o" caption="Reset" collapsed={collapsed} onHeaderClick={onHeaderClick}>
        <div className="reset-panel-row">
          {this.renderResetButton()}
          <p>Reset cfxnes settings to defaults.</p>
        </div>
      </Panel>
    );
  }

}

const mapStateToProps = state => {
  const {resetState} = state.settings;
  return {resetState};
};

export default connect(mapStateToProps)(ResetPanel);
