import {PropTypes} from 'react';
import {fromPairs} from 'lodash-es';

export function keysValuePropType(keys, valuePropType) {
  return PropTypes.shape(fromPairs(keys.map(key => [key, valuePropType])));
}
