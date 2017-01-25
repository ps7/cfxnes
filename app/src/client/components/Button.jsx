import React from 'react';
import Icon from './Icon';

const Button = ({icon, caption, tooltip, onClick}) => (
  <button type="button" className="button" title={tooltip} onClick={onClick}>
    {icon && <Icon name={icon}/>}
    {caption}
  </button>
);

Button.propTypes = {
  icon: React.PropTypes.string,
  caption: React.PropTypes.string,
  tooltip: React.PropTypes.string,
  onClick: React.PropTypes.func,
};

Button.defaultProps = {
  icon: null,
  caption: null,
  tooltip: null,
  onClick: null,
};

export default Button;
