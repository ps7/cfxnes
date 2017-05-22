export function createOptions(values, params) {
  return values.map(value => ({...params[value], value}));
}
