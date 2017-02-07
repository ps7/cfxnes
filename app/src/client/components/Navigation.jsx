import React from 'react';

const Navigation = ({children}) => (
  <nav>{children}</nav>
);

Navigation.propTypes = {
  children: React.PropTypes.node.isRequired,
};

export default Navigation;
