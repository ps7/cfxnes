import React, {PropTypes} from 'react';
import classNames from 'classnames';

const Icon = ({className, name, size, fixedWidth, inverse, spin, stack, ...attrs}) => {
  const classNamesValue = classNames(
    'fa',
    `fa-${name}`,
    size && `fa-${size}`,
    stack && `fa-stack-${stack}`,
    {
      'fa-fw': fixedWidth,
      'fa-inverse': inverse,
      'fa-spin': spin,
    },
    className,
  );
  return <i className={classNamesValue} {...attrs}/>;
};

Icon.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string.isRequired,
  size: PropTypes.oneOf(['lg', '1x', '2x', '3x', '4x', '5x']),
  fixedWidth: PropTypes.bool,
  inverse: PropTypes.bool,
  spin: PropTypes.bool,
  stack: PropTypes.oneOf(['1x', '2x']),
};

Icon.defaultProps = {
  className: null,
  size: null,
  fixedWidth: false,
  inverse: false,
  spin: false,
  stack: null,
};
export default Icon;
