import {
  UNLOCK_NVRAMS_DELETION,
  START_NVRAMS_DELETION,
  FINISH_NVRAMS_DELETION,
} from '../actions/databaseActions';

import {ActionState} from '../enums';
import {handleActions} from './common';

const initialState = {
  nvramsDeletionState: ActionState.NONE,
};

export default handleActions({
  [UNLOCK_NVRAMS_DELETION]: state => ({...state, nvramsDeletionState: ActionState.NONE}),
  [START_NVRAMS_DELETION]: state => ({...state, nvramsDeletionState: ActionState.STARTED}),
  [FINISH_NVRAMS_DELETION]: {
    success: state => ({...state, nvramsDeletionState: ActionState.SUCCESS}),
    failure: state => ({...state, nvramsDeletionState: ActionState.FAILURE}),
  },
}, initialState);
