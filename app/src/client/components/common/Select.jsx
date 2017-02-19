import React from 'react';

const Select = ({items, ...attrs}) => (
  <select {...attrs}>
    {items.map(item => <option key={item.value} value={item.value}>{item.caption}</option>)}
  </select>
);

Select.propTypes = {
  items: React.PropTypes.arrayOf(React.PropTypes.shape({
    value: React.PropTypes.string.isRequired,
    caption: React.PropTypes.string.isRequired,
  })).isRequired,
};

export default Select;
