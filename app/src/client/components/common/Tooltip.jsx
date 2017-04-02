import React, {PropTypes} from 'react';
import classNames from 'classnames';

const Tooltip = ({position, children}) => (
  <div className={classNames('tooltip', position)}>{children}</div>
);

Tooltip.propTypes = {
  position: PropTypes.oneOf(['top', 'right', 'bottom', 'left']),
  children: PropTypes.node,
};

Tooltip.defaultProps = {
  position: 'top',
  children: null,
};

export default Tooltip;
