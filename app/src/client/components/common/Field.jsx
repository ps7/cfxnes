import classNames from 'classnames';
import React from 'react';
import Select from './Select';

const Field = ({id, caption, type, ...attrs}) => {
  const input = type === 'select'
    ? <Select id={id} {...attrs}/>
    : <input id={id} type={type} {...attrs}/>;

  return (
    <div className={classNames('field', id && `field-${id}`)}>
      <label htmlFor={id}>{type === 'checkbox' && input}{caption}</label>
      {type !== 'checkbox' && input}
    </div>
  );
};

Field.propTypes = {
  id: React.PropTypes.string.isRequired,
  caption: React.PropTypes.string.isRequired,
  type: React.PropTypes.oneOf(['number', 'checkbox', 'range', 'select']).isRequired,
};

export default Field;
