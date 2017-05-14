import React, {PropTypes} from 'react';
import {ActionState} from '../../../enums';
import SettingsPanel from '../SettingsPanel';
import ResetPanelItem from './ResetPanelItem';

const ID = 'reset';

const ResetPanel = ({settingsResetLocked, nvramsDeletionState, onSettingsReset, onNVRAMsDelete, ...panelProps}) => (
  <SettingsPanel id={ID} title="Reset" icon="trash-o" {...panelProps}>
    <ResetPanelItem action="Reset settings"
                    description="Restore all settings to their default value."
                    confirmTitle="Reset settings?"
                    confirmMessage="All settings will be restored to their default value."
                    state={settingsResetLocked}
                    onConfirm={onSettingsReset}/>

    <ResetPanelItem action="Delete data"
                    description={`Delete stored data of all games. This will only affect games
                                  that support saving, like The Legend of Zelda or Final Fantasy.`}
                    confirmTitle="Delete game data?"
                    confirmMessage="Stored data of all games will be deleted."
                    progressMessage="Deleting data..."
                    failureMessage="Deletion failed"
                    state={nvramsDeletionState}
                    onConfirm={onNVRAMsDelete}/>
  </SettingsPanel>
);

ResetPanel.id = ID;

ResetPanel.propTypes = {
  settingsResetLocked: PropTypes.bool.isRequired,
  nvramsDeletionState: PropTypes.oneOf(ActionState.values).isRequired,
  onSettingsReset: PropTypes.func.isRequired,
  onNVRAMsDelete: PropTypes.func.isRequired,
};

export default ResetPanel;
