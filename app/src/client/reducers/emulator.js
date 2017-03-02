import {
  SET_EMULATOR_RUNNING,
  SET_EMULATOR_SUSPENDED,
} from '../actions';

import {createReducer} from './common';

const initialState = {
  running: false,
  suspended: false,
  loading: false,
};

const actionHandlers = {
  [SET_EMULATOR_RUNNING]: (state, running) => ({...state, running}),
  [SET_EMULATOR_SUSPENDED]: (state, suspended) => ({...state, suspended}),
};

export default createReducer(actionHandlers, initialState);
