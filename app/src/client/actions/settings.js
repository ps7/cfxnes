import {defaultSettings, loadSettings, applySettingsToNes, copySettingsFromNes} from '../settings';
import nes from '../nes';
import log from '../log';
import {createAction, UNLOCK_TIMEOUT} from './common';

export const SET_ACTIVE_SETTINGS_PANEL = 'SET_ACTIVE_SETTINGS_PANEL';
export const SET_SETTINGS_VALUES = 'SET_SETTINGS_VALUES';
export const LOCK_SETTINGS_RESET = 'LOCK_SETTINGS_RESET';
export const UNLOCK_SETTINGS_RESET = 'UNLOCK_SETTINGS_RESET';

export function setActiveSettingsPanel(id) {
  return createAction(SET_ACTIVE_SETTINGS_PANEL, id);
}

export function resetSettings() {
  return dispatch => {
    applySettingsToNes(nes, defaultSettings);
    dispatch(createAction(LOCK_SETTINGS_RESET));
    dispatch(createAction(SET_SETTINGS_VALUES, defaultSettings));
    setTimeout(() => dispatch(createAction(UNLOCK_SETTINGS_RESET)), UNLOCK_TIMEOUT);
  };
}

export function initSettings() {
  return dispatch => {
    return loadSettings()
      .then(settings => {
        if (settings) {
          applySettingsToNes(nes, settings);
          dispatch(createAction(SET_SETTINGS_VALUES, {
            ...defaultSettings,          // In case some app settings are mising
            ...settings,                 // Copy app settings
            ...copySettingsFromNes(nes), // Copy NES settings
          }));
        }
      })
      .catch(error => {
        log.error('Failed to load settings', error);
      });
  };
}
