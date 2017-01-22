import React from 'react';

const Icon = ({name}) => (
  <i className={`fa fa-${name}`}/>
);

Icon.propTypes = {
  name: React.PropTypes.string.isRequired,
};

export default Icon;
