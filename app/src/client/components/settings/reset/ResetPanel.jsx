import React from 'react';
import {connect} from 'react-redux';
import {Panel} from '../../common';
import {resetSettings, deleteNVRAMs} from '../../../actions';
import {ActionState, SettingsGroup} from '../../../enums';
import ResetPanelItem from './ResetPanelItem';

const {RESET} = SettingsGroup;

class ResetPanel extends React.Component {

  static id = RESET;

  static propTypes = {
    settingsResetLocked: React.PropTypes.bool.isRequired,
    nvramsDeletionState: React.PropTypes.oneOf(ActionState.values).isRequired,
    active: React.PropTypes.bool.isRequired,
    onActivate: React.PropTypes.func.isRequired,
    dispatch: React.PropTypes.func.isRequired,
  };

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
    this.props.dispatch(resetSettings());
  }

  handleDeleteNVRAMs = () => {
    this.props.dispatch(deleteNVRAMs());
  }

  render() {
    const {active, settingsResetLocked, nvramsDeletionState} = this.props;

    return (
      <Panel type={RESET} icon="trash-o" caption="Reset" collapsed={!active} onHeaderClick={this.handleHeaderClick}>
        <ResetPanelItem caption="Reset settings"
                        description="Restore all settings to their default value."
                        confirmTitle="Reset settings?"
                        confirmMessage="All settings will be restored to their default value."
                        state={settingsResetLocked}
                        onConfirm={this.handleResetSettings}/>

        <ResetPanelItem caption="Delete data"
                        description={`Delete stored data of all games. This will only affect games
                                      that support saving, like The Legend of Zelda or Final Fantasy.`}
                        confirmTitle="Delete game data?"
                        confirmMessage="Stored data of all games will be deleted."
                        progressMessage="Deleting data..."
                        failureMessage="Deletion failed"
                        state={nvramsDeletionState}
                        onConfirm={this.handleDeleteNVRAMs}/>
      </Panel>
    );
  }

}

const mapStateToProps = state => ({
  settingsResetLocked: state.settings.resetLocked,
  nvramsDeletionState: state.database.nvramsDeletionState,
});

export default connect(mapStateToProps)(ResetPanel);
