import React from 'react';
import classNames from 'classnames';

const Icon = ({name, spin}) => (
  <i className={classNames('fa', `fa-${name}`, {'fa-spin': spin})}/>
);

Icon.propTypes = {
  name: React.PropTypes.string.isRequired,
  spin: React.PropTypes.bool,
};

Icon.defaultProps = {
  spin: false,
};

export default Icon;
