import React from 'react';

const getIdProperty = item => item.id;

export function makeEnumPropType(items) {
  return React.PropTypes.oneOf(items.map(getIdProperty));
}
