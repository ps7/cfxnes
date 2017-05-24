import {nes} from '../common';
import {romsApi} from '../api';
import {createAction} from './common';

export const START_ROM_LOAD = 'START_ROM_LOAD';
export const FINISH_ROM_LOAD = 'FINISH_ROM_LOAD';
export const CLEAR_ROM_LOAD_ERROR = 'CLEAR_ROM_LOAD_ERROR';
export const SET_EMULATOR_RUNNING = 'SET_EMULATOR_RUNNING';
export const SET_EMULATOR_SUSPENDED = 'SET_EMULATOR_SUSPENDED';

export function connectEmulator(canvas) {
  return () => { nes.video.output = canvas; };
}

export function disconnectEmulator() {
  return () => { nes.video.output = null; };
}

export function powerEmulator() {
  return () => nes.power();
}

export function resetEmulator() {
  return () => nes.reset();
}

export function startEmulator() {
  nes.start();
  return createAction(SET_EMULATOR_RUNNING, true);
}

export function stopEmulator() {
  nes.stop();
  return createAction(SET_EMULATOR_RUNNING, false);
}

export function suspendEmulator() {
  return dispatch => {
    const {running} = nes;
    dispatch(stopEmulator());
    dispatch(createAction(SET_EMULATOR_SUSPENDED, running));
  };
}

export function resumeEmulator() {
  return (dispatch, getState) => {
    const state = getState();
    if (state.emulator.suspended) {
      dispatch(startEmulator());
      dispatch(createAction(SET_EMULATOR_SUSPENDED, false));
    } else if (nes.rom.loaded) {
      nes.step(); // To refresh canvas
    }
  };
}

export function fetchAndloadROM(romId) {
  return executeROMLoad(romId, getState => {
    return fetchROM(romId, getState)
      .then(({file}) => nes.rom.load(file));
  });
}

export function loadROM(source) {
  return executeROMLoad(null, () => nes.rom.load(source));
}

function executeROMLoad(romId, loader) {
  return (dispatch, getState) => {
    dispatch(clearROMLoadError());
    dispatch(stopEmulator());
    nes.rom.unload();
    dispatch(createAction(START_ROM_LOAD, romId));
    dispatch(createAction(FINISH_ROM_LOAD, loader(getState)))
      .then(() => dispatch(startEmulator()));
  };
}

function fetchROM(romId, getState) {
  return new Promise((resolve, reject) => {
    const state = getState();
    const rom = state.library.items.find(({id}) => id === romId);
    if (rom) {
      resolve(rom); // In case roms were already fetched in store
    } else {
      romsApi.getOne(romId).then(resolve, reject);
    }
  });
}

export function clearROMLoadError() {
  return createAction(CLEAR_ROM_LOAD_ERROR);
}

export function enterFullscreen() {
  return () => nes.fullscreen.enter();
}
