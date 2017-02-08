import React from 'react';
import Icon from './Icon';

const Button = ({icon, caption, tooltip, disabled, onClick}) => (
  <button type="button" className="button" title={tooltip} disabled={disabled} onClick={onClick}>
    {icon && <Icon name={icon}/>}
    {caption}
  </button>
);

Button.propTypes = {
  icon: React.PropTypes.string,
  caption: React.PropTypes.string,
  tooltip: React.PropTypes.string,
  disabled: React.PropTypes.bool,
  onClick: React.PropTypes.func,
};

Button.defaultProps = {
  icon: null,
  caption: null,
  tooltip: null,
  disabled: false,
  onClick: null,
};

export default Button;
