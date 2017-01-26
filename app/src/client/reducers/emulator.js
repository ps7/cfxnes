import {handleActions} from 'redux-actions';
import nes from '../nes';

const initialState = {
  running: nes.running,
};

export default handleActions({
  powerEmulator(state) {
    nes.power();
    return state;
  },
  resetEmulator(state) {
    nes.reset();
    return state;
  },
  startEmulator(state) {
    nes.start();
    return {...state, running: nes.running};
  },
  stopEmulator(state) {
    nes.stop();
    return {...state, running: nes.running};
  },
  enterFullscreen(state) {
    nes.fullscreen.enter();
    return state;
  },
}, initialState);
