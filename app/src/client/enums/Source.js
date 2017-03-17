import {capitalize} from 'lodash-es';

export const KEYBOARD = 'keyboard';
export const MOUSE = 'mouse';
export const GAMEPAD = 'gamepad';

const gamepadRegExp = new RegExp(`^${GAMEPAD}[\\d]+$`);

export function isGamepad(value) {
  return gamepadRegExp.test(value);
}

export function isSource(value) {
  return value === KEYBOARD || value === MOUSE || isGamepad(value);
}

export function getInputId({source, name}) {
  return `${source}.${name}`;
}

export function parseInputId(id) {
  const [source, name] = id.split('.');
  return {source, name};
}

export function getInputCaption({source, name}) {
  let caption = name.split('-').map(capitalize).join(' ');
  if (isGamepad(source)) {
    caption = caption.replace('Dpad', 'D-pad').replace(/ $/, '-');
  }
  return caption;
}

export function getInputIcon({source}) {
  if (isGamepad(source)) {
    return 'gamepad';
  }
  if (source === MOUSE) {
    return 'mouse-pointer';
  }
  return 'keyboard-o';
}
