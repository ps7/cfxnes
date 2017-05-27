import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const Icon = ({className, name, size, fixedWidth, pulse, inverse, spin, ...attrs}) => {
  const fullClassName = classNames(
    'fa',
    `fa-${name}`,
    size && `fa-${size}`,
    {
      'fa-fw': fixedWidth,
      'fa-inverse': inverse,
      'fa-pulse': pulse,
      'fa-spin': spin,
    },
    className,
  );
  return <i className={fullClassName} {...attrs}/>;
};

Icon.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string.isRequired,
  size: PropTypes.oneOf(['lg', '1x', '2x', '3x', '4x', '5x']),
  fixedWidth: PropTypes.bool,
  inverse: PropTypes.bool,
  pulse: PropTypes.bool,
  spin: PropTypes.bool,
};

Icon.defaultProps = {
  className: null,
  size: null,
  fixedWidth: false,
  inverse: false,
  pulse: false,
  spin: false,
};

export default Icon;
