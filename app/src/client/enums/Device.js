import {capitalize} from 'lodash-es';
import {createItems} from './common';

export const NONE = 'none';
export const JOYPAD = 'joypad';
export const ZAPPER = 'zapper';

export const values = [NONE, JOYPAD, ZAPPER];

export const params = {
  [NONE]: {caption: 'None', inputNames: []},
  [JOYPAD]: {caption: 'Joypad', inputNames: ['a', 'b', 'start', 'select', 'left', 'right', 'up', 'down']},
  [ZAPPER]: {caption: 'Zapper', inputNames: ['trigger']},
};

export const items = createItems(values, params);

export function fromId(value) {
  return value || NONE;
}

export function toId(value) {
  return value !== NONE ? value : null;
}

export function getInputNames(device) {
  return params[device].inputNames;
}

export function getInputId(port, device, name) {
  return `${port}.${device}.${name}`;
}

export function getInputCaption({name}) {
  return capitalize(name);
}
