import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './Tooltip.css';

const TOP = 'top';
const RIGHT = 'right';
const BOTTOM = 'bottom';
const LEFT = 'left';

const Tooltip = ({className, position, children, ...attrs}) => (
  <span className={classNames('tooltip', className, position)} {...attrs}>
    {children}
  </span>
);

Tooltip.propTypes = {
  className: PropTypes.string,
  position: PropTypes.oneOf([TOP, RIGHT, BOTTOM, LEFT]),
  children: PropTypes.node,
};

Tooltip.defaultProps = {
  className: null,
  position: TOP,
  children: null,
};

export default Tooltip;
