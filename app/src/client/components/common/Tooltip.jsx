import React from 'react';
import classNames from 'classnames';

const Tooltip = ({position, children}) => (
  <div className={classNames('tooltip', position)}>{children}</div>
);

Tooltip.propTypes = {
  position: React.PropTypes.oneOf(['top', 'right', 'bottom', 'left']),
  children: React.PropTypes.node,
};

Tooltip.defaultProps = {
  position: 'top',
  children: null,
};

export default Tooltip;
