import {handleActions} from 'redux-actions';
import {fullscreen, config, defaults} from '../nes';

const createState = () => ({
  type: fullscreen.type,
});

export default handleActions({
  enterFullscreen(state) {
    fullscreen.enter();
    return state;
  },
  resetSettings() {
    config.set({fullscreen: defaults.fullscreen});
    return createState();
  },
}, createState());
