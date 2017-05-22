import {createOptions} from './common';

export const AUTO = 'auto';
export const NTSC = 'ntsc';
export const PAL = 'pal';

export const values = [AUTO, NTSC, PAL];

export const params = {
  [AUTO]: {label: 'Autodetect'},
  [NTSC]: {label: 'NTSC'},
  [PAL]: {label: 'PAL'},
};

export const options = createOptions(values, params);

export default values;
