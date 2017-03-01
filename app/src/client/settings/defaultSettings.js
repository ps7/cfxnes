import nes from '../nes';
import {copySettingsFromNes} from './nesSettings';

export default {
  fpsVisible: true,
  controlsVisible: true,
  ...copySettingsFromNes(nes),
};
