import {nes} from '../common';
import {copySettingsFromNes} from './settings';

export const defaultSettings = {
  fpsVisible: true,
  controlsVisible: true,
  ...copySettingsFromNes(nes),
};

export const audioSupported = nes.audio != null;
