import React from 'react';
import classNames from 'classnames';
import {Link} from 'react-router';
import {Icon} from '../common';

const Nav = ({type, children}) => {
  const className = classNames('navigation', type && `navigation-${type}`);
  return <nav className={className}>{children}</nav>;
};

Nav.propTypes = {
  type: React.PropTypes.string,
  children: React.PropTypes.node.isRequired,
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
  path: React.PropTypes.string.isRequired,
  caption: React.PropTypes.string.isRequired,
  icon: React.PropTypes.string.isRequired,
};

export default Nav;
