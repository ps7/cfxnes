import {capitalize} from 'lodash-es';
import {createOptions} from './common';

export const NONE = 'none';
export const JOYPAD = 'joypad';
export const ZAPPER = 'zapper';

export const values = [NONE, JOYPAD, ZAPPER];

export const params = {
  [NONE]: {label: 'No device', inputNames: []},
  [JOYPAD]: {label: 'Controller', inputNames: ['a', 'b', 'start', 'select', 'left', 'right', 'up', 'down']},
  [ZAPPER]: {label: 'Zapper', inputNames: ['trigger']},
};

export const options = createOptions(values, params);

export function fromOptional(device) {
  return device != null ? device : NONE;
}

export function toOptional(device) {
  return device !== NONE ? device : null;
}

export function getLabel(device) {
  return params[device].label;
}

export function getInputNames(device) {
  return params[device].inputNames;
}

export function getInputId({port, device, name}) {
  return `${port}.${device}.${name}`;
}

export function getInputLabel({name}) {
  return capitalize(name);
}

export default values;
