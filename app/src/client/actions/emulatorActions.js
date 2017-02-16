import {createAction} from 'redux-actions';

// TODO move business logic to action creators

export const resumeEmulator = createAction('resumeEmulator');
export const suspendEmulator = createAction('suspendEmulator');
export const powerEmulator = createAction('powerEmulator');
export const resetEmulator = createAction('resetEmulator');
export const startEmulator = createAction('startEmulator');
export const stopEmulator = createAction('stopEmulator');
export const enterFullscreen = createAction('enterFullscreen');
