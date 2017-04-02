import React, {PropTypes} from 'react';

const ButtonGroup = ({children}) => (
  <div className="button-group">
    {children}
  </div>
);

ButtonGroup.propTypes = {
  children: PropTypes.node,
};

ButtonGroup.defaultProps = {
  children: null,
};

export default ButtonGroup;
