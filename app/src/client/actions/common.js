export function createAction(type, payload, meta) {
  const error = payload instanceof Error;
  return {type, error, payload, meta};
}
