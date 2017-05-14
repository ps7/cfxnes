import {capitalize} from 'lodash-es';
import {createItems} from './common';

export const NONE = 'none';
export const JOYPAD = 'joypad';
export const ZAPPER = 'zapper';

export const values = [NONE, JOYPAD, ZAPPER];

export const params = {
  [NONE]: {label: 'None', inputNames: []},
  [JOYPAD]: {label: 'Joypad', inputNames: ['a', 'b', 'start', 'select', 'left', 'right', 'up', 'down']},
  [ZAPPER]: {label: 'Zapper', inputNames: ['trigger']},
};

export const items = createItems(values, params);

export function fromOptional(device) {
  return device != null ? device : NONE;
}

export function toOptional(device) {
  return device !== NONE ? device : null;
}

export function getLabel(device) {
  return params[device].name;
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
