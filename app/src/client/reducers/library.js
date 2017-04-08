import {
  START_ROMS_FETCH,
  FINISH_ROMS_FETCH,
  SET_ROMS_FILTER,
} from '../actions';

import {ActionState} from '../enums';
import {createReducer} from './common';

const initialState = {
  fetchState: ActionState.NONE,
  fetchError: '',
  filter: '',
  roms: [],
};

const actionHandlers = {
  [START_ROMS_FETCH]: state => ({...state, fetchState: ActionState.STARTED}),
  [FINISH_ROMS_FETCH]: {
    success: (state, roms) => ({...state, roms, fetchState: ActionState.SUCCESS}),
    failure: (state, {message}) => ({...state, fetchError: message, fetchState: ActionState.FAILURE}),
  },
  [SET_ROMS_FILTER]: (state, filter) => ({...state, filter}),
};

export default createReducer(actionHandlers, initialState);
