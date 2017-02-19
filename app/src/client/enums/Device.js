import {createItems} from './common';

export const NONE = 'none';
export const JOYPAD = 'joypad';
export const ZAPPER = 'zapper';

export const values = [NONE, JOYPAD, ZAPPER];

export const params = {
  [NONE]: {caption: 'None', inputs: []},
  [JOYPAD]: {caption: 'Joypad', inputs: ['a', 'b', 'start', 'select', 'left', 'right', 'up', 'down']},
  [ZAPPER]: {caption: 'Zapper', inputs: ['trigger']},
};

export const items = createItems(values, params);

export function fromId(value) {
  return value || NONE;
}

export function toId(value) {
  return value !== NONE ? value : null;
}
