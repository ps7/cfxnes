import React from 'react';

const getId = object => object.id;

export function makeEnumPropType(items) {
  return React.PropTypes.oneOf(items.map(getId));
}

export function createAction(type, payload, meta) {
  const error = payload instanceof Error;
  return {type, error, payload, meta};
}

export function handleActions(handlers, initialState) {
  return (state, action) => {
    const handler = handlers[action.type];
    if (handler) {
      const typedHandler = action.error ? handler.failure : handler.success;
      return (typedHandler || handler)(state, action.payload, action.meta);
    }
    if (state) {
      return state;
    }
    if (typeof initialState === 'function') {
      return initialState();
    }
    return initialState;
  };
}
