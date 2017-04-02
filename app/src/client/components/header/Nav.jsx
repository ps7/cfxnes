import React, {PropTypes} from 'react';
import classNames from 'classnames';
import {Link} from 'react-router';
import {Icon} from '../common';

const Nav = ({type, children}) => {
  const className = classNames('navigation', type && `navigation-${type}`);
  return <nav className={className}>{children}</nav>;
};

Nav.propTypes = {
  type: PropTypes.string,
  children: PropTypes.node.isRequired,
};

Nav.defaultProps = {
  type: null,
};

Nav.Item = ({path, caption, icon}) => (
  <Link to={path} className="navigation-item" activeClassName="active">
    <Icon name={icon}/> {caption}
  </Link>
);

Nav.Item.propTypes = {
  path: PropTypes.string.isRequired,
  caption: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
};

export default Nav;
