import nes from '../nes';
import {copySettingsFromNes} from './settings';

export default {
  fpsVisible: true,
  controlsVisible: true,
  ...copySettingsFromNes(nes),
};
