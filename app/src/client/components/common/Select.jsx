import React from 'react';

const Select = ({items, ...attrs}) => (
  <select {...attrs}>
    {items.map(item => <option key={item.id} value={item.id}>{item.caption}</option>)}
  </select>
);

Select.propTypes = {
  items: React.PropTypes.arrayOf(React.PropTypes.shape({
    id: React.PropTypes.string.isRequired,
    caption: React.PropTypes.string.isRequired,
  })).isRequired,
};

export default Select;
