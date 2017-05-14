import {createItems} from './common';

export const NEAREST = 'nearest';
export const LINEAR = 'linear';

export const values = [NEAREST, LINEAR];

export const params = {
  [NEAREST]: {label: 'Pixelated'},
  [LINEAR]: {label: 'Linear'},
};

export const items = createItems(values, params);
