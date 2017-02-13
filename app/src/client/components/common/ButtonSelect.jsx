import React from 'react';
import Button from './Button';
import ButtonGroup from './ButtonGroup';

const ButtonSelect = ({items, value, onChange}) => (
  <ButtonGroup>
    {items.map(item => {
      const active = item.id === value;
      const onClick = () => onChange(item.id);
      return <Button key={item.id} caption={item.caption} active={active} onClick={onClick}/>;
    })}
  </ButtonGroup>
);

ButtonSelect.propTypes = {
  items: React.PropTypes.arrayOf(React.PropTypes.shape({
    id: React.PropTypes.string.isRequired,
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
