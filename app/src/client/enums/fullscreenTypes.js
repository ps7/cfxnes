import {createItems} from './common';

export const MAXIMIZED = 'maximized';
export const NORMALIZED = 'normalized';
export const STRETCHED = 'stretched';

export const values = [MAXIMIZED, NORMALIZED, STRETCHED];

export const params = {
  [MAXIMIZED]: {label: 'Upscale to maximum resolution'},
  [NORMALIZED]: {label: 'Upscale without visual artifacts'},
  [STRETCHED]: {label: 'Stretch to fill the whole sceen'},
};

export const items = createItems(values, params);
