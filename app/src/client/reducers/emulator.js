import {handleActions} from 'redux-actions';
import nes from '../nes';

const initialState = {
  running: nes.running,
  suspended: false,
  loading: false,
};

export default handleActions({
  resumeEmulator(state, action) {
    const {canvas, newRomId} = action.payload;
    const {suspended} = state;
    let {romId, loading} = state;

    nes.video.output = canvas;

    if (newRomId && newRomId !== romId) {
      romId = newRomId;
      loading = true;
      // TODO load ROM and then start
    } else if (suspended) {
      nes.start();
    }

    return {...state, suspended: false, romId, loading};
  },

  suspendEmulator(state) {
    const suspended = nes.running;

    nes.stop();
    nes.video.output = null;

    return {...state, suspended};
  },

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
}, initialState);
