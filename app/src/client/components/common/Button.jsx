import React from 'react';
import classNames from 'classnames';
import Icon from './Icon';

const Button = ({icon, caption, tooltip, active, disabled, onClick, children}) => (
  <button type="button" className={classNames('button', {active})}
          title={tooltip} disabled={disabled} onClick={onClick}>
    {children}
    {!children && (typeof icon === 'string' ? <Icon name={icon}/> : icon)}
    {!children && caption}
  </button>
);

Button.propTypes = {
  icon: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.node,
  ]),
  caption: React.PropTypes.string,
  tooltip: React.PropTypes.string,
  active: React.PropTypes.bool,
  disabled: React.PropTypes.bool,
  onClick: React.PropTypes.func,
  children: React.PropTypes.node,
};

Button.defaultProps = {
  icon: null,
  caption: null,
  tooltip: null,
  active: false,
  disabled: false,
  onClick: null,
  children: null,
};

export default Button;
