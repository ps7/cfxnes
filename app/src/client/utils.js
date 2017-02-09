import React from 'react';

const getId = object => object.id;

export function makeEnumPropType(items) {
  return React.PropTypes.oneOf(items.map(getId));
}
