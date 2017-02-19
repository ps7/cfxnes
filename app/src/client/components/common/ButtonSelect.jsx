import React from 'react';
import Button from './Button';
import ButtonGroup from './ButtonGroup';

const ButtonSelect = ({items, value, onChange}) => (
  <ButtonGroup>
    {items.map(item => {
      const active = item.value === value;
      const onClick = () => onChange(item.value);
      return <Button key={item.value} caption={item.caption} active={active} onClick={onClick}/>;
    })}
  </ButtonGroup>
);

ButtonSelect.propTypes = {
  items: React.PropTypes.arrayOf(React.PropTypes.shape({
    value: React.PropTypes.string.isRequired,
    caption: React.PropTypes.string.isRequired,
  })).isRequired,
  value: React.PropTypes.string,
  onChange: React.PropTypes.func,
};

ButtonSelect.defaultProps = {
  value: null,
  onChange: null,
};

export default ButtonSelect;
