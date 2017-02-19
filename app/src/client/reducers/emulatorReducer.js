import nes from '../nes';

import {
  SET_EMULATOR_RUNNING,
  SET_EMULATOR_SUSPENDED,
} from '../actions/emulatorActions';

import {handleActions} from './common';

const initialState = {
  region: nes.region,
  speed: nes.speed,
  running: false,
  suspended: false,
  loading: false,
};

export default handleActions({
  [SET_EMULATOR_RUNNING]: (state, running) => ({...state, running}),
  [SET_EMULATOR_SUSPENDED]: (state, suspended) => ({...state, suspended}),
}, initialState);
