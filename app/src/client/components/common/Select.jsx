import React, {PropTypes} from 'react';

const Select = ({items, ...attrs}) => (
  <select {...attrs}>
    {items.map(item => <option key={item.value} value={item.value}>{item.caption}</option>)}
  </select>
);

Select.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.string.isRequired,
    caption: PropTypes.string.isRequired,
  })).isRequired,
};

export default Select;
