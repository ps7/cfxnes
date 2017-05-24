import {romsApi} from '../api';
import {createAction} from './common';

export const SET_LIBRARY_FILTER = 'SET_LIBRARY_FILTER';
export const START_LIBRARY_FETCH = 'START_LIBRARY_FETCH';
export const FINISH_LIBRARY_FETCH = 'FINISH_LIBRARY_FETCH';

export function setLibraryFilter(filter) {
  return createAction(SET_LIBRARY_FILTER, filter);
}

export function fetchLibraryItems() {
  return dispatch => {
    dispatch(createAction(START_LIBRARY_FETCH));
    dispatch(createAction(FINISH_LIBRARY_FETCH, romsApi.getAll()));
  };
}
