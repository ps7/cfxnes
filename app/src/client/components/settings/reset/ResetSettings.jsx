import React from 'react';
import PropTypes from 'prop-types';
import {ActionState} from '../../../enums';
import SettingsPanel from '../SettingsPanel';
import ResetSettingsItem from './ResetSettingsItem';
import connect from './connect';

export const RESET = 'reset';

const ResetSettings = ({active, settingsResetLocked, nvramsDeletionState, onActivate, onSettingsReset, onNVRAMsDelete}) => (
  <SettingsPanel id={RESET} title="Reset" icon="trash-o" active={active} onActivate={onActivate}>
    <ResetSettingsItem action="Reset settings"
                       description="Restore all settings to their default value."
                       confirmTitle="Reset settings?"
                       confirmMessage="All settings will be restored to their default value."
                       state={settingsResetLocked}
                       onConfirm={onSettingsReset}/>

    <ResetSettingsItem action="Delete data"
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

ResetSettings.propTypes = {
  active: PropTypes.bool.isRequired,
  settingsResetLocked: PropTypes.bool.isRequired,
  nvramsDeletionState: PropTypes.oneOf(ActionState.values).isRequired,
  onActivate: PropTypes.func.isRequired,
  onSettingsReset: PropTypes.func.isRequired,
  onNVRAMsDelete: PropTypes.func.isRequired,
};

export default connect(ResetSettings);
