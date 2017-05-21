import {createItems} from './common';

export const AUTO = 'auto';
export const NTSC = 'ntsc';
export const PAL = 'pal';

export const values = [AUTO, NTSC, PAL];

export const params = {
  [AUTO]: {label: 'Autodetect'},
  [NTSC]: {label: 'NTSC'},
  [PAL]: {label: 'PAL'},
};

export const items = createItems(values, params);
