import {debounce} from 'lodash-es';
import nes from './nes';
import log from './log';

export const audioSupported = nes.audio != null;

const STORAGE_KEY = 'settings';
const SAVE_TIMEOUT = 5000;

function saveSettings(settings) {
  log.info('Saving settings');
  localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
}

export function loadSettings() {
  let settings;

  try {
    log.info('Loading settings');
    settings = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (settings) {
      applySettingsToNes(settings);
    }
  } catch (error) {
    log.error('Failed to load settings', error);
  }

  return {
    fpsVisible: false,
    controlsVisible: false,
    ...(settings || {}),
    ...copySettingsFromNes(),
  };
}

function applySettingsToNes(settings) {
  nes.config.use({
    region: settings.region,
    speed: settings.speed,
    video: {
      renderer: settings.videoRenderer,
      scale: settings.videoScale,
      palette: settings.videoPalette,
      filter: settings.videoFilter,
      debug: settings.videoDebug,
    },
    fullscreen: {
      type: settings.fullscreenType,
    },
    audio: {
      enabled: settings.audioEnabled,
      volume: settings.audioVolume,
    },
  });
}

function copySettingsFromNes() {
  return {
    region: nes.region,
    speed: nes.speed,
    videoRenderer: nes.video.renderer,
    videoScale: nes.video.scale,
    videoPalette: nes.video.palette,
    videoFilter: nes.video.filter,
    videoDebug: nes.video.debug,
    fullscreenType: nes.fullscreen.type,
    audioEnabled: audioSupported ? nes.audio.enabled : false,
    audioVolume: audioSupported ? {...nes.audio.volume} : {},
  };
}

export function watchSettings(store) {
  let settings;
  const saveSettingsLater = debounce(() => saveSettings(settings), SAVE_TIMEOUT);

  store.subscribe(() => {
    const state = store.getState();
    if (settings !== state.settings) {
      ({settings} = state);
      saveSettingsLater();
    }
  });
}
