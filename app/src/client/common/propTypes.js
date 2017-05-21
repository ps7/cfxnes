import PropTypes from 'prop-types';
import {fromPairs} from 'lodash-es';

export function keysValuePropType(keys, valuePropType) {
  return PropTypes.shape(fromPairs(keys.map(key => [key, valuePropType])));
}
