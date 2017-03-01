import React from 'react';
import {connect} from 'react-redux';
import {noop} from 'lodash-es';
import {Button, Icon, Panel, ConfirmDialog} from '../common';
import {resetSettings, deleteNVRAMs} from '../../actions';
import {ActionState, SettingsGroup} from '../../enums';

const {RESET} = SettingsGroup;

class ResetPanel extends React.Component {

  static id = RESET;

  static propTypes = {
    settingsResetLocked: React.PropTypes.bool.isRequired,
    nvramsDeletionState: React.PropTypes.oneOf(ActionState.values).isRequired,
    active: React.PropTypes.bool,
    onActivate: React.PropTypes.func,
    dispatch: React.PropTypes.func.isRequired,
  };

  static defaultProps = {
    active: false,
    onActivate: noop,
  }

  constructor(props) {
    super(props);
    this.state = {
      settingsResetConfirmVisible: false,
      nvramsDeletionConfirmVisible: false,
    };
  }

  handleHeaderClick = () => {
    this.props.onActivate(RESET);
  }

  handleResetSettings = () => {
    this.setState({settingsResetConfirmVisible: true});
  }

  handleConfirmResetSettings = () => {
    this.setState({settingsResetConfirmVisible: false});
    this.props.dispatch(resetSettings());
  }

  handleCancelResetSettings = () => {
    this.setState({settingsResetConfirmVisible: false});
  }

  handleDeleteNVRAMs = () => {
    this.setState({nvramsDeletionConfirmVisible: true});
  }

  handleConfirmDeleteNVRAMs = () => {
    this.setState({nvramsDeletionConfirmVisible: false});
    this.props.dispatch(deleteNVRAMs());
  }

  handleCancelDeleteNVRAMs = () => {
    this.setState({nvramsDeletionConfirmVisible: false});
  }

  renderResetSettingsButton() {
    if (this.props.settingsResetLocked) {
      return <Button icon="check" caption="Done" disabled/>;
    }
    return <Button caption="Reset settings" onClick={this.handleResetSettings}/>;
  }

  renderDeleteNVRAMsButton() {
    const {nvramsDeletionState} = this.props;
    if (nvramsDeletionState === ActionState.STARTED) {
      const icon = <Icon name="circle-o-notch" spin/>;
      return <Button icon={icon} caption="Deleting data..." disabled/>;
    }
    if (nvramsDeletionState === ActionState.SUCCESS) {
      return <Button icon="check" caption="Done" disabled/>;
    }
    if (nvramsDeletionState === ActionState.FAILURE) {
      return <Button icon="exclamation-triangle" caption="Deletion failed" disabled/>;
    }
    return <Button caption="Delete game data" onClick={this.handleDeleteNVRAMs}/>;
  }

  render() {
    const {active} = this.props;
    return (
      <Panel type={RESET} icon="trash-o" caption="Reset" collapsed={!active} onHeaderClick={this.handleHeaderClick}>
        {this.state.settingsResetConfirmVisible && (
          <ConfirmDialog title="Reset settings?"
                         message="All settings will be restored to their default value."
                         confirmCaption="Reset settings"
                         cancelCaption="Cancel"
                         onConfirm={this.handleConfirmResetSettings}
                         onCancel={this.handleCancelResetSettings}/>
        )}
        {this.state.nvramsDeletionConfirmVisible && (
          <ConfirmDialog title="Delete game data?"
                         message="Stored data of all games will be deleted."
                         confirmCaption="Delete data"
                         cancelCaption="Cancel"
                         onConfirm={this.handleConfirmDeleteNVRAMs}
                         onCancel={this.handleCancelDeleteNVRAMs}/>
        )}
        <div className="reset-row">
          <div className="reset-button">
            {this.renderResetSettingsButton()}
          </div>
          <div className="reset-description">
            Restore all settings to their default value.
          </div>
        </div>
        <div className="reset-row">
          <div className="reset-button">
            {this.renderDeleteNVRAMsButton()}
          </div>
          <div className="reset-description">
            Delete stored data of all games. This will only affect games that support
            saving, like <em>The Legend of Zelda</em> or <em>Final Fantasy</em>.
          </div>
        </div>
      </Panel>
    );
  }

}

const mapStateToProps = state => ({
  settingsResetLocked: state.settings.resetLocked,
  nvramsDeletionState: state.database.nvramsDeletionState,
});

export default connect(mapStateToProps)(ResetPanel);
