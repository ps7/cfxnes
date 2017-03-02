import {nvramStore} from '../database';
import log from '../log';
import {createAction, UNLOCK_TIMEOUT} from './common';

export const UNLOCK_NVRAMS_DELETION = 'UNLOCK_NVRAMS_DELETION';
export const START_NVRAMS_DELETION = 'START_NVRAMS_DELETION';
export const FINISH_NVRAMS_DELETION = 'FINISH_NVRAMS_DELETION';

export function deleteNVRAMs() {
  return dispatch => {
    dispatch(createAction(START_NVRAMS_DELETION));
    dispatch(createAction(FINISH_NVRAMS_DELETION, nvramStore.clear()))
      .catch(error => log.error('Failed to delete all NVRAMs', error))
      .then(() => {
        setTimeout(() => dispatch(createAction(UNLOCK_NVRAMS_DELETION)), UNLOCK_TIMEOUT);
      });
  };
}
