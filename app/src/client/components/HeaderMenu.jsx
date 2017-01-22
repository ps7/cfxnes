import React from 'react';

const HeaderMenu = ({children}) => (
  <ul className="header-menu">{children}</ul>
);

HeaderMenu.propTypes = {
  children: React.PropTypes.node.isRequired,
};

export default HeaderMenu;
