import {createItems} from './common';

export const MAXIMIZED = 'maximized';
export const NORMALIZED = 'normalized';
export const STRETCHED = 'stretched';

export const values = [MAXIMIZED, NORMALIZED, STRETCHED];

export const params = {
  [MAXIMIZED]: {caption: 'Upscale to maximum resolution'},
  [NORMALIZED]: {caption: 'Upscale without visual artifacts'},
  [STRETCHED]: {caption: 'Stretch to fill the whole sceen'},
};

export const items = createItems(values, params);
