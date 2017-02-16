export const VIDEO_WIDTH = 256;
export const VIDEO_HEIGHT = 240;

export const MIN_VIDEO_SCALE = 1;
export const MAX_VIDEO_H_SCALE = screen.width / VIDEO_WIDTH;
export const MAX_VIDEO_V_SCALE = screen.height / VIDEO_HEIGHT;
export const MAX_VIDEO_SCALE = Math.min(MAX_VIDEO_H_SCALE, MAX_VIDEO_V_SCALE);

export const PORTS = [1, 2];

export const NO_DEVICE = 'none';
export const JOYPAD = 'joypad';
export const ZAPPER = 'zapper';

export const INPUTS = {
  [NO_DEVICE]: [],
  [JOYPAD]: ['a', 'b', 'start', 'select', 'left', 'right', 'up', 'down'],
  [ZAPPER]: ['trigger'],
};

// TODO split to multiple files; make enums for palettes, renderers etc.

export const DEVICES = Object.keys(INPUTS);

export const OpState = {
  STARTED: 'STARTED',
  SUCCESS: 'SUCCESS',
  ERROR: 'ERROR',
};
