import {partial} from 'lodash-es';

const EMULATOR = 'emulator';
const LIBRARY = 'library';
const SETTINGS = 'settings';
const ABOUT = 'about';

export const ROM_ID = 'romId';
export const ACTIVE_PANEL_ID = 'activePanelId';

export const createPath = (...parts) => '/' + parts.join('/');
export const createOptParam = name => `:${name}?`;

export const geEmulatorPath = partial(createPath, EMULATOR);
export const geLibraryPath = partial(createPath, LIBRARY);
export const geSettingsPath = partial(createPath, SETTINGS);
export const geAboutPath = partial(createPath, ABOUT);

export const EMULATOR_PATH = geEmulatorPath(createOptParam(ROM_ID));
export const LIBRARY_PATH = geLibraryPath();
export const SETTINGS_PATH = geSettingsPath(createOptParam(ACTIVE_PANEL_ID));
export const ABOUT_PATH = geAboutPath();
