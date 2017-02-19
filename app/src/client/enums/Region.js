import {createItems} from './common';

export const AUTO = 'auto';
export const NTSC = 'ntsc';
export const PAL = 'pal';

export const values = [AUTO, NTSC, PAL];

export const params = {
  [AUTO]: {caption: 'Autodetect'},
  [NTSC]: {caption: 'NTSC'},
  [PAL]: {caption: 'PAL'},
};

export const items = createItems(values, params);
