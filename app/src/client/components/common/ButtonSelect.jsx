import React, {PropTypes} from 'react';
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
  items: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.string.isRequired,
    caption: PropTypes.string.isRequired,
  })).isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func,
};

ButtonSelect.defaultProps = {
  value: null,
  onChange: null,
};

export default ButtonSelect;
