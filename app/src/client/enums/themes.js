export const LIGHT = 'light';
export const DARK = 'dark';

export const values = [LIGHT, DARK];

export const params = {
  [LIGHT]: {label: 'Light', icon: 'sun-o '},
  [DARK]: {label: 'Dark', icon: 'moon-o'},
};

export function getLabel(theme) {
  return params[theme].label;
}

export function getIcon(theme) {
  return params[theme].icon;
}

export function getNext(theme) {
  return values[(values.indexOf(theme) + 1) % values.length];
}

export default values;
