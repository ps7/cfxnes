import {createAction} from '../utils';
import nes from '../nes';

export const SET_EMULATOR_RUNNING = 'SET_EMULATOR_RUNNING';
export const SET_EMULATOR_SUSPENDED = 'SET_EMULATOR_SUSPENDED';

export function startEmulator() {
  nes.start();
  return createAction(SET_EMULATOR_RUNNING, true);
}

export function stopEmulator() {
  nes.stop();
  return createAction(SET_EMULATOR_RUNNING, false);
}

export function resumeEmulator({canvas}) {
  return (dispatch, getState) => {
    nes.video.output = canvas;
    const state = getState();
    if (state.emulator.suspended) {
      dispatch(startEmulator());
    }
  };
}

export function suspendEmulator() {
  const {running} = nes;
  nes.stop();
  nes.video.output = null;
  return createAction(SET_EMULATOR_SUSPENDED, running);
}

export function powerEmulator() {
  return () => nes.power();
}

export function resetEmulator() {
  return () => nes.reset();
}

export function enterFullscreen() {
  return () => nes.fullscreen.enter();
}
