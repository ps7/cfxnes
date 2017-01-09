import {handleActions} from 'redux-actions';
import nes from '../nes';

const initialState = {
  running: nes.running,
};

// TODO structure state + reducers
// {
//   emulator: {},
//   library: {},
//   settings: {
//     emulation: {},
//     video: {},
//     audio: {},
//     controls: {},
//   }
// }

export default handleActions({
  startEmulator(state) {
    nes.start();
    return {...state, running: nes.running};
  },
  stopEmulator(state) {
    nes.stop();
    return {...state, running: nes.running};
  },
}, initialState);
