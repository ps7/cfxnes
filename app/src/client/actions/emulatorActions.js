import {createAction} from 'redux-actions';
import nes from '../nes';

export const setEmulatorRunning = createAction('setEmulatorRunning');
export const setEmulatorSuspended = createAction('setEmulatorSuspended');

export const startEmulator = () => {
  nes.start();
  return setEmulatorRunning(true);
};

export const stopEmulator = () => {
  nes.stop();
  return setEmulatorRunning(false);
};

export const suspendEmulator = () => {
  const {running} = nes;
  nes.stop();
  nes.video.output = null;
  return setEmulatorSuspended(running);
};

export const resumeEmulator = ({canvas}) => (dispatch, getState) => {
  nes.video.output = canvas;
  const state = getState();
  if (state.emulator.suspended) {
    dispatch(startEmulator());
  }
};

export const powerEmulator = () => () => {
  nes.power();
};

export const resetEmulator = () => () => {
  nes.reset();
};

export const enterFullscreen = () => () => {
  nes.fullscreen.enter();
};
