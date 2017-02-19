export function createItems(values, params) {
  return values.map(value => ({...params[value], value}));
}
