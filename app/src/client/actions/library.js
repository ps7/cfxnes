import {romsApi} from '../api';
import {createAction} from './common';

export const START_ROMS_FETCH = 'START_ROMS_FETCH';
export const FINISH_ROMS_FETCH = 'FINISH_ROMS_FETCH';
export const SET_ROMS_FILTER = 'SET_ROMS_FILTER';

export function fetchROMs() {
  return dispatch => {
    dispatch(createAction(START_ROMS_FETCH));
    dispatch(createAction(FINISH_ROMS_FETCH, romsApi.getAll()));
  };
}

export function setROMsFilter(filter) {
  return createAction(SET_ROMS_FILTER, filter);
}
