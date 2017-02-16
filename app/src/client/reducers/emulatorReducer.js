import {handleActions} from 'redux-actions';
import nes from '../nes';

const initialState = {
  region: nes.region,
  speed: nes.speed,
  running: false,
  suspended: false,
  loading: false,
};

export default handleActions({
  setEmulatorSuspended(state, action) {
    return {...state, suspended: action.payload};
  },

  setEmulatorRunning(state, action) {
    return {...state, running: action.payload};
  },
}, initialState);
