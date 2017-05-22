import {createOptions} from './common';

export const NEAREST = 'nearest';
export const LINEAR = 'linear';

export const values = [NEAREST, LINEAR];

export const params = {
  [NEAREST]: {label: 'Pixelated'},
  [LINEAR]: {label: 'Linear'},
};

export const options = createOptions(values, params);

export default values;
