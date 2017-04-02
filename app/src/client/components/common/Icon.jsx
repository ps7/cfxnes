import React, {PropTypes} from 'react';
import classNames from 'classnames';

const Icon = ({name, spin}) => (
  <i className={classNames('fa', `fa-${name}`, {'fa-spin': spin})}/>
);

Icon.propTypes = {
  name: PropTypes.string.isRequired,
  spin: PropTypes.bool,
};

Icon.defaultProps = {
  spin: false,
};

export default Icon;
