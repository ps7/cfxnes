import React from 'react';
import Select from './Select';

const Field = ({id, caption, type, ...attrs}) => (
  <div className="field">
    <label htmlFor={id}>{caption}</label>
    {type === 'select' ? <Select {...attrs}/> : <input type={type} {...attrs}/>}
  </div>
);

Field.propTypes = {
  id: React.PropTypes.string.isRequired,
  caption: React.PropTypes.string.isRequired,
  type: React.PropTypes.oneOf(['number', 'checkbox', 'range', 'select']).isRequired,
};

export default Field;
